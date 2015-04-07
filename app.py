from flask import render_template, Flask, request, g
from pymongo import MongoClient
from pprint import pprint
import json
from bson.objectid import ObjectId


def _byid(id):
    return ObjectId(id)

app = Flask(__name__, static_folder='public', static_url_path='')


# hooks before and after request we teardown the mongo connection
@app.before_request
def before_request():
    g.client = MongoClient(
        'mongodb://testgrant:testgrant@ds061371.mongolab.com:61371/reactbone')


@app.teardown_request
def teardown_request(exception):
    client = getattr(g, 'client', None)
    if client is not None:
        client.close()


# initial page
@app.route('/')
def main():
    return render_template('index.html', var='hello world')


@app.route('/todo', methods=['POST', 'GET'])
def todo():
    collection = g.client['reactbone']['testgrant']

    if request.method == 'GET':
        results = list(collection.find())
        for result in results:
            the_id = result['_id']
            result.pop('_id')
            result['_id'] = str(the_id)
        jresults = json.dumps(results)
        return jresults

    if request.method == 'POST':
        print 'POST'
        print request.form

        # UPSERT
        data = request.form.getlist('todos')[0]
        print data
        jdata = json.loads(data)
        for dat in jdata:
            if '_id' in dat:
                dat['_id'] = ObjectId(dat['_id'])
                collection.update({"_id": _byid(dat['_id'])}, dat)
            else:
                collection.insert(dat)

        # DELETE
        delete_data = request.form.getlist('delete')[0]
        print 'delete_data : ', delete_data
        jdelete_data = json.loads(delete_data)
        for dat in jdelete_data:
            if '_id' in dat:
                collection.remove({"_id": _byid(dat['_id'])})

        return json.dumps('OK')


if __name__ == '__main__':
    app.debug = True
    app.run()

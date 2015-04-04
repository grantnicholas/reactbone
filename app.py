from flask import render_template, Flask, request, jsonify
import json


app = Flask(__name__, static_folder='public', static_url_path='')


# initial page
@app.route('/')
def main():
    return render_template('index.html')


@app.route('/todo')
def todo():
    adict = {}
    return jsonify(**adict)


# transform to different recipe
# @app.route('/button/', methods=['POST', 'GET'])
# @app.route('/button/<option>', methods=['POST', 'GET'])
# def button_option(option):
# transform object returns new json
# 	original = copy.deepcopy(original_recipe_json[0])
# 	new_recipe = option_dict(option, original)
# return render_template('main.html', recipe = original_recipe_json[0],
# new_recipe = new_recipe)


if __name__ == '__main__':
    app.debug = True
    app.run()


# mongo_uri = 'mongodb://testgrant:testgrant@ds061371.mongolab.com:61371/reactbone'

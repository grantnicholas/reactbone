define(function(require) {

    console.log('in models.js');
    "use strict";

    /*
    TODO:
	
	Not really using backbone to its fullest extent; Need a RESTful API
	Backbone should synch the models for me with:
		add()     calling GET
		set()     calling UPDATE
		destroy() calling DELETE

	Just wanted to test out React+Backbone with something more than local/session storage
    */

    var $ = require('jquery'),
        Backbone = require('backbone'),

        ToDo = Backbone.Model.extend({

            defaults: {
                'text': 'undefined',
                'user': 'undefined'
            },

            update_todo: function(newtodo) {
                console.log('update_todo');
                this.set(newtodo);
            },

            delete_todo: function() {
                console.log('delete_todo');
                var deleted_obj = this;
                this.collection.deleted_todos.push(
                	{'_id' : deleted_obj.get('_id')}
                );
                this.destroy();
            }
        }),

        ToDoCollection = Backbone.Collection.extend({

            model: ToDo,

            url: "/todo",

            deleted_todos : [],

            load_data: function() {
                $.ajax({
                    url: this.url,
                    success: function(data) {
                        this.reset(JSON.parse(data));
                        console.log(this);
                    }.bind(this),
                    error: function(xhr, status, err) {
                        console.error(this.url, status, err.toString());
                    }.bind(this)
                });
            },

            synch_data: function() {
                console.log('we need to update the database here');

                $.ajax({
                    url: this.url,
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        "todos": JSON.stringify(this.toJSON()),
                        "delete": JSON.stringify(this.deleted_todos),
                    },
                    success: function(data) {
                        console.log('db updated');
                        this.deleted_todos = [];
                    }.bind(this),
                    error: function(xhr, status, err) {
                        console.error(this.url, status, err.toString());
                    }.bind(this)
                });
            },

            add_todo: function(atodo) {
                console.log('adding todo');
                this.add(atodo);
            },

            initialize: function() {
                this.on('change add update remove', function() {
                    console.log('Collection has changed.');
                    this.synch_data();
                    this.load_data();
                }.bind(this));

            }

        });

    return {
        ToDo: ToDo,
        ToDoCollection: ToDoCollection
    };

});

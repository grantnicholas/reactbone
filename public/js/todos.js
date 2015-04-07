define(function(require){
	console.log('in todos.js');

    var $ = require('jquery')
    var Backbone = require('backbone');
    var _  = require('underscore');
    var Models = require('models');

    var acollect = new Models.ToDoCollection();
    acollect.load_data();
    console.log('this is a collection: ', acollect);

    return {
        ToDoCollection : acollect
    };

});

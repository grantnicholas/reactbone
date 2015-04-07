define(function (require) {
 
    console.log('in router');
    "use strict";
 
    var $           = require('jquery'),
        Backbone    = require('backbone'),
         
        $content = $("#content");
 
    return Backbone.Router.extend({
 
        routes: {
            "index":            "index"
        },
 
        index: function () {
            console.log('in index! wooo');
        }
 
    });
 
});
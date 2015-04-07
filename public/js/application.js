console.log('require.js app');

require.config({
    "baseUrl": "/js",
    "paths": {
        "jquery": "libs/jquery",
        "underscore": "libs/underscore",
        "backbone": "libs/backbone",
        "react": "libs/react",
        "todolist": "react_post/todolist",
        "models": "models",
        "router": "router",
        "todos": "todos"
    },
    "shim": {
        "jquery": {
            "exports": "$"
        },
        "underscore": {
            "exports": "_"
        },
        "backbone": {
            "exports": "Backbone",
            "deps": ["jquery", "underscore"]
        },
        "react": {
            "exports": "_React",
            "deps": ["backbone"]
        },
        "todolist": {
            "deps": ["jquery", "underscore", "backbone", "react", "models", "todos"]
        },
        "models": {
            "exports": "Models",
            "deps": ["jquery", "underscore", "backbone"]

        },
        "router": {
            "exports": "Router",
            "deps": ["jquery", "underscore", "backbone"],
        },
        "todos": {
            "exports": "Data",
            "deps": ["models", "backbone", "underscore", "jquery"]
        }

    }
});


require(["jquery", "underscore", "react"], function($, _, _React) {

    require(["backbone"], function(Backbone){
        console.log('backbone loaded');
        console.log('backbone', Backbone);

        require(["models", "router", "todolist", "todos"], function(Models, Router){
            console.log('loaded');

        });
    });

    //OTHER JS
    require(["app"], function() {
        console.log('base js loaded');
    });

});


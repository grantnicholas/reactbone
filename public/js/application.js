console.log('require.js app');

require.config({
    "baseUrl": "/js",
    "paths": {
        "jquery": "jquery",
        "underscore": "underscore",
        "backbone": "backbone",
        "react": "react"
    },
    "shim": {
        "jquery": {
            "exports": "$"
        },
        "underscore": {
            "exports": "_"
        },
        "backbone": {
            "deps": ["jquery", "underscore"],
        },
        "react": {
            "deps": ["backbone"],
            "exports": "_React"
        },

    }
});

require(["jquery", "underscore", "react"], function($, _, _React) {
    //GLOBAL REACT VARIABLE; needed for the below react components
    React = _React; 

    require(["backbone"], function(){
        console.log('backbone loaded');
    });

    // //REACT COMPONENTS;
    // switch ($('body').attr('class')){
    //     case 'default':
    //         require(["searchdata", "searchbar"], function() {
    //             console.log('searchbar loaded');
    //         });
    //         break;
    //     default:
    //         break;
    // }

    //OTHER JS
    require(["app"], function() {
        console.log('base js loaded');
    });

});


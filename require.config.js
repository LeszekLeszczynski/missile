var require = {
    //urlArgs: "bust=" + (new Date()).getTime(),//used to keep the browser from caching the scripts as we move
    baseUrl : "src",//base scripts page!
    paths : {   
        'lodash' : "../bower_components/lodash/lodash",
        'paper' : "../bower_components/paper/dist/paper-full"
    },
    shim: {
        'lodash': {
            exports: '_'
        },
        'paper' : {
            exports: 'paper'
        },
    }
};
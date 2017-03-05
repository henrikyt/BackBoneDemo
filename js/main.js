/**
 * Google Images Search Tool
 */

require.config({
    paths: {
        // Libraries
        jquery: 'libs/jquery/jquery-min',
        underscore: 'libs/underscore/underscore-min',
        backbone: 'libs/backbone/backbone-min',
        localstorage: 'libs/backbone/localstorage',

        // Require.js plugins
        text: 'libs/require/text',
        order: 'libs/require/order',

        // Templates dir
        templates: '../templates'
    },
    urlArgs: "bust=" + (new Date()).getTime()
});

require([
    'views/AppView'
],
    function (AppView) {
        var appView = new AppView;
        appView.render();
    });

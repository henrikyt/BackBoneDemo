/**
 * TODO handle routes for the history/server communication
 *
 */

define([
    'jquery',
    'underscore',
    'backbone'


], function ($, _, Backbone) {
    var AppRouter = Backbone.Router.extend({
        routes: {
            '*actions': 'defaultAction'
        }
    });

    var initialize = function (options) {
        var appView = options.appView;
        var router = new AppRouter(options);

        router.on('route:defaultAction', function (actions) {

        });

    };
    return {
        initialize: initialize
    };
});
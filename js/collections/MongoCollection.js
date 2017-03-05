/**
 * Collection for the picture models persistent in the server
 * @return MongoCollection
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'models/Picture',
    'views/PictureView'
],

    function ($, _, Backbone, Picture, PictureView) {
        var MongoCollection = Backbone.Collection.extend({
            model: Picture,
            url: 'http://localhost:8080/pictures',

            initialize: function () {
                // Adding to collection also adds views
                this.bind('add', function (picture) {
                    var picview = new PictureView(picture, this, this);
                    $("#saved-list").append(picview.render().el);
                })
                // on startup, update all the views
                this.bind('reset', function () {
                    var self = this;
                    this.each(function (picture) {
                        picture.collection = self;
                        var picview = new PictureView(picture, self, self);
                        $("#saved-list").append(picview.render().el);
                    })
                })
            },
            // Clear all elements from this collection
            clear: function () {
                while (model = this.first()) {
                    model.clear();
                }
            }
        });
        return new MongoCollection;
    });

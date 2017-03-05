/**
 * Collection for the picture models used in the search results
 * @return PictureCollection
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'models/Picture',
    'collections/SaveCollection',
    'views/PictureView'
],

    function ($, _, Backbone, Picture, SaveCollection, PictureView) {
        var PictureCollection = Backbone.Collection.extend({
            model: Picture,
            // Adding to collection also adds views and models
            initialize: function () {
                SaveCollection.fetch();
                this.bind('add', function (picture) {
                    var picview = new PictureView(picture, this, SaveCollection);
                    $("#picture-list").append(picview.render().el);
                })
            },

            // Clear all elements from this collection
            clear: function () {
                while (model = this.first()) {
                    model.clear();
                }
            }
        });

        // Only one "static" PictureCollection is initiated, return as new
        return new PictureCollection;
    });

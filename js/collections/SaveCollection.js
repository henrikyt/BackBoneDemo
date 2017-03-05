/**
 * Collection for the picture models persistent in local storage
 * @return SaveCollection
 */

define([
        'jquery',
        'underscore',
        'backbone',
        'localstorage',
        'models/Picture',
        'views/PictureView'
    ],

    function ($, _, Backbone, Store, Picture, PictureView) {
        var SaveCollection = Backbone.Collection.extend({
            model: Picture,
            localStorage: new Store("pictures"),

            initialize: function () {
                // Adding to collection also adds views and models
                this.bind('add', function (picture) {
                    var picview = new PictureView(picture, this, this);
                    var height = $(".container").height();
                    $("#saved-list").append(picview.render().el);
                    setTimeout(function () {
                        if ($(".container").height() > height) {
                            var y = $(window).scrollTop();
                            $(window).scrollTop(y + $(picview.el).find('.picture-frame').height());
                        }
                    }, 100);
                    console.log('add sc ' + picture.cid);
                })
                // On startup, update all the views
                this.bind('reset', function () {
                    var self = this;
                    this.each(function (picture) {
                        picture.collection = self;
                        var picview = new PictureView(picture, self, self);
                        $("#saved-list").append(picview.render().el);
                        console.log('add sc ' + picture.cid);
                    });
                })
            },
            // Clear all elements from this collection
            clear: function () {
                while (model = this.first()) {
                    model.clear();
                }
            }
        });
        return new SaveCollection;
    });

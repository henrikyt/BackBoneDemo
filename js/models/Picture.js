/**
 * Model class for a single Picture
 * @return PictureModel
 */

define([
    'underscore',
    'backbone',
    'localstorage'
],

    function (_, Backbone, Store) {
        var PictureModel = Backbone.Model.extend({

            // Default attributes for the picture
            defaults: {
                url: "img/image-not-found.jpg",
                saved: false
            },

            initialize: function () {
                console.log('cr ' + this.cid);
            },
            // Destroy the associated view also
            clear: function () {
                console.log('rm ' + this.cid);
                this.destroy();
                var self = this;
                $(this.view.$el).fadeOut('slow', function () {
                    self.view.remove();
                });
            }
        });
        return PictureModel;
    });

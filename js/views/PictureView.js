/**
 * View object associated with models, contains the event triggers for manipulating single model
 * @return PictureView
 */

define([
        'jquery',
        'underscore',
        'backbone',
        'text!templates/Picture.html'
    ],

    function ($, _, Backbone, PictureTemplate) {
        var PictureView = Backbone.View.extend({

            template: _.template(PictureTemplate),

            events: {
                "mouseup .picture-button-zoom": "showPicture",
                "mouseup .picture-button-lock": "toggleSavedPicture",
                "mouseup .picture-button-unlock": "toggleSavedPicture"
            },

            initialize: function (picture, piccol, savecol) {
                // save the references
                this.model = picture;
                this.collection = piccol;
                this.savecollection = savecol;
                this.model.view = this;
            },

            render: function () {
                this.$el.html(this.template(this.model.attributes));
                if (this.model.get('saved') == true) {
                    $(this.$el.find('.picture-button')[0]).addClass("picture-button-unlock").removeClass("picture-button-lock");
                }
                return this;
            },

            showPicture: function () {
                $('#popup').attr({'src': this.model.get('url')}).fadeIn()
            },

            // Save/remove picture from the persistent storage
            toggleSavedPicture: function (e) {
                e.stopPropagation();
                if (this.model.get('saved') == true) {
                    if (!this.model.collection.localStorage)
                        return;
                    this.collection.remove(this.model);
                    this.model.collection = this.collection;
                    this.model.clear();
                } else {
                    this.model.set('saved', true);
                    $(this.$el.find('.picture-button')[0]).addClass("picture-button-unlock").removeClass("picture-button-lock");
                    this.savecollection.create(this.model.attributes);
                }
            },

            clear: function () {
                this.model.clear();
            }

        });
        return PictureView;
    });

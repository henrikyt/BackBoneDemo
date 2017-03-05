/**
 * Main view of the program. Contains event listeners for most user actions. Menu actions are processed here.
 * @return AppView
 */

define([
        'jquery',
        'underscore',
        'backbone',
        'models/Picture',
        'collections/PictureCollection',
        'text!templates/AppView.html',
        'googlesearch'
    ],

    function ($, _, Backbone, Picture, PictureCollection, LayoutTemplate, GoogleSearch) {
        var AppView = Backbone.View.extend({
            el: "#app",
            scrolltop: 0,
            isLoading: false,
            menuShown: true,
            seachWord: null,
            events: {
                "keypress #search": "doSearchEnter",
                "click #search-button": "doSearchButton",
                "click #up-button": "scrollHome",
                "click #zoom1": "zoom1",
                "click #zoom2": "zoom2",
                "click #zoom3": "zoom3",
                'scroll': 'checkScroll'},

            initialize: function () {
                var self = this;
                $(window).bind('scroll', function (ev) {
                    self.checkScroll(ev);
                });
                $(document).ready(function () {
                    var width = $('.picture-container').width();
                    if ($(window).width() < 1920)
                        self.cssSelector("width", ((width / 2 - 41) / width ) * 100 + '%');
                    else
                        self.cssSelector("width", ((width / 4 - 41) / width ) * 100 + '%');
                    // Add temporary node to calculate picture frame height
                    $("#picture-list").append('<div id="temp" class="picture-frame">');
                    self.cssSelector("height", $('.picture-frame').width() + "px");
                    $("#temp").remove();
                    if ($("#saved-list").children().length > 0) {
                        $('.footer').css({'margin-top': $(window).height() - 240});
                        setTimeout(function () {
                            $frame = $('.picture-frame');
                            if ($(window).width() < 1920)
                                var st = Math.ceil($frame.length / 2 + 6) * $frame.height()
                            else
                                var st = Math.ceil($frame.length / 4 + 6) * $frame.height()
                            $('html, body').animate({
                                scrollTop: st
                            }, 1500, function () {
                                $('#menu').animate({
                                    opacity: 1,
                                    top: "0px"
                                }, 50);
                            })
                        }, 500)
                    } else
                        $('.footer').css({'margin-top': $(window).height() - 340});
                });
            },

            render: function () {
                $(this.el).html(LayoutTemplate);
            },


            doSearchEnter: function (e) {
                if (e.keyCode != 13) return;
                this.doSearch($('#search').val(), true);
            },
            doSearchButton: function (e) {
                this.doSearch($('#search').val(), true);
            },

            doSearch: function (word, clearResults) {
                if (word == '' || word == null) return;
                if (this.seachWord == null)
                    $('.footer').css({'margin-top': 100});
                this.isLoading = true;
                this.seachWord = word;
                console.log('Searching for ' + word);
                if (clearResults) {
                    this.clear();
                }
                if (GoogleSearch.debug) {
                    for (i = 0; i < 10; i++) {
                        var pic = new Picture({url: 'img/image-not-found.jpg', saved: false});
                        PictureCollection.add(pic);
                    }
                    this.isLoading = false;
                } else {
                    var self = this
                    // Search the API by constructing the URL and adding results to the main collection
                    $.get(GoogleSearch.getUrl() + '&q=' + word, function (data) {
                        $.each(data.items, function (index, value) {
                            var pic = new Picture({url: value.link, saved: false});
                            PictureCollection.add(pic);
                        });
                        self.isLoading = false;
                        if (clearResults)
                            $('html, body').animate({
                                scrollTop: $("#header").offset().top
                            });
                    }).fail(function (data) {
                        alert(data.responseText);
                    });
                }
                $('#search').val('');

            },

            clear: function () {
                GoogleSearch.settings.start = '';
                if (PictureCollection.length > 0)
                    PictureCollection.clear();
            },


            // This is dirty, but not in the mood to do properly
            cssSelector: function (name, value) {
                var stylesheet = document.styleSheets[0],
                    selector = ".picture-frame", rule = "{" + name + ": " + value + "}";
                if (stylesheet.insertRule) {
                    stylesheet.insertRule(selector + rule, stylesheet.cssRules.length);
                } else if (stylesheet.addRule) {
                    stylesheet.addRule(selector, rule, -1);
                }
            },

            zoom3: function () {
                var self = this;
                $container = $(".picture-container");
                $container.fadeOut('fast', function () {
                    self.cssSelector("width", "100%")
                    self.cssSelector("height", "100%")
                    $container.fadeIn();
                });
            },
            zoom2: function () {
                var self = this;
                $container = $(".picture-container");
                $container.fadeOut('fast', function () {
                    self.cssSelector("width", (($container.width() / 2 - 41) / $container.width() ) * 100 + '%');
                    self.cssSelector("height", "100%")
                    $container.fadeIn();
                });
            },
            zoom1: function () {
                var self = this;
                $container = $(".picture-container");
                $container.fadeOut('fast', function () {
                    if ($(window).width() < 1920)
                        self.cssSelector("width", (($container.width() / 2 - 41) / $container.width() ) * 100 + '%');
                    else
                        self.cssSelector("width", (($container.width() / 4 - 41) / $container.width() ) * 100 + '%');
                    self.cssSelector("height", $('.picture-frame').width() + "px");
                    $container.fadeIn();
                });
            },

            checkScroll: function (ev) {
                var triggerPoint = 0;

                if (!this.menuShown && $(window).scrollTop() < this.scrolltop) {
                    this.menuShown = true;
                    $('#menu').animate({
                        opacity: 1,
                        top: "0px"
                    }, 200);
                }

                if (this.menuShown && $(window).scrollTop() > this.scrolltop) {
                    this.menuShown = false;
                    $('#menu').animate({
                        opacity: 0.25,
                        top: "-50px"
                    }, 200);
                }

                if (!this.isLoading && ($(window).scrollTop() + $(window).height() > $(document).height() - 100)) {
                    this.doSearch(this.seachWord, false);
                }

                this.scrolltop = $(window).scrollTop();
            },

            scrollHome: function () {
                $('html, body').animate({
                    scrollTop: $("#header").offset().top
                }, 500);
            }

        });
        return AppView;
    });



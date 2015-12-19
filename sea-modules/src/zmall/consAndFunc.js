define(function(require, exports, module) {
            var $ = jQuery = require('$');
            module.exports = {
                //general constant
                navOffset: 80, //top nav bar's height
                //general function
                zmallFunc: function() {
                    /* // for general // */
                    var navOffset = this.navOffset;
                    //reset all the form value
                    $("input[type=reset]").trigger("click");
                    //disable all the form's submit function
                    $("form").submit(function() {
                        return false;
                    });
                    //nav scroll watch  
                    $(window).scroll(function() {
                        //hide the part of the nav when scrolled height > 80px
                        if ($(document).scrollTop() > navOffset) {
                            $("header").addClass("hide");
                        } else {
                            //recover  
                            $("header").removeClass("hide");
                        }
                    });

                    /* // for index // */
                    //hover to show the category detail in banner left side of index
                    $(".indexMain-category li").each(function() {
                        var element = $(this);
                        var tiktak = function() {};
                        element.on("mouseenter", function() {
                            tiktak = setTimeout(function() {
                                element.children(".indexMain-catDtl").addClass("active");
                            }, 500)
                        }).on("mouseleave", function() {
                            clearTimeout(tiktak);
                            element.children(".indexMain-catDtl").removeClass("active");
                        });
                    });
                    // // active toggle: /* will be included in other script in production */
                    $('[active-toggle="true"]').each(function() {
                        var ul_ele = $(this);
                        ul_ele.children("li").each(function() {
                            var li_ele = $(this);
                            li_ele.on("click", function() {
                                li_ele.toggleClass("active");
                                li_ele.find("i").toggleClass("glyphicon-ok");
                            });
                        });
                    });

                    /* // for item detail page // */
                    // gallary photo override
                    /* version with out src change
                        // $("[gallary-override]").each(function() {
                        //     var ele = $(this),
                        //         target = $(".detail-gallary-override");
                        //     var arg = ele.attr("gallary-override");
                        //     ele.on("click", function() {
                        //         if (arg == "true") target.show();
                        //         else target.hide();
                        //     });
                        // });
                    */
                    // src pass added version
                    $("[gallary-override]").each(function() {
                        var ele = $(this),
                            target = $(".detail-gallary-override");
                        var arg = ele.attr("gallary-override"), //override the gallary photo or not
                            src_400 = ele.children("img").attr("src");
                        ele.on("click", function() {
                            if (arg == "true") {
                                target.children("img").attr("src", src_400.replace("40x40", "400x400")); //change the size of the img from tb source
                                target.show();
                            } else target.hide();
                        });
                    });
                    //delete the collections for account - collection page
                    $(document).on('click', '.acc-collect-op', function() {
                        var parentEle = $(this).parent().parent();
                        if (confirm("Delete it?")) {
                            parentEle.fadeOut();
                            setTimeout(function() {
                                parentEle.remove();
                            }, 400);
                        }
                        return false;
                    });
                },
                //function for the floor jumping
                scrollToFloor: function(dom) {
                    $("html, body").animate({

                        scrollTop: dom.offset().top - this.navOffset + "px"
                    }, {
                        duration: 300,
                        easing: "swing"
                    });
                    return false;
                },
            }
        });

define("dist/js/1.0.0/zmall-debug", [ "$-debug", "./depends/bootstrap/transition-debug", "./depends/bootstrap/dropdown-debug", "./depends/bootstrap/carousel-debug", "./depends/bootstrap/button-debug", "./zmall/selectCascade-debug", "./depends/bootstrap/bootstrap-select-debug", "./depends/bootstrap/validator-debug", "./zmall/consAndFunc-debug", "./zmall/dataHref-debug", "./zmall/checkbox_toggle-debug", "./zmall/floorJump-debug", "./zmall/bNav_scrollspy-debug", "./depends/bootstrap/scrollspy-debug", "./zmall/datepicker-debug", "./depends/bootstrap/bootstrap-datetimepicker.min-debug", "./depends/bootstrap/moment.min-debug", "./zmall/activeModalTab-debug", "./depends/bootstrap/modal-debug", "./depends/bootstrap/tab-debug", "./zmall/affixOverflow-debug", "./depends/bootstrap/affix-debug", "./zmall/lightBox-debug", "./depends/bootstrap/ekko-lightbox-debug", "./zmall/menuAccordion-debug", "./depends/bootstrap/collapse-debug", "./zmall/itemGallery-debug", "./depends/jquery.jcarousel.min-debug", "./depends/gallary-carousels-debug", "./zmall/toolTips-debug", "./depends/bootstrap/tooltip-debug", "./zmall/cartFly-debug", "./depends/fly-debug" ], function(require, exports, module) {
    var $ = jQuery = require("$-debug");
    // bootstrap transition
    var transition = require("./depends/bootstrap/transition-debug");
    // bootstrap dropdown
    var dDown = require("./depends/bootstrap/dropdown-debug");
    $(".dropdown-toggle").dropdown();
    // bootstrap carousel
    var indexCarousel = require("./depends/bootstrap/carousel-debug");
    // bootstrap button 
    var button = require("./depends/bootstrap/button-debug");
    $('[data-toggle="buttons"]').button();
    // bootstrap select and cascading
    var bselectCascade = require("./zmall/selectCascade-debug");
    // mock up data
    var select_cnt = {
        Return: [ "Merchandise does not match description", "Broken", "Poor Quality" ],
        Missing: [ "Did not receive merchandise（More than 10 days）" ]
    };
    // call cascading function
    bselectCascade.selectCascade("cascade1", select_cnt);
    //(target:"cascade1", data:select_cnt)
    //hide the img upload dom when the "Missing" is choosen
    $('[select-cascade="cascade1"]').eq(0).on("change", function() {
        if ($(this).val() == "2") {
            $("." + $(this).attr("select-hide")).addClass("sr-only");
        } else {
            $("." + $(this).attr("select-hide")).removeClass("sr-only");
        }
    });
    // validator for bootstrap
    var validator = require("./depends/bootstrap/validator-debug");
    $('form[data-toggle="validator"]').validator();
    //import the general constants and functions
    var consAndFunc = require("./zmall/consAndFunc-debug");
    consAndFunc.zmallFunc();
    //general function call
    //data href config
    var dataHref = require("./zmall/dataHref-debug");
    //get check box toggle
    var cboxTgl = require("./zmall/checkbox_toggle-debug");
    //floor anchor jumping
    var floorJump = require("./zmall/floorJump-debug");
    //scrollspy for brands page
    $("#brandNav").parents("body").addClass("zmBrandsPage");
    //add class name to the body to active the scrollspy
    var bNav_scrollspy = require("./zmall/bNav_scrollspy-debug");
    // date picker config
    var datePicker = require("./zmall/datepicker-debug");
    // modal and tab config
    var modalTab = require("./zmall/activeModalTab-debug");
    // affix call when it's overflow from the window
    var affixOflow = require("./zmall/affixOverflow-debug");
    // delegate calls to light box 
    var litebox = require("./zmall/lightBox-debug");
    // left menu accordion for account page
    var leftMenu = require("./zmall/menuAccordion-debug");
    //item detail gallary config and lazy load
    var itemGallery = require("./zmall/itemGallery-debug");
    //tool tips
    var toolTip = require("./zmall/toolTips-debug");
    //fly to cart
    var toolTip = require("./zmall/cartFly-debug");
});

define("dist/js/1.0.0/depends/bootstrap/transition-debug", [ "$-debug" ], function(require, exports, module) {
    var $ = jQuery = require("$-debug");
    /* ========================================================================
 * Bootstrap: transition.js v3.3.5
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
    +function($) {
        "use strict";
        // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
        // ============================================================
        function transitionEnd() {
            var el = document.createElement("bootstrap");
            var transEndEventNames = {
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                OTransition: "oTransitionEnd otransitionend",
                transition: "transitionend"
            };
            for (var name in transEndEventNames) {
                if (el.style[name] !== undefined) {
                    return {
                        end: transEndEventNames[name]
                    };
                }
            }
            return false;
        }
        // http://blog.alexmaccaw.com/css-transitions
        $.fn.emulateTransitionEnd = function(duration) {
            var called = false;
            var $el = this;
            $(this).one("bsTransitionEnd", function() {
                called = true;
            });
            var callback = function() {
                if (!called) $($el).trigger($.support.transition.end);
            };
            setTimeout(callback, duration);
            return this;
        };
        $(function() {
            $.support.transition = transitionEnd();
            if (!$.support.transition) return;
            $.event.special.bsTransitionEnd = {
                bindType: $.support.transition.end,
                delegateType: $.support.transition.end,
                handle: function(e) {
                    if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments);
                }
            };
        });
    }(jQuery);
});

define("dist/js/1.0.0/depends/bootstrap/dropdown-debug", [ "$-debug" ], function(require, exports, module) {
    var $ = jQuery = require("$-debug");
    /* ========================================================================
 * Bootstrap: dropdown.js v3.3.5
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
    +function($) {
        "use strict";
        // DROPDOWN CLASS DEFINITION
        // =========================
        var backdrop = ".dropdown-backdrop";
        var toggle = '[data-toggle="dropdown"]';
        var Dropdown = function(element) {
            $(element).on("click.bs.dropdown", this.toggle);
        };
        Dropdown.VERSION = "3.3.5";
        function getParent($this) {
            var selector = $this.attr("data-target");
            if (!selector) {
                selector = $this.attr("href");
                selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, "");
            }
            var $parent = selector && $(selector);
            return $parent && $parent.length ? $parent : $this.parent();
        }
        function clearMenus(e) {
            if (e && e.which === 3) return;
            $(backdrop).remove();
            $(toggle).each(function() {
                var $this = $(this);
                var $parent = getParent($this);
                var relatedTarget = {
                    relatedTarget: this
                };
                if (!$parent.hasClass("open")) return;
                if (e && e.type == "click" && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target)) return;
                $parent.trigger(e = $.Event("hide.bs.dropdown", relatedTarget));
                if (e.isDefaultPrevented()) return;
                $this.attr("aria-expanded", "false");
                $parent.removeClass("open").trigger("hidden.bs.dropdown", relatedTarget);
            });
        }
        Dropdown.prototype.toggle = function(e) {
            var $this = $(this);
            if ($this.is(".disabled, :disabled")) return;
            var $parent = getParent($this);
            var isActive = $parent.hasClass("open");
            clearMenus();
            if (!isActive) {
                if ("ontouchstart" in document.documentElement && !$parent.closest(".navbar-nav").length) {
                    // if mobile we use a backdrop because click events don't delegate
                    $(document.createElement("div")).addClass("dropdown-backdrop").insertAfter($(this)).on("click", clearMenus);
                }
                var relatedTarget = {
                    relatedTarget: this
                };
                $parent.trigger(e = $.Event("show.bs.dropdown", relatedTarget));
                if (e.isDefaultPrevented()) return;
                $this.trigger("focus").attr("aria-expanded", "true");
                $parent.toggleClass("open").trigger("shown.bs.dropdown", relatedTarget);
            }
            return false;
        };
        Dropdown.prototype.keydown = function(e) {
            if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return;
            var $this = $(this);
            e.preventDefault();
            e.stopPropagation();
            if ($this.is(".disabled, :disabled")) return;
            var $parent = getParent($this);
            var isActive = $parent.hasClass("open");
            if (!isActive && e.which != 27 || isActive && e.which == 27) {
                if (e.which == 27) $parent.find(toggle).trigger("focus");
                return $this.trigger("click");
            }
            var desc = " li:not(.disabled):visible a";
            var $items = $parent.find(".dropdown-menu" + desc);
            if (!$items.length) return;
            var index = $items.index(e.target);
            if (e.which == 38 && index > 0) index--;
            // up
            if (e.which == 40 && index < $items.length - 1) index++;
            // down
            if (!~index) index = 0;
            $items.eq(index).trigger("focus");
        };
        // DROPDOWN PLUGIN DEFINITION
        // ==========================
        function Plugin(option) {
            return this.each(function() {
                var $this = $(this);
                var data = $this.data("bs.dropdown");
                if (!data) $this.data("bs.dropdown", data = new Dropdown(this));
                if (typeof option == "string") data[option].call($this);
            });
        }
        var old = $.fn.dropdown;
        $.fn.dropdown = Plugin;
        $.fn.dropdown.Constructor = Dropdown;
        // DROPDOWN NO CONFLICT
        // ====================
        $.fn.dropdown.noConflict = function() {
            $.fn.dropdown = old;
            return this;
        };
        // APPLY TO STANDARD DROPDOWN ELEMENTS
        // ===================================
        $(document).on("click.bs.dropdown.data-api", clearMenus).on("click.bs.dropdown.data-api", ".dropdown form", function(e) {
            e.stopPropagation();
        }).on("click.bs.dropdown.data-api", toggle, Dropdown.prototype.toggle).on("keydown.bs.dropdown.data-api", toggle, Dropdown.prototype.keydown).on("keydown.bs.dropdown.data-api", ".dropdown-menu", Dropdown.prototype.keydown);
    }(jQuery);
});

define("dist/js/1.0.0/depends/bootstrap/carousel-debug", [ "$-debug" ], function(require, exports, module) {
    var $ = jQuery = require("$-debug");
    /* ========================================================================
 * Bootstrap: carousel.js v3.3.5
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
    +function($) {
        "use strict";
        // CAROUSEL CLASS DEFINITION
        // =========================
        var Carousel = function(element, options) {
            this.$element = $(element);
            this.$indicators = this.$element.find(".carousel-indicators");
            this.options = options;
            this.paused = null;
            this.sliding = null;
            this.interval = null;
            this.$active = null;
            this.$items = null;
            this.options.keyboard && this.$element.on("keydown.bs.carousel", $.proxy(this.keydown, this));
            this.options.pause == "hover" && !("ontouchstart" in document.documentElement) && this.$element.on("mouseenter.bs.carousel", $.proxy(this.pause, this)).on("mouseleave.bs.carousel", $.proxy(this.cycle, this));
        };
        Carousel.VERSION = "3.3.5";
        Carousel.TRANSITION_DURATION = 600;
        Carousel.DEFAULTS = {
            interval: 5e3,
            pause: "hover",
            wrap: true,
            keyboard: true
        };
        Carousel.prototype.keydown = function(e) {
            if (/input|textarea/i.test(e.target.tagName)) return;
            switch (e.which) {
              case 37:
                this.prev();
                break;

              case 39:
                this.next();
                break;

              default:
                return;
            }
            e.preventDefault();
        };
        Carousel.prototype.cycle = function(e) {
            e || (this.paused = false);
            this.interval && clearInterval(this.interval);
            this.options.interval && !this.paused && (this.interval = setInterval($.proxy(this.next, this), this.options.interval));
            return this;
        };
        Carousel.prototype.getItemIndex = function(item) {
            this.$items = item.parent().children(".item");
            return this.$items.index(item || this.$active);
        };
        Carousel.prototype.getItemForDirection = function(direction, active) {
            var activeIndex = this.getItemIndex(active);
            var willWrap = direction == "prev" && activeIndex === 0 || direction == "next" && activeIndex == this.$items.length - 1;
            if (willWrap && !this.options.wrap) return active;
            var delta = direction == "prev" ? -1 : 1;
            var itemIndex = (activeIndex + delta) % this.$items.length;
            return this.$items.eq(itemIndex);
        };
        Carousel.prototype.to = function(pos) {
            var that = this;
            var activeIndex = this.getItemIndex(this.$active = this.$element.find(".item.active"));
            if (pos > this.$items.length - 1 || pos < 0) return;
            if (this.sliding) return this.$element.one("slid.bs.carousel", function() {
                that.to(pos);
            });
            // yes, "slid"
            if (activeIndex == pos) return this.pause().cycle();
            return this.slide(pos > activeIndex ? "next" : "prev", this.$items.eq(pos));
        };
        Carousel.prototype.pause = function(e) {
            e || (this.paused = true);
            if (this.$element.find(".next, .prev").length && $.support.transition) {
                this.$element.trigger($.support.transition.end);
                this.cycle(true);
            }
            this.interval = clearInterval(this.interval);
            return this;
        };
        Carousel.prototype.next = function() {
            if (this.sliding) return;
            return this.slide("next");
        };
        Carousel.prototype.prev = function() {
            if (this.sliding) return;
            return this.slide("prev");
        };
        Carousel.prototype.slide = function(type, next) {
            var $active = this.$element.find(".item.active");
            var $next = next || this.getItemForDirection(type, $active);
            var isCycling = this.interval;
            var direction = type == "next" ? "left" : "right";
            var that = this;
            if ($next.hasClass("active")) return this.sliding = false;
            var relatedTarget = $next[0];
            var slideEvent = $.Event("slide.bs.carousel", {
                relatedTarget: relatedTarget,
                direction: direction
            });
            this.$element.trigger(slideEvent);
            if (slideEvent.isDefaultPrevented()) return;
            this.sliding = true;
            isCycling && this.pause();
            if (this.$indicators.length) {
                this.$indicators.find(".active").removeClass("active");
                var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)]);
                $nextIndicator && $nextIndicator.addClass("active");
            }
            var slidEvent = $.Event("slid.bs.carousel", {
                relatedTarget: relatedTarget,
                direction: direction
            });
            // yes, "slid"
            if ($.support.transition && this.$element.hasClass("slide")) {
                $next.addClass(type);
                $next[0].offsetWidth;
                // force reflow
                $active.addClass(direction);
                $next.addClass(direction);
                $active.one("bsTransitionEnd", function() {
                    $next.removeClass([ type, direction ].join(" ")).addClass("active");
                    $active.removeClass([ "active", direction ].join(" "));
                    that.sliding = false;
                    setTimeout(function() {
                        that.$element.trigger(slidEvent);
                    }, 0);
                }).emulateTransitionEnd(Carousel.TRANSITION_DURATION);
            } else {
                $active.removeClass("active");
                $next.addClass("active");
                this.sliding = false;
                this.$element.trigger(slidEvent);
            }
            isCycling && this.cycle();
            return this;
        };
        // CAROUSEL PLUGIN DEFINITION
        // ==========================
        function Plugin(option) {
            return this.each(function() {
                var $this = $(this);
                var data = $this.data("bs.carousel");
                var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == "object" && option);
                var action = typeof option == "string" ? option : options.slide;
                if (!data) $this.data("bs.carousel", data = new Carousel(this, options));
                if (typeof option == "number") data.to(option); else if (action) data[action](); else if (options.interval) data.pause().cycle();
            });
        }
        var old = $.fn.carousel;
        $.fn.carousel = Plugin;
        $.fn.carousel.Constructor = Carousel;
        // CAROUSEL NO CONFLICT
        // ====================
        $.fn.carousel.noConflict = function() {
            $.fn.carousel = old;
            return this;
        };
        // CAROUSEL DATA-API
        // =================
        var clickHandler = function(e) {
            var href;
            var $this = $(this);
            var $target = $($this.attr("data-target") || (href = $this.attr("href")) && href.replace(/.*(?=#[^\s]+$)/, ""));
            // strip for ie7
            if (!$target.hasClass("carousel")) return;
            var options = $.extend({}, $target.data(), $this.data());
            var slideIndex = $this.attr("data-slide-to");
            if (slideIndex) options.interval = false;
            Plugin.call($target, options);
            if (slideIndex) {
                $target.data("bs.carousel").to(slideIndex);
            }
            e.preventDefault();
        };
        $(document).on("click.bs.carousel.data-api", "[data-slide]", clickHandler).on("click.bs.carousel.data-api", "[data-slide-to]", clickHandler);
        $(window).on("load", function() {
            $('[data-ride="carousel"]').each(function() {
                var $carousel = $(this);
                Plugin.call($carousel, $carousel.data());
            });
        });
    }(jQuery);
});

define("dist/js/1.0.0/depends/bootstrap/button-debug", [ "$-debug" ], function(require, exports, module) {
    var $ = jQuery = require("$-debug");
    /* ========================================================================
 * Bootstrap: button.js v3.3.5
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
    +function($) {
        "use strict";
        // BUTTON PUBLIC CLASS DEFINITION
        // ==============================
        var Button = function(element, options) {
            this.$element = $(element);
            this.options = $.extend({}, Button.DEFAULTS, options);
            this.isLoading = false;
        };
        Button.VERSION = "3.3.5";
        Button.DEFAULTS = {
            loadingText: "loading..."
        };
        Button.prototype.setState = function(state) {
            var d = "disabled";
            var $el = this.$element;
            var val = $el.is("input") ? "val" : "html";
            var data = $el.data();
            state += "Text";
            if (data.resetText == null) $el.data("resetText", $el[val]());
            // push to event loop to allow forms to submit
            setTimeout($.proxy(function() {
                $el[val](data[state] == null ? this.options[state] : data[state]);
                if (state == "loadingText") {
                    this.isLoading = true;
                    $el.addClass(d).attr(d, d);
                } else if (this.isLoading) {
                    this.isLoading = false;
                    $el.removeClass(d).removeAttr(d);
                }
            }, this), 0);
        };
        Button.prototype.toggle = function() {
            var changed = true;
            var $parent = this.$element.closest('[data-toggle="buttons"]');
            if ($parent.length) {
                var $input = this.$element.find("input");
                if ($input.prop("type") == "radio") {
                    if ($input.prop("checked")) changed = false;
                    $parent.find(".active").removeClass("active");
                    this.$element.addClass("active");
                } else if ($input.prop("type") == "checkbox") {
                    if ($input.prop("checked") !== this.$element.hasClass("active")) changed = false;
                    this.$element.toggleClass("active");
                }
                $input.prop("checked", this.$element.hasClass("active"));
                if (changed) $input.trigger("change");
            } else {
                this.$element.attr("aria-pressed", !this.$element.hasClass("active"));
                this.$element.toggleClass("active");
            }
        };
        // BUTTON PLUGIN DEFINITION
        // ========================
        function Plugin(option) {
            return this.each(function() {
                var $this = $(this);
                var data = $this.data("bs.button");
                var options = typeof option == "object" && option;
                if (!data) $this.data("bs.button", data = new Button(this, options));
                if (option == "toggle") data.toggle(); else if (option) data.setState(option);
            });
        }
        var old = $.fn.button;
        $.fn.button = Plugin;
        $.fn.button.Constructor = Button;
        // BUTTON NO CONFLICT
        // ==================
        $.fn.button.noConflict = function() {
            $.fn.button = old;
            return this;
        };
        // BUTTON DATA-API
        // ===============
        $(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function(e) {
            var $btn = $(e.target);
            if (!$btn.hasClass("btn")) $btn = $btn.closest(".btn");
            Plugin.call($btn, "toggle");
            if (!($(e.target).is('input[type="radio"]') || $(e.target).is('input[type="checkbox"]'))) e.preventDefault();
        }).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function(e) {
            $(e.target).closest(".btn").toggleClass("focus", /^focus(in)?$/.test(e.type));
        });
    }(jQuery);
});

define("dist/js/1.0.0/zmall/selectCascade-debug", [ "$-debug", "dist/js/1.0.0/depends/bootstrap/bootstrap-select-debug" ], function(require, exports, module) {
    //select cascading based on bootstrap-select
    var $ = jQuery = require("$-debug");
    var bSelect = require("dist/js/1.0.0/depends/bootstrap/bootstrap-select-debug");
    exports.selectCascade = function(target, cnt) {
        var select = $('[select-cascade="' + target + '"]');
        //targets
        var p_sel = select.eq(0);
        // 1st select
        var c_sel = select.eq(1);
        // 2st select
        var p_opt_arr = [];
        var c_opt = p_opt = '<option value="0">Please select...</option>';
        // default options
        for (var i in cnt) {
            p_opt_arr.push(i);
        }
        p_opt_arr.forEach(function(item) {
            p_opt += "<option value='" + (p_opt_arr.indexOf(item) + 1) + "'>" + item + "</option>";
        });
        //init the selects
        p_sel.empty().append(p_opt);
        c_sel.empty().append(c_opt);
        c_sel.prop("disabled", true);
        select.selectpicker("refresh");
        //cascading work when value changes
        p_sel.on("change", function() {
            var sel_val = $(this).val() - 1;
            //selected value = order of this selection
            for (var j in cnt) {
                // change according to the key
                if (p_opt_arr[sel_val] == j) {
                    c_sel.prop("disabled", false);
                    //make the 2nd select selectable
                    c_opt = '<option value="0">Please select...</option>';
                    //init the option again
                    cnt[j].forEach(function(item) {
                        c_opt += "<option value='" + (cnt[j].indexOf(item) + 1) + "'>" + item + "</option>";
                    });
                    c_sel.empty().append(c_opt);
                    c_sel.selectpicker("refresh");
                } else if ($(this).val() == "" || $(this).val() == "0") {
                    c_sel.empty().append(c_opt);
                    c_sel.prop("disabled", true);
                    //disable the select
                    c_sel.selectpicker("refresh");
                }
            }
        });
    };
});

define("dist/js/1.0.0/depends/bootstrap/bootstrap-select-debug", [ "$-debug" ], function(require, exports, module) {
    var $ = jQuery = require("$-debug");
    /*!
 * Bootstrap-select v1.8.1 (http://silviomoreto.github.io/bootstrap-select)
 *
 * Copyright 2013-2015 bootstrap-select
 * Licensed under MIT (https://github.com/silviomoreto/bootstrap-select/blob/master/LICENSE)
 */
    // (function (root, factory) {
    //   if (typeof define === 'function' && define.amd) {
    //     // AMD. Register as an anonymous module unless amdModuleId is set
    //     define(["jquery"], function (a0) {
    //       return (factory(a0));
    //     });
    //   } else if (typeof exports === 'object') {
    //     // Node. Does not work with strict CommonJS, but
    //     // only CommonJS-like environments that support module.exports,
    //     // like Node.
    //     module.exports = factory(require("jquery"));
    //   } else {
    //     factory(jQuery);
    //   }
    // }(this, function (jQuery) {
    // (function ($) {
    //   'use strict';
    //<editor-fold desc="Shims">
    if (!String.prototype.includes) {
        (function() {
            "use strict";
            // needed to support `apply`/`call` with `undefined`/`null`
            var toString = {}.toString;
            var defineProperty = function() {
                // IE 8 only supports `Object.defineProperty` on DOM elements
                try {
                    var object = {};
                    var $defineProperty = Object.defineProperty;
                    var result = $defineProperty(object, object, object) && $defineProperty;
                } catch (error) {}
                return result;
            }();
            var indexOf = "".indexOf;
            var includes = function(search) {
                if (this == null) {
                    throw new TypeError();
                }
                var string = String(this);
                if (search && toString.call(search) == "[object RegExp]") {
                    throw new TypeError();
                }
                var stringLength = string.length;
                var searchString = String(search);
                var searchLength = searchString.length;
                var position = arguments.length > 1 ? arguments[1] : undefined;
                // `ToInteger`
                var pos = position ? Number(position) : 0;
                if (pos != pos) {
                    // better `isNaN`
                    pos = 0;
                }
                var start = Math.min(Math.max(pos, 0), stringLength);
                // Avoid the `indexOf` call if no match is possible
                if (searchLength + start > stringLength) {
                    return false;
                }
                return indexOf.call(string, searchString, pos) != -1;
            };
            if (defineProperty) {
                defineProperty(String.prototype, "includes", {
                    value: includes,
                    configurable: true,
                    writable: true
                });
            } else {
                String.prototype.includes = includes;
            }
        })();
    }
    if (!String.prototype.startsWith) {
        (function() {
            "use strict";
            // needed to support `apply`/`call` with `undefined`/`null`
            var defineProperty = function() {
                // IE 8 only supports `Object.defineProperty` on DOM elements
                try {
                    var object = {};
                    var $defineProperty = Object.defineProperty;
                    var result = $defineProperty(object, object, object) && $defineProperty;
                } catch (error) {}
                return result;
            }();
            var toString = {}.toString;
            var startsWith = function(search) {
                if (this == null) {
                    throw new TypeError();
                }
                var string = String(this);
                if (search && toString.call(search) == "[object RegExp]") {
                    throw new TypeError();
                }
                var stringLength = string.length;
                var searchString = String(search);
                var searchLength = searchString.length;
                var position = arguments.length > 1 ? arguments[1] : undefined;
                // `ToInteger`
                var pos = position ? Number(position) : 0;
                if (pos != pos) {
                    // better `isNaN`
                    pos = 0;
                }
                var start = Math.min(Math.max(pos, 0), stringLength);
                // Avoid the `indexOf` call if no match is possible
                if (searchLength + start > stringLength) {
                    return false;
                }
                var index = -1;
                while (++index < searchLength) {
                    if (string.charCodeAt(start + index) != searchString.charCodeAt(index)) {
                        return false;
                    }
                }
                return true;
            };
            if (defineProperty) {
                defineProperty(String.prototype, "startsWith", {
                    value: startsWith,
                    configurable: true,
                    writable: true
                });
            } else {
                String.prototype.startsWith = startsWith;
            }
        })();
    }
    if (!Object.keys) {
        Object.keys = function(o, // object
        k, // key
        r) {
            // initialize object and result
            r = [];
            // iterate over object keys
            for (k in o) // fill result array with non-prototypical keys
            r.hasOwnProperty.call(o, k) && r.push(k);
            // return result
            return r;
        };
    }
    $.fn.triggerNative = function(eventName) {
        var el = this[0], event;
        if (el.dispatchEvent) {
            if (typeof Event === "function") {
                // For modern browsers
                event = new Event(eventName, {
                    bubbles: true
                });
            } else {
                // For IE since it doesn't support Event constructor
                event = document.createEvent("Event");
                event.initEvent(eventName, true, false);
            }
            el.dispatchEvent(event);
        } else {
            if (el.fireEvent) {
                event = document.createEventObject();
                event.eventType = eventName;
                el.fireEvent("on" + eventName, event);
            }
            this.trigger(eventName);
        }
    };
    //</editor-fold>
    // Case insensitive contains search
    $.expr[":"].icontains = function(obj, index, meta) {
        var $obj = $(obj);
        var haystack = ($obj.data("tokens") || $obj.text()).toUpperCase();
        return haystack.includes(meta[3].toUpperCase());
    };
    // Case insensitive begins search
    $.expr[":"].ibegins = function(obj, index, meta) {
        var $obj = $(obj);
        var haystack = ($obj.data("tokens") || $obj.text()).toUpperCase();
        return haystack.startsWith(meta[3].toUpperCase());
    };
    // Case and accent insensitive contains search
    $.expr[":"].aicontains = function(obj, index, meta) {
        var $obj = $(obj);
        var haystack = ($obj.data("tokens") || $obj.data("normalizedText") || $obj.text()).toUpperCase();
        return haystack.includes(meta[3].toUpperCase());
    };
    // Case and accent insensitive begins search
    $.expr[":"].aibegins = function(obj, index, meta) {
        var $obj = $(obj);
        var haystack = ($obj.data("tokens") || $obj.data("normalizedText") || $obj.text()).toUpperCase();
        return haystack.startsWith(meta[3].toUpperCase());
    };
    /**
   * Remove all diatrics from the given text.
   * @access private
   * @param {String} text
   * @returns {String}
   */
    function normalizeToBase(text) {
        var rExps = [ {
            re: /[\xC0-\xC6]/g,
            ch: "A"
        }, {
            re: /[\xE0-\xE6]/g,
            ch: "a"
        }, {
            re: /[\xC8-\xCB]/g,
            ch: "E"
        }, {
            re: /[\xE8-\xEB]/g,
            ch: "e"
        }, {
            re: /[\xCC-\xCF]/g,
            ch: "I"
        }, {
            re: /[\xEC-\xEF]/g,
            ch: "i"
        }, {
            re: /[\xD2-\xD6]/g,
            ch: "O"
        }, {
            re: /[\xF2-\xF6]/g,
            ch: "o"
        }, {
            re: /[\xD9-\xDC]/g,
            ch: "U"
        }, {
            re: /[\xF9-\xFC]/g,
            ch: "u"
        }, {
            re: /[\xC7-\xE7]/g,
            ch: "c"
        }, {
            re: /[\xD1]/g,
            ch: "N"
        }, {
            re: /[\xF1]/g,
            ch: "n"
        } ];
        $.each(rExps, function() {
            text = text.replace(this.re, this.ch);
        });
        return text;
    }
    function htmlEscape(html) {
        var escapeMap = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#x27;",
            "`": "&#x60;"
        };
        var source = "(?:" + Object.keys(escapeMap).join("|") + ")", testRegexp = new RegExp(source), replaceRegexp = new RegExp(source, "g"), string = html == null ? "" : "" + html;
        return testRegexp.test(string) ? string.replace(replaceRegexp, function(match) {
            return escapeMap[match];
        }) : string;
    }
    var Selectpicker = function(element, options, e) {
        if (e) {
            e.stopPropagation();
            e.preventDefault();
        }
        this.$element = $(element);
        this.$newElement = null;
        this.$button = null;
        this.$menu = null;
        this.$lis = null;
        this.options = options;
        // If we have no title yet, try to pull it from the html title attribute (jQuery doesnt' pick it up as it's not a
        // data-attribute)
        if (this.options.title === null) {
            this.options.title = this.$element.attr("title");
        }
        //Expose public methods
        this.val = Selectpicker.prototype.val;
        this.render = Selectpicker.prototype.render;
        this.refresh = Selectpicker.prototype.refresh;
        this.setStyle = Selectpicker.prototype.setStyle;
        this.selectAll = Selectpicker.prototype.selectAll;
        this.deselectAll = Selectpicker.prototype.deselectAll;
        this.destroy = Selectpicker.prototype.destroy;
        this.remove = Selectpicker.prototype.remove;
        this.show = Selectpicker.prototype.show;
        this.hide = Selectpicker.prototype.hide;
        this.init();
    };
    Selectpicker.VERSION = "1.8.1";
    // part of this is duplicated in i18n/defaults-en_US.js. Make sure to update both.
    Selectpicker.DEFAULTS = {
        noneSelectedText: "Nothing selected",
        noneResultsText: "No results matched {0}",
        countSelectedText: function(numSelected, numTotal) {
            return numSelected == 1 ? "{0} item selected" : "{0} items selected";
        },
        maxOptionsText: function(numAll, numGroup) {
            return [ numAll == 1 ? "Limit reached ({n} item max)" : "Limit reached ({n} items max)", numGroup == 1 ? "Group limit reached ({n} item max)" : "Group limit reached ({n} items max)" ];
        },
        selectAllText: "Select All",
        deselectAllText: "Deselect All",
        doneButton: false,
        doneButtonText: "Close",
        multipleSeparator: ", ",
        styleBase: "btn",
        style: "btn-default",
        size: "auto",
        title: null,
        selectedTextFormat: "values",
        width: false,
        container: false,
        hideDisabled: false,
        showSubtext: false,
        showIcon: true,
        showContent: true,
        dropupAuto: true,
        header: false,
        liveSearch: false,
        liveSearchPlaceholder: null,
        liveSearchNormalize: false,
        liveSearchStyle: "contains",
        actionsBox: false,
        iconBase: "glyphicon",
        tickIcon: "glyphicon-ok",
        template: {
            caret: '<span class="caret"></span>'
        },
        maxOptions: false,
        mobile: false,
        selectOnTab: false,
        dropdownAlignRight: false
    };
    Selectpicker.prototype = {
        constructor: Selectpicker,
        init: function() {
            var that = this, id = this.$element.attr("id");
            // store originalIndex (key) and newIndex (value) in this.liObj for fast accessibility
            // allows us to do this.$lis.eq(that.liObj[index]) instead of this.$lis.filter('[data-original-index="' + index + '"]')
            this.liObj = {};
            this.multiple = this.$element.prop("multiple");
            this.autofocus = this.$element.prop("autofocus");
            this.$newElement = this.createView();
            this.$element.after(this.$newElement).appendTo(this.$newElement);
            this.$button = this.$newElement.children("button");
            this.$menu = this.$newElement.children(".dropdown-menu");
            this.$menuInner = this.$menu.children(".inner");
            this.$searchbox = this.$menu.find("input");
            if (this.options.dropdownAlignRight) this.$menu.addClass("dropdown-menu-right");
            if (typeof id !== "undefined") {
                this.$button.attr("data-id", id);
                $('label[for="' + id + '"]').click(function(e) {
                    e.preventDefault();
                    that.$button.focus();
                });
            }
            this.checkDisabled();
            this.clickListener();
            if (this.options.liveSearch) this.liveSearchListener();
            this.render();
            this.setStyle();
            this.setWidth();
            if (this.options.container) this.selectPosition();
            this.$menu.data("this", this);
            this.$newElement.data("this", this);
            if (this.options.mobile) this.mobile();
            this.$newElement.on({
                "hide.bs.dropdown": function(e) {
                    that.$element.trigger("hide.bs.select", e);
                },
                "hidden.bs.dropdown": function(e) {
                    that.$element.trigger("hidden.bs.select", e);
                },
                "show.bs.dropdown": function(e) {
                    that.$element.trigger("show.bs.select", e);
                },
                "shown.bs.dropdown": function(e) {
                    that.$element.trigger("shown.bs.select", e);
                }
            });
            if (that.$element[0].hasAttribute("required")) {
                this.$element.on("invalid", function() {
                    that.$button.addClass("bs-invalid").focus();
                    that.$element.on({
                        "focus.bs.select": function() {
                            that.$button.focus();
                            that.$element.off("focus.bs.select");
                        },
                        "shown.bs.select": function() {
                            that.$element.val(that.$element.val()).off("shown.bs.select");
                        },
                        "rendered.bs.select": function() {
                            // if select is no longer invalid, remove the bs-invalid class
                            if (this.validity.valid) that.$button.removeClass("bs-invalid");
                            that.$element.off("rendered.bs.select");
                        }
                    });
                });
            }
            setTimeout(function() {
                that.$element.trigger("loaded.bs.select");
            });
        },
        createDropdown: function() {
            // Options
            // If we are multiple, then add the show-tick class by default
            var multiple = this.multiple ? " show-tick" : "", inputGroup = this.$element.parent().hasClass("input-group") ? " input-group-btn" : "", autofocus = this.autofocus ? " autofocus" : "";
            // Elements
            var header = this.options.header ? '<div class="popover-title"><button type="button" class="close" aria-hidden="true">&times;</button>' + this.options.header + "</div>" : "";
            var searchbox = this.options.liveSearch ? '<div class="bs-searchbox">' + '<input type="text" class="form-control" autocomplete="off"' + (null === this.options.liveSearchPlaceholder ? "" : ' placeholder="' + htmlEscape(this.options.liveSearchPlaceholder) + '"') + ">" + "</div>" : "";
            var actionsbox = this.multiple && this.options.actionsBox ? '<div class="bs-actionsbox">' + '<div class="btn-group btn-group-sm btn-block">' + '<button type="button" class="actions-btn bs-select-all btn btn-default">' + this.options.selectAllText + "</button>" + '<button type="button" class="actions-btn bs-deselect-all btn btn-default">' + this.options.deselectAllText + "</button>" + "</div>" + "</div>" : "";
            var donebutton = this.multiple && this.options.doneButton ? '<div class="bs-donebutton">' + '<div class="btn-group btn-block">' + '<button type="button" class="btn btn-sm btn-default">' + this.options.doneButtonText + "</button>" + "</div>" + "</div>" : "";
            var drop = '<div class="btn-group bootstrap-select' + multiple + inputGroup + '">' + '<button type="button" class="' + this.options.styleBase + ' dropdown-toggle" data-toggle="dropdown"' + autofocus + ">" + '<span class="filter-option pull-left"></span>&nbsp;' + '<span class="bs-caret">' + this.options.template.caret + "</span>" + "</button>" + '<div class="dropdown-menu open">' + header + searchbox + actionsbox + '<ul class="dropdown-menu inner" role="menu">' + "</ul>" + donebutton + "</div>" + "</div>";
            return $(drop);
        },
        createView: function() {
            var $drop = this.createDropdown(), li = this.createLi();
            $drop.find("ul")[0].innerHTML = li;
            return $drop;
        },
        reloadLi: function() {
            //Remove all children.
            this.destroyLi();
            //Re build
            var li = this.createLi();
            this.$menuInner[0].innerHTML = li;
        },
        destroyLi: function() {
            this.$menu.find("li").remove();
        },
        createLi: function() {
            var that = this, _li = [], optID = 0, titleOption = document.createElement("option"), liIndex = -1;
            // increment liIndex whenever a new <li> element is created to ensure liObj is correct
            // Helper functions
            /**
       * @param content
       * @param [index]
       * @param [classes]
       * @param [optgroup]
       * @returns {string}
       */
            var generateLI = function(content, index, classes, optgroup) {
                return "<li" + (typeof classes !== "undefined" & "" !== classes ? ' class="' + classes + '"' : "") + (typeof index !== "undefined" & null !== index ? ' data-original-index="' + index + '"' : "") + (typeof optgroup !== "undefined" & null !== optgroup ? 'data-optgroup="' + optgroup + '"' : "") + ">" + content + "</li>";
            };
            /**
       * @param text
       * @param [classes]
       * @param [inline]
       * @param [tokens]
       * @returns {string}
       */
            var generateA = function(text, classes, inline, tokens) {
                return '<a tabindex="0"' + (typeof classes !== "undefined" ? ' class="' + classes + '"' : "") + (typeof inline !== "undefined" ? ' style="' + inline + '"' : "") + (that.options.liveSearchNormalize ? ' data-normalized-text="' + normalizeToBase(htmlEscape(text)) + '"' : "") + (typeof tokens !== "undefined" || tokens !== null ? ' data-tokens="' + tokens + '"' : "") + ">" + text + '<span class="' + that.options.iconBase + " " + that.options.tickIcon + ' check-mark"></span>' + "</a>";
            };
            if (this.options.title && !this.multiple) {
                // this option doesn't create a new <li> element, but does add a new option, so liIndex is decreased
                // since liObj is recalculated on every refresh, liIndex needs to be decreased even if the titleOption is already appended
                liIndex--;
                if (!this.$element.find(".bs-title-option").length) {
                    // Use native JS to prepend option (faster)
                    var element = this.$element[0];
                    titleOption.className = "bs-title-option";
                    titleOption.appendChild(document.createTextNode(this.options.title));
                    titleOption.value = "";
                    element.insertBefore(titleOption, element.firstChild);
                    // Check if selected attribute is already set on an option. If not, select the titleOption option.
                    if ($(element.options[element.selectedIndex]).attr("selected") === undefined) titleOption.selected = true;
                }
            }
            this.$element.find("option").each(function(index) {
                var $this = $(this);
                liIndex++;
                if ($this.hasClass("bs-title-option")) return;
                // Get the class and text for the option
                var optionClass = this.className || "", inline = this.style.cssText, text = $this.data("content") ? $this.data("content") : $this.html(), tokens = $this.data("tokens") ? $this.data("tokens") : null, subtext = typeof $this.data("subtext") !== "undefined" ? '<small class="text-muted">' + $this.data("subtext") + "</small>" : "", icon = typeof $this.data("icon") !== "undefined" ? '<span class="' + that.options.iconBase + " " + $this.data("icon") + '"></span> ' : "", isDisabled = this.disabled || this.parentNode.tagName === "OPTGROUP" && this.parentNode.disabled;
                if (icon !== "" && isDisabled) {
                    icon = "<span>" + icon + "</span>";
                }
                if (that.options.hideDisabled && isDisabled) {
                    liIndex--;
                    return;
                }
                if (!$this.data("content")) {
                    // Prepend any icon and append any subtext to the main text.
                    text = icon + '<span class="text">' + text + subtext + "</span>";
                }
                if (this.parentNode.tagName === "OPTGROUP" && $this.data("divider") !== true) {
                    var optGroupClass = " " + this.parentNode.className || "";
                    if ($this.index() === 0) {
                        // Is it the first option of the optgroup?
                        optID += 1;
                        // Get the opt group label
                        var label = this.parentNode.label, labelSubtext = typeof $this.parent().data("subtext") !== "undefined" ? '<small class="text-muted">' + $this.parent().data("subtext") + "</small>" : "", labelIcon = $this.parent().data("icon") ? '<span class="' + that.options.iconBase + " " + $this.parent().data("icon") + '"></span> ' : "";
                        label = labelIcon + '<span class="text">' + label + labelSubtext + "</span>";
                        if (index !== 0 && _li.length > 0) {
                            // Is it NOT the first option of the select && are there elements in the dropdown?
                            liIndex++;
                            _li.push(generateLI("", null, "divider", optID + "div"));
                        }
                        liIndex++;
                        _li.push(generateLI(label, null, "dropdown-header" + optGroupClass, optID));
                    }
                    _li.push(generateLI(generateA(text, "opt " + optionClass + optGroupClass, inline, tokens), index, "", optID));
                } else if ($this.data("divider") === true) {
                    _li.push(generateLI("", index, "divider"));
                } else if ($this.data("hidden") === true) {
                    _li.push(generateLI(generateA(text, optionClass, inline, tokens), index, "hidden is-hidden"));
                } else {
                    if (this.previousElementSibling && this.previousElementSibling.tagName === "OPTGROUP") {
                        liIndex++;
                        _li.push(generateLI("", null, "divider", optID + "div"));
                    }
                    _li.push(generateLI(generateA(text, optionClass, inline, tokens), index));
                }
                that.liObj[index] = liIndex;
            });
            //If we are not multiple, we don't have a selected item, and we don't have a title, select the first element so something is set in the button
            if (!this.multiple && this.$element.find("option:selected").length === 0 && !this.options.title) {
                this.$element.find("option").eq(0).prop("selected", true).attr("selected", "selected");
            }
            return _li.join("");
        },
        findLis: function() {
            if (this.$lis == null) this.$lis = this.$menu.find("li");
            return this.$lis;
        },
        /**
     * @param [updateLi] defaults to true
     */
        render: function(updateLi) {
            var that = this, notDisabled;
            //Update the LI to match the SELECT
            if (updateLi !== false) {
                this.$element.find("option").each(function(index) {
                    var $lis = that.findLis().eq(that.liObj[index]);
                    that.setDisabled(index, this.disabled || this.parentNode.tagName === "OPTGROUP" && this.parentNode.disabled, $lis);
                    that.setSelected(index, this.selected, $lis);
                });
            }
            this.tabIndex();
            var selectedItems = this.$element.find("option").map(function() {
                if (this.selected) {
                    if (that.options.hideDisabled && (this.disabled || this.parentNode.tagName === "OPTGROUP" && this.parentNode.disabled)) return;
                    var $this = $(this), icon = $this.data("icon") && that.options.showIcon ? '<i class="' + that.options.iconBase + " " + $this.data("icon") + '"></i> ' : "", subtext;
                    if (that.options.showSubtext && $this.data("subtext") && !that.multiple) {
                        subtext = ' <small class="text-muted">' + $this.data("subtext") + "</small>";
                    } else {
                        subtext = "";
                    }
                    if (typeof $this.attr("title") !== "undefined") {
                        return $this.attr("title");
                    } else if ($this.data("content") && that.options.showContent) {
                        return $this.data("content");
                    } else {
                        return icon + $this.html() + subtext;
                    }
                }
            }).toArray();
            //Fixes issue in IE10 occurring when no default option is selected and at least one option is disabled
            //Convert all the values into a comma delimited string
            var title = !this.multiple ? selectedItems[0] : selectedItems.join(this.options.multipleSeparator);
            //If this is multi select, and the selectText type is count, the show 1 of 2 selected etc..
            if (this.multiple && this.options.selectedTextFormat.indexOf("count") > -1) {
                var max = this.options.selectedTextFormat.split(">");
                if (max.length > 1 && selectedItems.length > max[1] || max.length == 1 && selectedItems.length >= 2) {
                    notDisabled = this.options.hideDisabled ? ", [disabled]" : "";
                    var totalCount = this.$element.find("option").not('[data-divider="true"], [data-hidden="true"]' + notDisabled).length, tr8nText = typeof this.options.countSelectedText === "function" ? this.options.countSelectedText(selectedItems.length, totalCount) : this.options.countSelectedText;
                    title = tr8nText.replace("{0}", selectedItems.length.toString()).replace("{1}", totalCount.toString());
                }
            }
            if (this.options.title == undefined) {
                this.options.title = this.$element.attr("title");
            }
            if (this.options.selectedTextFormat == "static") {
                title = this.options.title;
            }
            //If we dont have a title, then use the default, or if nothing is set at all, use the not selected text
            if (!title) {
                title = typeof this.options.title !== "undefined" ? this.options.title : this.options.noneSelectedText;
            }
            //strip all html-tags and trim the result
            this.$button.attr("title", $.trim(title.replace(/<[^>]*>?/g, "")));
            this.$button.children(".filter-option").html(title);
            this.$element.trigger("rendered.bs.select");
        },
        /**
     * @param [style]
     * @param [status]
     */
        setStyle: function(style, status) {
            if (this.$element.attr("class")) {
                this.$newElement.addClass(this.$element.attr("class").replace(/selectpicker|mobile-device|bs-select-hidden|validate\[.*\]/gi, ""));
            }
            var buttonClass = style ? style : this.options.style;
            if (status == "add") {
                this.$button.addClass(buttonClass);
            } else if (status == "remove") {
                this.$button.removeClass(buttonClass);
            } else {
                this.$button.removeClass(this.options.style);
                this.$button.addClass(buttonClass);
            }
        },
        liHeight: function(refresh) {
            if (!refresh && (this.options.size === false || this.sizeInfo)) return;
            var newElement = document.createElement("div"), menu = document.createElement("div"), menuInner = document.createElement("ul"), divider = document.createElement("li"), li = document.createElement("li"), a = document.createElement("a"), text = document.createElement("span"), header = this.options.header && this.$menu.find(".popover-title").length > 0 ? this.$menu.find(".popover-title")[0].cloneNode(true) : null, search = this.options.liveSearch ? document.createElement("div") : null, actions = this.options.actionsBox && this.multiple && this.$menu.find(".bs-actionsbox").length > 0 ? this.$menu.find(".bs-actionsbox")[0].cloneNode(true) : null, doneButton = this.options.doneButton && this.multiple && this.$menu.find(".bs-donebutton").length > 0 ? this.$menu.find(".bs-donebutton")[0].cloneNode(true) : null;
            text.className = "text";
            newElement.className = this.$menu[0].parentNode.className + " open";
            menu.className = "dropdown-menu open";
            menuInner.className = "dropdown-menu inner";
            divider.className = "divider";
            text.appendChild(document.createTextNode("Inner text"));
            a.appendChild(text);
            li.appendChild(a);
            menuInner.appendChild(li);
            menuInner.appendChild(divider);
            if (header) menu.appendChild(header);
            if (search) {
                // create a span instead of input as creating an input element is slower
                var input = document.createElement("span");
                search.className = "bs-searchbox";
                input.className = "form-control";
                search.appendChild(input);
                menu.appendChild(search);
            }
            if (actions) menu.appendChild(actions);
            menu.appendChild(menuInner);
            if (doneButton) menu.appendChild(doneButton);
            newElement.appendChild(menu);
            document.body.appendChild(newElement);
            var liHeight = a.offsetHeight, headerHeight = header ? header.offsetHeight : 0, searchHeight = search ? search.offsetHeight : 0, actionsHeight = actions ? actions.offsetHeight : 0, doneButtonHeight = doneButton ? doneButton.offsetHeight : 0, dividerHeight = $(divider).outerHeight(true), // fall back to jQuery if getComputedStyle is not supported
            menuStyle = typeof getComputedStyle === "function" ? getComputedStyle(menu) : false, $menu = menuStyle ? null : $(menu), menuPadding = parseInt(menuStyle ? menuStyle.paddingTop : $menu.css("paddingTop")) + parseInt(menuStyle ? menuStyle.paddingBottom : $menu.css("paddingBottom")) + parseInt(menuStyle ? menuStyle.borderTopWidth : $menu.css("borderTopWidth")) + parseInt(menuStyle ? menuStyle.borderBottomWidth : $menu.css("borderBottomWidth")), menuExtras = menuPadding + parseInt(menuStyle ? menuStyle.marginTop : $menu.css("marginTop")) + parseInt(menuStyle ? menuStyle.marginBottom : $menu.css("marginBottom")) + 2;
            document.body.removeChild(newElement);
            this.sizeInfo = {
                liHeight: liHeight,
                headerHeight: headerHeight,
                searchHeight: searchHeight,
                actionsHeight: actionsHeight,
                doneButtonHeight: doneButtonHeight,
                dividerHeight: dividerHeight,
                menuPadding: menuPadding,
                menuExtras: menuExtras
            };
        },
        setSize: function() {
            this.findLis();
            this.liHeight();
            if (this.options.header) this.$menu.css("padding-top", 0);
            if (this.options.size === false) return;
            var that = this, $menu = this.$menu, $menuInner = this.$menuInner, $window = $(window), selectHeight = this.$newElement[0].offsetHeight, liHeight = this.sizeInfo["liHeight"], headerHeight = this.sizeInfo["headerHeight"], searchHeight = this.sizeInfo["searchHeight"], actionsHeight = this.sizeInfo["actionsHeight"], doneButtonHeight = this.sizeInfo["doneButtonHeight"], divHeight = this.sizeInfo["dividerHeight"], menuPadding = this.sizeInfo["menuPadding"], menuExtras = this.sizeInfo["menuExtras"], notDisabled = this.options.hideDisabled ? ".disabled" : "", menuHeight, getHeight, selectOffsetTop, selectOffsetBot, posVert = function() {
                selectOffsetTop = that.$newElement.offset().top - $window.scrollTop();
                selectOffsetBot = $window.height() - selectOffsetTop - selectHeight;
            };
            posVert();
            if (this.options.size === "auto") {
                var getSize = function() {
                    var minHeight, hasClass = function(className, include) {
                        return function(element) {
                            if (include) {
                                return element.classList ? element.classList.contains(className) : $(element).hasClass(className);
                            } else {
                                return !(element.classList ? element.classList.contains(className) : $(element).hasClass(className));
                            }
                        };
                    }, lis = that.$menuInner[0].getElementsByTagName("li"), lisVisible = Array.prototype.filter ? Array.prototype.filter.call(lis, hasClass("hidden", false)) : that.$lis.not(".hidden"), optGroup = Array.prototype.filter ? Array.prototype.filter.call(lisVisible, hasClass("dropdown-header", true)) : lisVisible.filter(".dropdown-header");
                    posVert();
                    menuHeight = selectOffsetBot - menuExtras;
                    if (that.options.container) {
                        if (!$menu.data("height")) $menu.data("height", $menu.height());
                        getHeight = $menu.data("height");
                    } else {
                        getHeight = $menu.height();
                    }
                    if (that.options.dropupAuto) {
                        that.$newElement.toggleClass("dropup", selectOffsetTop > selectOffsetBot && menuHeight - menuExtras < getHeight);
                    }
                    if (that.$newElement.hasClass("dropup")) {
                        menuHeight = selectOffsetTop - menuExtras;
                    }
                    if (lisVisible.length + optGroup.length > 3) {
                        minHeight = liHeight * 3 + menuExtras - 2;
                    } else {
                        minHeight = 0;
                    }
                    $menu.css({
                        "max-height": menuHeight + "px",
                        overflow: "hidden",
                        "min-height": minHeight + headerHeight + searchHeight + actionsHeight + doneButtonHeight + "px"
                    });
                    $menuInner.css({
                        "max-height": menuHeight - headerHeight - searchHeight - actionsHeight - doneButtonHeight - menuPadding + "px",
                        "overflow-y": "auto",
                        "min-height": Math.max(minHeight - menuPadding, 0) + "px"
                    });
                };
                getSize();
                this.$searchbox.off("input.getSize propertychange.getSize").on("input.getSize propertychange.getSize", getSize);
                $window.off("resize.getSize scroll.getSize").on("resize.getSize scroll.getSize", getSize);
            } else if (this.options.size && this.options.size != "auto" && this.$lis.not(notDisabled).length > this.options.size) {
                var optIndex = this.$lis.not(".divider").not(notDisabled).children().slice(0, this.options.size).last().parent().index(), divLength = this.$lis.slice(0, optIndex + 1).filter(".divider").length;
                menuHeight = liHeight * this.options.size + divLength * divHeight + menuPadding;
                if (that.options.container) {
                    if (!$menu.data("height")) $menu.data("height", $menu.height());
                    getHeight = $menu.data("height");
                } else {
                    getHeight = $menu.height();
                }
                if (that.options.dropupAuto) {
                    //noinspection JSUnusedAssignment
                    this.$newElement.toggleClass("dropup", selectOffsetTop > selectOffsetBot && menuHeight - menuExtras < getHeight);
                }
                $menu.css({
                    "max-height": menuHeight + headerHeight + searchHeight + actionsHeight + doneButtonHeight + "px",
                    overflow: "hidden",
                    "min-height": ""
                });
                $menuInner.css({
                    "max-height": menuHeight - menuPadding + "px",
                    "overflow-y": "auto",
                    "min-height": ""
                });
            }
        },
        setWidth: function() {
            if (this.options.width === "auto") {
                this.$menu.css("min-width", "0");
                // Get correct width if element is hidden
                var $selectClone = this.$menu.parent().clone().appendTo("body"), $selectClone2 = this.options.container ? this.$newElement.clone().appendTo("body") : $selectClone, ulWidth = $selectClone.children(".dropdown-menu").outerWidth(), btnWidth = $selectClone2.css("width", "auto").children("button").outerWidth();
                $selectClone.remove();
                $selectClone2.remove();
                // Set width to whatever's larger, button title or longest option
                this.$newElement.css("width", Math.max(ulWidth, btnWidth) + "px");
            } else if (this.options.width === "fit") {
                // Remove inline min-width so width can be changed from 'auto'
                this.$menu.css("min-width", "");
                this.$newElement.css("width", "").addClass("fit-width");
            } else if (this.options.width) {
                // Remove inline min-width so width can be changed from 'auto'
                this.$menu.css("min-width", "");
                this.$newElement.css("width", this.options.width);
            } else {
                // Remove inline min-width/width so width can be changed
                this.$menu.css("min-width", "");
                this.$newElement.css("width", "");
            }
            // Remove fit-width class if width is changed programmatically
            if (this.$newElement.hasClass("fit-width") && this.options.width !== "fit") {
                this.$newElement.removeClass("fit-width");
            }
        },
        selectPosition: function() {
            this.$bsContainer = $('<div class="bs-container" />');
            var that = this, pos, actualHeight, getPlacement = function($element) {
                that.$bsContainer.addClass($element.attr("class").replace(/form-control|fit-width/gi, "")).toggleClass("dropup", $element.hasClass("dropup"));
                pos = $element.offset();
                actualHeight = $element.hasClass("dropup") ? 0 : $element[0].offsetHeight;
                that.$bsContainer.css({
                    top: pos.top + actualHeight,
                    left: pos.left,
                    width: $element[0].offsetWidth
                });
            };
            this.$button.on("click", function() {
                var $this = $(this);
                if (that.isDisabled()) {
                    return;
                }
                getPlacement(that.$newElement);
                that.$bsContainer.appendTo(that.options.container).toggleClass("open", !$this.hasClass("open")).append(that.$menu);
            });
            $(window).on("resize scroll", function() {
                getPlacement(that.$newElement);
            });
            this.$element.on("hide.bs.select", function() {
                that.$menu.data("height", that.$menu.height());
                that.$bsContainer.detach();
            });
        },
        setSelected: function(index, selected, $lis) {
            if (!$lis) {
                $lis = this.findLis().eq(this.liObj[index]);
            }
            $lis.toggleClass("selected", selected);
        },
        setDisabled: function(index, disabled, $lis) {
            if (!$lis) {
                $lis = this.findLis().eq(this.liObj[index]);
            }
            if (disabled) {
                $lis.addClass("disabled").children("a").attr("href", "#").attr("tabindex", -1);
            } else {
                $lis.removeClass("disabled").children("a").removeAttr("href").attr("tabindex", 0);
            }
        },
        isDisabled: function() {
            return this.$element[0].disabled;
        },
        checkDisabled: function() {
            var that = this;
            if (this.isDisabled()) {
                this.$newElement.addClass("disabled");
                this.$button.addClass("disabled").attr("tabindex", -1);
            } else {
                if (this.$button.hasClass("disabled")) {
                    this.$newElement.removeClass("disabled");
                    this.$button.removeClass("disabled");
                }
                if (this.$button.attr("tabindex") == -1 && !this.$element.data("tabindex")) {
                    this.$button.removeAttr("tabindex");
                }
            }
            this.$button.click(function() {
                return !that.isDisabled();
            });
        },
        tabIndex: function() {
            if (this.$element.data("tabindex") !== this.$element.attr("tabindex") && this.$element.attr("tabindex") !== -98 && this.$element.attr("tabindex") !== "-98") {
                this.$element.data("tabindex", this.$element.attr("tabindex"));
                this.$button.attr("tabindex", this.$element.data("tabindex"));
            }
            this.$element.attr("tabindex", -98);
        },
        clickListener: function() {
            var that = this, $document = $(document);
            this.$newElement.on("touchstart.dropdown", ".dropdown-menu", function(e) {
                e.stopPropagation();
            });
            $document.data("spaceSelect", false);
            this.$button.on("keyup", function(e) {
                if (/(32)/.test(e.keyCode.toString(10)) && $document.data("spaceSelect")) {
                    e.preventDefault();
                    $document.data("spaceSelect", false);
                }
            });
            this.$button.on("click", function() {
                that.setSize();
                that.$element.on("shown.bs.select", function() {
                    if (!that.options.liveSearch && !that.multiple) {
                        that.$menuInner.find(".selected a").focus();
                    } else if (!that.multiple) {
                        var selectedIndex = that.liObj[that.$element[0].selectedIndex];
                        if (typeof selectedIndex !== "number" || that.options.size === false) return;
                        // scroll to selected option
                        var offset = that.$lis.eq(selectedIndex)[0].offsetTop - that.$menuInner[0].offsetTop;
                        offset = offset - that.$menuInner[0].offsetHeight / 2 + that.sizeInfo.liHeight / 2;
                        that.$menuInner[0].scrollTop = offset;
                    }
                });
            });
            this.$menuInner.on("click", "li a", function(e) {
                var $this = $(this), clickedIndex = $this.parent().data("originalIndex"), prevValue = that.$element.val(), prevIndex = that.$element.prop("selectedIndex");
                // Don't close on multi choice menu
                if (that.multiple) {
                    e.stopPropagation();
                }
                e.preventDefault();
                //Don't run if we have been disabled
                if (!that.isDisabled() && !$this.parent().hasClass("disabled")) {
                    var $options = that.$element.find("option"), $option = $options.eq(clickedIndex), state = $option.prop("selected"), $optgroup = $option.parent("optgroup"), maxOptions = that.options.maxOptions, maxOptionsGrp = $optgroup.data("maxOptions") || false;
                    if (!that.multiple) {
                        // Deselect all others if not multi select box
                        $options.prop("selected", false);
                        $option.prop("selected", true);
                        that.$menuInner.find(".selected").removeClass("selected");
                        that.setSelected(clickedIndex, true);
                    } else {
                        // Toggle the one we have chosen if we are multi select.
                        $option.prop("selected", !state);
                        that.setSelected(clickedIndex, !state);
                        $this.blur();
                        if (maxOptions !== false || maxOptionsGrp !== false) {
                            var maxReached = maxOptions < $options.filter(":selected").length, maxReachedGrp = maxOptionsGrp < $optgroup.find("option:selected").length;
                            if (maxOptions && maxReached || maxOptionsGrp && maxReachedGrp) {
                                if (maxOptions && maxOptions == 1) {
                                    $options.prop("selected", false);
                                    $option.prop("selected", true);
                                    that.$menuInner.find(".selected").removeClass("selected");
                                    that.setSelected(clickedIndex, true);
                                } else if (maxOptionsGrp && maxOptionsGrp == 1) {
                                    $optgroup.find("option:selected").prop("selected", false);
                                    $option.prop("selected", true);
                                    var optgroupID = $this.parent().data("optgroup");
                                    that.$menuInner.find('[data-optgroup="' + optgroupID + '"]').removeClass("selected");
                                    that.setSelected(clickedIndex, true);
                                } else {
                                    var maxOptionsArr = typeof that.options.maxOptionsText === "function" ? that.options.maxOptionsText(maxOptions, maxOptionsGrp) : that.options.maxOptionsText, maxTxt = maxOptionsArr[0].replace("{n}", maxOptions), maxTxtGrp = maxOptionsArr[1].replace("{n}", maxOptionsGrp), $notify = $('<div class="notify"></div>');
                                    // If {var} is set in array, replace it
                                    /** @deprecated */
                                    if (maxOptionsArr[2]) {
                                        maxTxt = maxTxt.replace("{var}", maxOptionsArr[2][maxOptions > 1 ? 0 : 1]);
                                        maxTxtGrp = maxTxtGrp.replace("{var}", maxOptionsArr[2][maxOptionsGrp > 1 ? 0 : 1]);
                                    }
                                    $option.prop("selected", false);
                                    that.$menu.append($notify);
                                    if (maxOptions && maxReached) {
                                        $notify.append($("<div>" + maxTxt + "</div>"));
                                        that.$element.trigger("maxReached.bs.select");
                                    }
                                    if (maxOptionsGrp && maxReachedGrp) {
                                        $notify.append($("<div>" + maxTxtGrp + "</div>"));
                                        that.$element.trigger("maxReachedGrp.bs.select");
                                    }
                                    setTimeout(function() {
                                        that.setSelected(clickedIndex, false);
                                    }, 10);
                                    $notify.delay(750).fadeOut(300, function() {
                                        $(this).remove();
                                    });
                                }
                            }
                        }
                    }
                    if (!that.multiple) {
                        that.$button.focus();
                    } else if (that.options.liveSearch) {
                        that.$searchbox.focus();
                    }
                    // Trigger select 'change'
                    if (prevValue != that.$element.val() && that.multiple || prevIndex != that.$element.prop("selectedIndex") && !that.multiple) {
                        that.$element.triggerNative("change");
                        // $option.prop('selected') is current option state (selected/unselected). state is previous option state.
                        that.$element.trigger("changed.bs.select", [ clickedIndex, $option.prop("selected"), state ]);
                    }
                }
            });
            this.$menu.on("click", "li.disabled a, .popover-title, .popover-title :not(.close)", function(e) {
                if (e.currentTarget == this) {
                    e.preventDefault();
                    e.stopPropagation();
                    if (that.options.liveSearch && !$(e.target).hasClass("close")) {
                        that.$searchbox.focus();
                    } else {
                        that.$button.focus();
                    }
                }
            });
            this.$menuInner.on("click", ".divider, .dropdown-header", function(e) {
                e.preventDefault();
                e.stopPropagation();
                if (that.options.liveSearch) {
                    that.$searchbox.focus();
                } else {
                    that.$button.focus();
                }
            });
            this.$menu.on("click", ".popover-title .close", function() {
                that.$button.click();
            });
            this.$searchbox.on("click", function(e) {
                e.stopPropagation();
            });
            this.$menu.on("click", ".actions-btn", function(e) {
                if (that.options.liveSearch) {
                    that.$searchbox.focus();
                } else {
                    that.$button.focus();
                }
                e.preventDefault();
                e.stopPropagation();
                if ($(this).hasClass("bs-select-all")) {
                    that.selectAll();
                } else {
                    that.deselectAll();
                }
                that.$element.triggerNative("change");
            });
            this.$element.change(function() {
                that.render(false);
            });
        },
        liveSearchListener: function() {
            var that = this, $no_results = $('<li class="no-results"></li>');
            this.$button.on("click.dropdown.data-api touchstart.dropdown.data-api", function() {
                that.$menuInner.find(".active").removeClass("active");
                if (!!that.$searchbox.val()) {
                    that.$searchbox.val("");
                    that.$lis.not(".is-hidden").removeClass("hidden");
                    if (!!$no_results.parent().length) $no_results.remove();
                }
                if (!that.multiple) that.$menuInner.find(".selected").addClass("active");
                setTimeout(function() {
                    that.$searchbox.focus();
                }, 10);
            });
            this.$searchbox.on("click.dropdown.data-api focus.dropdown.data-api touchend.dropdown.data-api", function(e) {
                e.stopPropagation();
            });
            this.$searchbox.on("input propertychange", function() {
                if (that.$searchbox.val()) {
                    var $searchBase = that.$lis.not(".is-hidden").removeClass("hidden").children("a");
                    if (that.options.liveSearchNormalize) {
                        $searchBase = $searchBase.not(":a" + that._searchStyle() + '("' + normalizeToBase(that.$searchbox.val()) + '")');
                    } else {
                        $searchBase = $searchBase.not(":" + that._searchStyle() + '("' + that.$searchbox.val() + '")');
                    }
                    $searchBase.parent().addClass("hidden");
                    that.$lis.filter(".dropdown-header").each(function() {
                        var $this = $(this), optgroup = $this.data("optgroup");
                        if (that.$lis.filter("[data-optgroup=" + optgroup + "]").not($this).not(".hidden").length === 0) {
                            $this.addClass("hidden");
                            that.$lis.filter("[data-optgroup=" + optgroup + "div]").addClass("hidden");
                        }
                    });
                    var $lisVisible = that.$lis.not(".hidden");
                    // hide divider if first or last visible, or if followed by another divider
                    $lisVisible.each(function(index) {
                        var $this = $(this);
                        if ($this.hasClass("divider") && ($this.index() === $lisVisible.first().index() || $this.index() === $lisVisible.last().index() || $lisVisible.eq(index + 1).hasClass("divider"))) {
                            $this.addClass("hidden");
                        }
                    });
                    if (!that.$lis.not(".hidden, .no-results").length) {
                        if (!!$no_results.parent().length) {
                            $no_results.remove();
                        }
                        $no_results.html(that.options.noneResultsText.replace("{0}", '"' + htmlEscape(that.$searchbox.val()) + '"')).show();
                        that.$menuInner.append($no_results);
                    } else if (!!$no_results.parent().length) {
                        $no_results.remove();
                    }
                } else {
                    that.$lis.not(".is-hidden").removeClass("hidden");
                    if (!!$no_results.parent().length) {
                        $no_results.remove();
                    }
                }
                that.$lis.filter(".active").removeClass("active");
                if (that.$searchbox.val()) that.$lis.not(".hidden, .divider, .dropdown-header").eq(0).addClass("active").children("a").focus();
                $(this).focus();
            });
        },
        _searchStyle: function() {
            var styles = {
                begins: "ibegins",
                startsWith: "ibegins"
            };
            return styles[this.options.liveSearchStyle] || "icontains";
        },
        val: function(value) {
            if (typeof value !== "undefined") {
                this.$element.val(value);
                this.render();
                return this.$element;
            } else {
                return this.$element.val();
            }
        },
        changeAll: function(status) {
            if (typeof status === "undefined") status = true;
            this.findLis();
            var $options = this.$element.find("option"), $lisVisible = this.$lis.not(".divider, .dropdown-header, .disabled, .hidden").toggleClass("selected", status), lisVisLen = $lisVisible.length, selectedOptions = [];
            for (var i = 0; i < lisVisLen; i++) {
                var origIndex = $lisVisible[i].getAttribute("data-original-index");
                selectedOptions[selectedOptions.length] = $options.eq(origIndex)[0];
            }
            $(selectedOptions).prop("selected", status);
            this.render(false);
        },
        selectAll: function() {
            return this.changeAll(true);
        },
        deselectAll: function() {
            return this.changeAll(false);
        },
        keydown: function(e) {
            var $this = $(this), $parent = $this.is("input") ? $this.parent().parent() : $this.parent(), $items, that = $parent.data("this"), index, next, first, last, prev, nextPrev, prevIndex, isActive, selector = ":not(.disabled, .hidden, .dropdown-header, .divider)", keyCodeMap = {
                32: " ",
                48: "0",
                49: "1",
                50: "2",
                51: "3",
                52: "4",
                53: "5",
                54: "6",
                55: "7",
                56: "8",
                57: "9",
                59: ";",
                65: "a",
                66: "b",
                67: "c",
                68: "d",
                69: "e",
                70: "f",
                71: "g",
                72: "h",
                73: "i",
                74: "j",
                75: "k",
                76: "l",
                77: "m",
                78: "n",
                79: "o",
                80: "p",
                81: "q",
                82: "r",
                83: "s",
                84: "t",
                85: "u",
                86: "v",
                87: "w",
                88: "x",
                89: "y",
                90: "z",
                96: "0",
                97: "1",
                98: "2",
                99: "3",
                100: "4",
                101: "5",
                102: "6",
                103: "7",
                104: "8",
                105: "9"
            };
            if (that.options.liveSearch) $parent = $this.parent().parent();
            if (that.options.container) $parent = that.$menu;
            $items = $("[role=menu] li", $parent);
            isActive = that.$newElement.hasClass("open");
            if (!isActive && (e.keyCode >= 48 && e.keyCode <= 57 || e.keyCode >= 96 && e.keyCode <= 105 || e.keyCode >= 65 && e.keyCode <= 90)) {
                if (!that.options.container) {
                    that.setSize();
                    that.$menu.parent().addClass("open");
                    isActive = true;
                } else {
                    that.$button.trigger("click");
                }
                that.$searchbox.focus();
            }
            if (that.options.liveSearch) {
                if (/(^9$|27)/.test(e.keyCode.toString(10)) && isActive && that.$menu.find(".active").length === 0) {
                    e.preventDefault();
                    that.$menu.parent().removeClass("open");
                    if (that.options.container) that.$newElement.removeClass("open");
                    that.$button.focus();
                }
                // $items contains li elements when liveSearch is enabled
                $items = $("[role=menu] li" + selector, $parent);
                if (!$this.val() && !/(38|40)/.test(e.keyCode.toString(10))) {
                    if ($items.filter(".active").length === 0) {
                        $items = that.$menuInner.find("li");
                        if (that.options.liveSearchNormalize) {
                            $items = $items.filter(":a" + that._searchStyle() + "(" + normalizeToBase(keyCodeMap[e.keyCode]) + ")");
                        } else {
                            $items = $items.filter(":" + that._searchStyle() + "(" + keyCodeMap[e.keyCode] + ")");
                        }
                    }
                }
            }
            if (!$items.length) return;
            if (/(38|40)/.test(e.keyCode.toString(10))) {
                index = $items.index($items.find("a").filter(":focus").parent());
                first = $items.filter(selector).first().index();
                last = $items.filter(selector).last().index();
                next = $items.eq(index).nextAll(selector).eq(0).index();
                prev = $items.eq(index).prevAll(selector).eq(0).index();
                nextPrev = $items.eq(next).prevAll(selector).eq(0).index();
                if (that.options.liveSearch) {
                    $items.each(function(i) {
                        if (!$(this).hasClass("disabled")) {
                            $(this).data("index", i);
                        }
                    });
                    index = $items.index($items.filter(".active"));
                    first = $items.first().data("index");
                    last = $items.last().data("index");
                    next = $items.eq(index).nextAll().eq(0).data("index");
                    prev = $items.eq(index).prevAll().eq(0).data("index");
                    nextPrev = $items.eq(next).prevAll().eq(0).data("index");
                }
                prevIndex = $this.data("prevIndex");
                if (e.keyCode == 38) {
                    if (that.options.liveSearch) index--;
                    if (index != nextPrev && index > prev) index = prev;
                    if (index < first) index = first;
                    if (index == prevIndex) index = last;
                } else if (e.keyCode == 40) {
                    if (that.options.liveSearch) index++;
                    if (index == -1) index = 0;
                    if (index != nextPrev && index < next) index = next;
                    if (index > last) index = last;
                    if (index == prevIndex) index = first;
                }
                $this.data("prevIndex", index);
                if (!that.options.liveSearch) {
                    $items.eq(index).children("a").focus();
                } else {
                    e.preventDefault();
                    if (!$this.hasClass("dropdown-toggle")) {
                        $items.removeClass("active").eq(index).addClass("active").children("a").focus();
                        $this.focus();
                    }
                }
            } else if (!$this.is("input")) {
                var keyIndex = [], count, prevKey;
                $items.each(function() {
                    if (!$(this).hasClass("disabled")) {
                        if ($.trim($(this).children("a").text().toLowerCase()).substring(0, 1) == keyCodeMap[e.keyCode]) {
                            keyIndex.push($(this).index());
                        }
                    }
                });
                count = $(document).data("keycount");
                count++;
                $(document).data("keycount", count);
                prevKey = $.trim($(":focus").text().toLowerCase()).substring(0, 1);
                if (prevKey != keyCodeMap[e.keyCode]) {
                    count = 1;
                    $(document).data("keycount", count);
                } else if (count >= keyIndex.length) {
                    $(document).data("keycount", 0);
                    if (count > keyIndex.length) count = 1;
                }
                $items.eq(keyIndex[count - 1]).children("a").focus();
            }
            // Select focused option if "Enter", "Spacebar" or "Tab" (when selectOnTab is true) are pressed inside the menu.
            if ((/(13|32)/.test(e.keyCode.toString(10)) || /(^9$)/.test(e.keyCode.toString(10)) && that.options.selectOnTab) && isActive) {
                if (!/(32)/.test(e.keyCode.toString(10))) e.preventDefault();
                if (!that.options.liveSearch) {
                    var elem = $(":focus");
                    elem.click();
                    // Bring back focus for multiselects
                    elem.focus();
                    // Prevent screen from scrolling if the user hit the spacebar
                    e.preventDefault();
                    // Fixes spacebar selection of dropdown items in FF & IE
                    $(document).data("spaceSelect", true);
                } else if (!/(32)/.test(e.keyCode.toString(10))) {
                    that.$menuInner.find(".active a").click();
                    $this.focus();
                }
                $(document).data("keycount", 0);
            }
            if (/(^9$|27)/.test(e.keyCode.toString(10)) && isActive && (that.multiple || that.options.liveSearch) || /(27)/.test(e.keyCode.toString(10)) && !isActive) {
                that.$menu.parent().removeClass("open");
                if (that.options.container) that.$newElement.removeClass("open");
                that.$button.focus();
            }
        },
        mobile: function() {
            this.$element.addClass("mobile-device");
        },
        refresh: function() {
            this.$lis = null;
            this.liObj = {};
            this.reloadLi();
            this.render();
            this.checkDisabled();
            this.liHeight(true);
            this.setStyle();
            this.setWidth();
            if (this.$lis) this.$searchbox.trigger("propertychange");
            this.$element.trigger("refreshed.bs.select");
        },
        hide: function() {
            this.$newElement.hide();
        },
        show: function() {
            this.$newElement.show();
        },
        remove: function() {
            this.$newElement.remove();
            this.$element.remove();
        },
        destroy: function() {
            this.$newElement.remove();
            if (this.$bsContainer) {
                this.$bsContainer.remove();
            } else {
                this.$menu.remove();
            }
            this.$element.off(".bs.select").removeData("selectpicker").removeClass("bs-select-hidden selectpicker");
        }
    };
    // SELECTPICKER PLUGIN DEFINITION
    // ==============================
    function Plugin(option, event) {
        // get the args of the outer function..
        var args = arguments;
        // The arguments of the function are explicitly re-defined from the argument list, because the shift causes them
        // to get lost/corrupted in android 2.3 and IE9 #715 #775
        var _option = option, _event = event;
        [].shift.apply(args);
        var value;
        var chain = this.each(function() {
            var $this = $(this);
            if ($this.is("select")) {
                var data = $this.data("selectpicker"), options = typeof _option == "object" && _option;
                if (!data) {
                    var config = $.extend({}, Selectpicker.DEFAULTS, $.fn.selectpicker.defaults || {}, $this.data(), options);
                    config.template = $.extend({}, Selectpicker.DEFAULTS.template, $.fn.selectpicker.defaults ? $.fn.selectpicker.defaults.template : {}, $this.data().template, options.template);
                    $this.data("selectpicker", data = new Selectpicker(this, config, _event));
                } else if (options) {
                    for (var i in options) {
                        if (options.hasOwnProperty(i)) {
                            data.options[i] = options[i];
                        }
                    }
                }
                if (typeof _option == "string") {
                    if (data[_option] instanceof Function) {
                        value = data[_option].apply(data, args);
                    } else {
                        value = data.options[_option];
                    }
                }
            }
        });
        if (typeof value !== "undefined") {
            //noinspection JSUnusedAssignment
            return value;
        } else {
            return chain;
        }
    }
    var old = $.fn.selectpicker;
    $.fn.selectpicker = Plugin;
    $.fn.selectpicker.Constructor = Selectpicker;
    // SELECTPICKER NO CONFLICT
    // ========================
    $.fn.selectpicker.noConflict = function() {
        $.fn.selectpicker = old;
        return this;
    };
    $(document).data("keycount", 0).on("keydown.bs.select", '.bootstrap-select [data-toggle=dropdown], .bootstrap-select [role="menu"], .bs-searchbox input', Selectpicker.prototype.keydown).on("focusin.modal", '.bootstrap-select [data-toggle=dropdown], .bootstrap-select [role="menu"], .bs-searchbox input', function(e) {
        e.stopPropagation();
    });
    // SELECTPICKER DATA-API
    // =====================
    $(window).on("load.bs.select.data-api", function() {
        $(".selectpicker").each(function() {
            var $selectpicker = $(this);
            Plugin.call($selectpicker, $selectpicker.data());
        });
    });
});

define("dist/js/1.0.0/depends/bootstrap/validator-debug", [ "$-debug" ], function(require, exports, module) {
    var $ = jQuery = require("$-debug");
    /* ========================================================================
 * Bootstrap (plugin): validator.js v0.9.0
 * ========================================================================
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Cina Saffar
 * Made by @1000hz in the style of Bootstrap 3 era @fat
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * ======================================================================== */
    +function($) {
        "use strict";
        // VALIDATOR CLASS DEFINITION
        // ==========================
        var Validator = function(element, options) {
            this.$element = $(element);
            this.options = options;
            options.errors = $.extend({}, Validator.DEFAULTS.errors, options.errors);
            for (var custom in options.custom) {
                if (!options.errors[custom]) throw new Error("Missing default error message for custom validator: " + custom);
            }
            $.extend(Validator.VALIDATORS, options.custom);
            this.$element.attr("novalidate", true);
            // disable automatic native validation
            this.toggleSubmit();
            this.$element.on("input.bs.validator change.bs.validator focusout.bs.validator", $.proxy(this.validateInput, this));
            this.$element.on("submit.bs.validator", $.proxy(this.onSubmit, this));
            this.$element.find("[data-match]").each(function() {
                var $this = $(this);
                var target = $this.data("match");
                $(target).on("input.bs.validator", function(e) {
                    $this.val() && $this.trigger("input.bs.validator");
                });
            });
        };
        Validator.INPUT_SELECTOR = ':input:not([type="submit"], button):enabled:visible';
        Validator.DEFAULTS = {
            delay: 500,
            html: false,
            disable: true,
            custom: {},
            errors: {
                match: "Does not match",
                minlength: "Not long enough"
            },
            feedback: {
                success: "glyphicon-ok",
                error: "glyphicon-remove"
            }
        };
        Validator.VALIDATORS = {
            "native": function($el) {
                var el = $el[0];
                return el.checkValidity ? el.checkValidity() : true;
            },
            match: function($el) {
                var target = $el.data("match");
                return !$el.val() || $el.val() === $(target).val();
            },
            minlength: function($el) {
                var minlength = $el.data("minlength");
                return !$el.val() || $el.val().length >= minlength;
            }
        };
        Validator.prototype.validateInput = function(e) {
            var $el = $(e.target);
            var prevErrors = $el.data("bs.validator.errors");
            var errors;
            if ($el.is('[type="radio"]')) $el = this.$element.find('input[name="' + $el.attr("name") + '"]');
            this.$element.trigger(e = $.Event("validate.bs.validator", {
                relatedTarget: $el[0]
            }));
            if (e.isDefaultPrevented()) return;
            var self = this;
            this.runValidators($el).done(function(errors) {
                $el.data("bs.validator.errors", errors);
                errors.length ? self.showErrors($el) : self.clearErrors($el);
                if (!prevErrors || errors.toString() !== prevErrors.toString()) {
                    e = errors.length ? $.Event("invalid.bs.validator", {
                        relatedTarget: $el[0],
                        detail: errors
                    }) : $.Event("valid.bs.validator", {
                        relatedTarget: $el[0],
                        detail: prevErrors
                    });
                    self.$element.trigger(e);
                }
                self.toggleSubmit();
                self.$element.trigger($.Event("validated.bs.validator", {
                    relatedTarget: $el[0]
                }));
            });
        };
        Validator.prototype.runValidators = function($el) {
            var errors = [];
            var deferred = $.Deferred();
            var options = this.options;
            $el.data("bs.validator.deferred") && $el.data("bs.validator.deferred").reject();
            $el.data("bs.validator.deferred", deferred);
            // add for multi validator
            function getNativeKey(el) {
                var key = "";
                if (el.validity.patternMismatch) key = "pattern-";
                if (el.validity.tooShort) key = "minlength-";
                if (el.validity.tooLong) key = "maxlength-";
                return key;
            }
            // add for multi validator
            function getErrorMessage(key) {
                return $el.data(key + "-error") || $el.data(getNativeKey($el[0]) + "error") || key == "native" && $el[0].validationMessage || options.errors[key];
            }
            $.each(Validator.VALIDATORS, $.proxy(function(key, validator) {
                if (($el.data(key) || key == "native") && !validator.call(this, $el)) {
                    var error = getErrorMessage(key);
                    !~errors.indexOf(error) && errors.push(error);
                }
            }, this));
            if (!errors.length && $el.val() && $el.data("remote")) {
                this.defer($el, function() {
                    var data = {};
                    data[$el.attr("name")] = $el.val();
                    $.get($el.data("remote"), data).fail(function(jqXHR, textStatus, error) {
                        errors.push($el.attr("remote-error") || getErrorMessage("remote") || error);
                    }).always(function() {
                        deferred.resolve(errors);
                    });
                });
            } else deferred.resolve(errors);
            return deferred.promise();
        };
        Validator.prototype.validate = function() {
            var delay = this.options.delay;
            this.options.delay = 0;
            this.$element.find(Validator.INPUT_SELECTOR).trigger("input.bs.validator");
            this.options.delay = delay;
            return this;
        };
        Validator.prototype.showErrors = function($el) {
            var method = this.options.html ? "html" : "text";
            this.defer($el, function() {
                var $group = $el.closest(".form-group");
                var $block = $group.find(".help-block.with-errors");
                var $feedback = $group.find(".form-control-feedback");
                var errors = $el.data("bs.validator.errors");
                if (!errors.length) return;
                errors = $("<ul/>").addClass("list-unstyled").append($.map(errors, function(error) {
                    return $("<li/>")[method](error);
                }));
                $block.data("bs.validator.originalContent") === undefined && $block.data("bs.validator.originalContent", $block.html());
                $block.empty().append(errors);
                $group.addClass("has-error");
                $feedback.length && $feedback.removeClass(this.options.feedback.success) && $feedback.addClass(this.options.feedback.error) && $group.removeClass("has-success");
            });
        };
        Validator.prototype.clearErrors = function($el) {
            var $group = $el.closest(".form-group");
            var $block = $group.find(".help-block.with-errors");
            var $feedback = $group.find(".form-control-feedback");
            $block.html($block.data("bs.validator.originalContent"));
            $group.removeClass("has-error");
            $feedback.length && $feedback.removeClass(this.options.feedback.error) && $feedback.addClass(this.options.feedback.success) && $group.addClass("has-success");
        };
        Validator.prototype.hasErrors = function() {
            function fieldErrors() {
                return !!($(this).data("bs.validator.errors") || []).length;
            }
            return !!this.$element.find(Validator.INPUT_SELECTOR).filter(fieldErrors).length;
        };
        Validator.prototype.isIncomplete = function() {
            function fieldIncomplete() {
                return this.type === "checkbox" ? !this.checked : this.type === "radio" ? !$('[name="' + this.name + '"]:checked').length : $.trim(this.value) === "";
            }
            return !!this.$element.find(Validator.INPUT_SELECTOR).filter("[required]").filter(fieldIncomplete).length;
        };
        Validator.prototype.onSubmit = function(e) {
            this.validate();
            if (this.isIncomplete() || this.hasErrors()) e.preventDefault();
        };
        Validator.prototype.toggleSubmit = function() {
            if (!this.options.disable) return;
            var $btn = $('button[type="submit"], input[type="submit"]').filter('[form="' + this.$element.attr("id") + '"]').add(this.$element.find('input[type="submit"], button[type="submit"]'));
            $btn.toggleClass("disabled", this.isIncomplete() || this.hasErrors());
        };
        Validator.prototype.defer = function($el, callback) {
            callback = $.proxy(callback, this);
            if (!this.options.delay) return callback();
            window.clearTimeout($el.data("bs.validator.timeout"));
            $el.data("bs.validator.timeout", window.setTimeout(callback, this.options.delay));
        };
        Validator.prototype.destroy = function() {
            this.$element.removeAttr("novalidate").removeData("bs.validator").off(".bs.validator");
            this.$element.find(Validator.INPUT_SELECTOR).off(".bs.validator").removeData([ "bs.validator.errors", "bs.validator.deferred" ]).each(function() {
                var $this = $(this);
                var timeout = $this.data("bs.validator.timeout");
                window.clearTimeout(timeout) && $this.removeData("bs.validator.timeout");
            });
            this.$element.find(".help-block.with-errors").each(function() {
                var $this = $(this);
                var originalContent = $this.data("bs.validator.originalContent");
                $this.removeData("bs.validator.originalContent").html(originalContent);
            });
            this.$element.find('input[type="submit"], button[type="submit"]').removeClass("disabled");
            this.$element.find(".has-error").removeClass("has-error");
            return this;
        };
        // VALIDATOR PLUGIN DEFINITION
        // ===========================
        function Plugin(option) {
            return this.each(function() {
                var $this = $(this);
                var options = $.extend({}, Validator.DEFAULTS, $this.data(), typeof option == "object" && option);
                var data = $this.data("bs.validator");
                if (!data && option == "destroy") return;
                if (!data) $this.data("bs.validator", data = new Validator(this, options));
                if (typeof option == "string") data[option]();
            });
        }
        var old = $.fn.validator;
        $.fn.validator = Plugin;
        $.fn.validator.Constructor = Validator;
        // VALIDATOR NO CONFLICT
        // =====================
        $.fn.validator.noConflict = function() {
            $.fn.validator = old;
            return this;
        };
        // VALIDATOR DATA-API
        // ==================
        $(window).on("load", function() {
            $('form[data-toggle="validator"]').each(function() {
                var $form = $(this);
                Plugin.call($form, $form.data());
            });
        });
    }(jQuery);
});

define("dist/js/1.0.0/zmall/consAndFunc-debug", [ "$-debug" ], function(require, exports, module) {
    var $ = jQuery = require("$-debug");
    module.exports = {
        //general constant
        navOffset: 80,
        //top nav bar's height
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
                    }, 500);
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
                var ele = $(this), target = $(".detail-gallary-override");
                var arg = ele.attr("gallary-override"), //override the gallary photo or not
                src_400 = ele.children("img").attr("src");
                ele.on("click", function() {
                    if (arg == "true") {
                        target.children("img").attr("src", src_400.replace("40x40", "400x400"));
                        //change the size of the img from tb source
                        target.show();
                    } else target.hide();
                });
            });
            //delete the collections for account - collection page
            $(document).on("click", ".acc-collect-op", function() {
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
        }
    };
});

define("dist/js/1.0.0/zmall/dataHref-debug", [ "$-debug" ], function(require) {
    var $ = jQuery = require("$-debug");
    //init the data href
    $(document).on("click", "[data-href]", function() {
        var ele = $(this);
        var linkHref = ele.attr("data-href");
        var newWindow = ele.attr("data-newWin");
        if (linkHref && newWindow) window.open(linkHref); else if (linkHref) window.location.href = linkHref;
        //open in self window;
        return false;
    });
});

define("dist/js/1.0.0/zmall/checkbox_toggle-debug", [ "$-debug" ], function(require) {
    var $ = jQuery = require("$-debug");
    //checkbox toggle
    $(".zm-checkbox input").change(function() {
        var ele = $(this);
        if (this.checked) {
            ele.parent().children("i").css("display", "block");
        } else {
            ele.parent().children("i").css("display", "none");
        }
    });
});

define("dist/js/1.0.0/zmall/floorJump-debug", [ "$-debug", "dist/js/1.0.0/zmall/consAndFunc-debug" ], function(require) {
    var $ = jQuery = require("$-debug");
    var jumpFunc = require("dist/js/1.0.0/zmall/consAndFunc-debug");
    //floor jump
    //use .on() for the dom's defer
    //glyphicon go down
    $(document).on("click", ".indexMain-floor-elevator .glyphicon-chevron-down", function() {
        var ele = $(".indexMain-floor-elevator .glyphicon-chevron-down");
        var index = ele.index(this) + 1;
        var dom = $("#floor_" + (index + 1));
        //to bottom if it's the last icon-down
        if (index == ele.length) {
            dom = $("footer");
        }
        jumpFunc.scrollToFloor(dom);
    });
    //glyphicon go up
    $(document).on("click", ".indexMain-floor-elevator .glyphicon-chevron-up", function() {
        var ele = $(".indexMain-floor-elevator .glyphicon-chevron-up");
        var index = ele.index(this);
        var dom = $("#floor_" + index);
        //back to top if it's the 1st icon-up
        if (index == 0) {
            dom = $("html");
        }
        jumpFunc.scrollToFloor(dom);
    });
    //brands floor nav - click jump
    $("#brandNav a").each(function() {
        var element = $(this);
        var dom = element.attr("href");
        element.click(function() {
            jumpFunc.scrollToFloor($(dom));
            return false;
        });
    });
});

define("dist/js/1.0.0/zmall/bNav_scrollspy-debug", [ "$-debug", "dist/js/1.0.0/zmall/consAndFunc-debug", "dist/js/1.0.0/depends/bootstrap/scrollspy-debug" ], function(require) {
    var $ = jQuery = require("$-debug");
    var consAndFunc = require("dist/js/1.0.0/zmall/consAndFunc-debug");
    var scrollspy = require("dist/js/1.0.0/depends/bootstrap/scrollspy-debug");
    //call scrollspy
    $(".zmBrandsPage").scrollspy({
        target: "#brandNav",
        offset: consAndFunc.navOffset + 1
    });
});

define("dist/js/1.0.0/depends/bootstrap/scrollspy-debug", [ "$-debug" ], function(require, exports, module) {
    var $ = jQuery = require("$-debug");
    /* ========================================================================
 * Bootstrap: scrollspy.js v3.3.5
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
    +function($) {
        "use strict";
        // SCROLLSPY CLASS DEFINITION
        // ==========================
        function ScrollSpy(element, options) {
            this.$body = $(document.body);
            this.$scrollElement = $(element).is(document.body) ? $(window) : $(element);
            this.options = $.extend({}, ScrollSpy.DEFAULTS, options);
            this.selector = (this.options.target || "") + " .nav li > a";
            this.offsets = [];
            this.targets = [];
            this.activeTarget = null;
            this.scrollHeight = 0;
            this.$scrollElement.on("scroll.bs.scrollspy", $.proxy(this.process, this));
            this.refresh();
            this.process();
        }
        ScrollSpy.VERSION = "3.3.5";
        ScrollSpy.DEFAULTS = {
            offset: 10
        };
        ScrollSpy.prototype.getScrollHeight = function() {
            return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight);
        };
        ScrollSpy.prototype.refresh = function() {
            var that = this;
            var offsetMethod = "offset";
            var offsetBase = 0;
            this.offsets = [];
            this.targets = [];
            this.scrollHeight = this.getScrollHeight();
            if (!$.isWindow(this.$scrollElement[0])) {
                offsetMethod = "position";
                offsetBase = this.$scrollElement.scrollTop();
            }
            this.$body.find(this.selector).map(function() {
                var $el = $(this);
                var href = $el.data("target") || $el.attr("href");
                var $href = /^#./.test(href) && $(href);
                return $href && $href.length && $href.is(":visible") && [ [ $href[offsetMethod]().top + offsetBase, href ] ] || null;
            }).sort(function(a, b) {
                return a[0] - b[0];
            }).each(function() {
                that.offsets.push(this[0]);
                that.targets.push(this[1]);
            });
        };
        ScrollSpy.prototype.process = function() {
            var scrollTop = this.$scrollElement.scrollTop() + this.options.offset;
            var scrollHeight = this.getScrollHeight();
            var maxScroll = this.options.offset + scrollHeight - this.$scrollElement.height();
            var offsets = this.offsets;
            var targets = this.targets;
            var activeTarget = this.activeTarget;
            var i;
            if (this.scrollHeight != scrollHeight) {
                this.refresh();
            }
            if (scrollTop >= maxScroll) {
                return activeTarget != (i = targets[targets.length - 1]) && this.activate(i);
            }
            if (activeTarget && scrollTop < offsets[0]) {
                this.activeTarget = null;
                return this.clear();
            }
            for (i = offsets.length; i--; ) {
                activeTarget != targets[i] && scrollTop >= offsets[i] && (offsets[i + 1] === undefined || scrollTop < offsets[i + 1]) && this.activate(targets[i]);
            }
        };
        ScrollSpy.prototype.activate = function(target) {
            this.activeTarget = target;
            this.clear();
            var selector = this.selector + '[data-target="' + target + '"],' + this.selector + '[href="' + target + '"]';
            var active = $(selector).parents("li").addClass("active");
            if (active.parent(".dropdown-menu").length) {
                active = active.closest("li.dropdown").addClass("active");
            }
            active.trigger("activate.bs.scrollspy");
        };
        ScrollSpy.prototype.clear = function() {
            $(this.selector).parentsUntil(this.options.target, ".active").removeClass("active");
        };
        // SCROLLSPY PLUGIN DEFINITION
        // ===========================
        function Plugin(option) {
            return this.each(function() {
                var $this = $(this);
                var data = $this.data("bs.scrollspy");
                var options = typeof option == "object" && option;
                if (!data) $this.data("bs.scrollspy", data = new ScrollSpy(this, options));
                if (typeof option == "string") data[option]();
            });
        }
        var old = $.fn.scrollspy;
        $.fn.scrollspy = Plugin;
        $.fn.scrollspy.Constructor = ScrollSpy;
        // SCROLLSPY NO CONFLICT
        // =====================
        $.fn.scrollspy.noConflict = function() {
            $.fn.scrollspy = old;
            return this;
        };
        // SCROLLSPY DATA-API
        // ==================
        $(window).on("load.bs.scrollspy.data-api", function() {
            $('[data-spy="scroll"]').each(function() {
                var $spy = $(this);
                Plugin.call($spy, $spy.data());
            });
        });
    }(jQuery);
});

define("dist/js/1.0.0/zmall/datepicker-debug", [ "$-debug", "dist/js/1.0.0/depends/bootstrap/bootstrap-datetimepicker.min-debug", "dist/js/1.0.0/depends/bootstrap/moment.min-debug" ], function(require) {
    var $ = jQuery = require("$-debug");
    var datePicker = require("dist/js/1.0.0/depends/bootstrap/bootstrap-datetimepicker.min-debug");
    // date picker
    $('[data-active*="date_picker"]').each(function() {
        var ele = $(this);
        var date_type = ele.attr("data-active").split("_").pop();
        //get the last child of the array
        switch (date_type) {
          case "birth":
            //birthday date picker: only date and start from years
            ele.datetimepicker({
                viewMode: "years",
                //show the year 1st
                // defaultDate: "1988-01-01",
                format: "YYYY-MM-DD",
                pickTime: false
            });
            break;

          default:
            ele.datetimepicker({
                viewMode: "days",
                showToday: true,
                format: "YYYY-MM-DD HH:mm"
            });
            break;
        }
    });
});

define("dist/js/1.0.0/depends/bootstrap/bootstrap-datetimepicker.min-debug", [ "$-debug", "dist/js/1.0.0/depends/bootstrap/moment.min-debug" ], function(require, exports, module) {
    (function(root, factory) {
        "use strict";
        if (typeof define === "function" && define.amd) {
            // AMD is used - Register as an anonymous module.
            define([ "jquery", "moment" ], factory);
        } else if (typeof exports === "object") {
            factory(require("$-debug"), require("dist/js/1.0.0/depends/bootstrap/moment.min-debug"));
        } else {
            // Neither AMD or CommonJS used. Use global variables.
            if (!jQuery) {
                throw new Error("bootstrap-datetimepicker requires jQuery to be loaded first");
            }
            if (!moment) {
                throw new Error("bootstrap-datetimepicker requires moment.js to be loaded first");
            }
            factory(root.jQuery, moment);
        }
    })(this, function($, moment) {
        "use strict";
        if (typeof moment === "undefined") {
            throw new Error("momentjs is required");
        }
        var dpgId = 0, DateTimePicker = function(element, options) {
            var defaults = $.fn.datetimepicker.defaults, icons = {
                time: "glyphicon glyphicon-time",
                date: "glyphicon glyphicon-calendar",
                up: "glyphicon glyphicon-chevron-up",
                down: "glyphicon glyphicon-chevron-down"
            }, picker = this, errored = false, dDate, init = function() {
                var icon = false, localeData, rInterval;
                picker.options = $.extend({}, defaults, options);
                picker.options.icons = $.extend({}, icons, picker.options.icons);
                picker.element = $(element);
                dataToOptions();
                if (!(picker.options.pickTime || picker.options.pickDate)) {
                    throw new Error("Must choose at least one picker");
                }
                picker.id = dpgId++;
                moment.locale(picker.options.language);
                picker.date = moment();
                picker.unset = false;
                picker.isInput = picker.element.is("input");
                picker.component = false;
                if (picker.element.hasClass("input-group")) {
                    if (picker.element.find(".datepickerbutton").size() === 0) {
                        //in case there is more then one 'input-group-addon' Issue #48
                        picker.component = picker.element.find('[class^="input-group-"]');
                    } else {
                        picker.component = picker.element.find(".datepickerbutton");
                    }
                }
                picker.format = picker.options.format;
                localeData = moment().localeData();
                if (!picker.format) {
                    picker.format = picker.options.pickDate ? localeData.longDateFormat("L") : "";
                    if (picker.options.pickDate && picker.options.pickTime) {
                        picker.format += " ";
                    }
                    picker.format += picker.options.pickTime ? localeData.longDateFormat("LT") : "";
                    if (picker.options.useSeconds) {
                        if (localeData.longDateFormat("LT").indexOf(" A") !== -1) {
                            picker.format = picker.format.split(" A")[0] + ":ss A";
                        } else {
                            picker.format += ":ss";
                        }
                    }
                }
                picker.use24hours = picker.format.toLowerCase().indexOf("a") < 0 && picker.format.indexOf("h") < 0;
                if (picker.component) {
                    icon = picker.component.find("span");
                }
                if (picker.options.pickTime) {
                    if (icon) {
                        icon.addClass(picker.options.icons.time);
                    }
                }
                if (picker.options.pickDate) {
                    if (icon) {
                        icon.removeClass(picker.options.icons.time);
                        icon.addClass(picker.options.icons.date);
                    }
                }
                picker.options.widgetParent = typeof picker.options.widgetParent === "string" && picker.options.widgetParent || picker.element.parents().filter(function() {
                    return "scroll" === $(this).css("overflow-y");
                }).get(0) || "body";
                picker.widget = $(getTemplate()).appendTo(picker.options.widgetParent);
                picker.minViewMode = picker.options.minViewMode || 0;
                if (typeof picker.minViewMode === "string") {
                    switch (picker.minViewMode) {
                      case "months":
                        picker.minViewMode = 1;
                        break;

                      case "years":
                        picker.minViewMode = 2;
                        break;

                      default:
                        picker.minViewMode = 0;
                        break;
                    }
                }
                picker.viewMode = picker.options.viewMode || 0;
                if (typeof picker.viewMode === "string") {
                    switch (picker.viewMode) {
                      case "months":
                        picker.viewMode = 1;
                        break;

                      case "years":
                        picker.viewMode = 2;
                        break;

                      default:
                        picker.viewMode = 0;
                        break;
                    }
                }
                picker.viewMode = Math.max(picker.viewMode, picker.minViewMode);
                picker.options.disabledDates = indexGivenDates(picker.options.disabledDates);
                picker.options.enabledDates = indexGivenDates(picker.options.enabledDates);
                picker.startViewMode = picker.viewMode;
                picker.setMinDate(picker.options.minDate);
                picker.setMaxDate(picker.options.maxDate);
                fillDow();
                fillMonths();
                fillHours();
                fillMinutes();
                fillSeconds();
                update();
                showMode();
                if (!getPickerInput().prop("disabled")) {
                    attachDatePickerEvents();
                }
                if (picker.options.defaultDate !== "" && getPickerInput().val() === "") {
                    picker.setValue(picker.options.defaultDate);
                }
                if (picker.options.minuteStepping !== 1) {
                    rInterval = picker.options.minuteStepping;
                    picker.date.minutes(Math.round(picker.date.minutes() / rInterval) * rInterval % 60).seconds(0);
                }
            }, getPickerInput = function() {
                var input;
                if (picker.isInput) {
                    return picker.element;
                }
                input = picker.element.find(".datepickerinput");
                if (input.size() === 0) {
                    input = picker.element.find("input");
                } else if (!input.is("input")) {
                    throw new Error('CSS class "datepickerinput" cannot be applied to non input element');
                }
                return input;
            }, dataToOptions = function() {
                var eData;
                if (picker.element.is("input")) {
                    eData = picker.element.data();
                } else {
                    eData = picker.element.find("input").data();
                }
                if (eData.dateFormat !== undefined) {
                    picker.options.format = eData.dateFormat;
                }
                if (eData.datePickdate !== undefined) {
                    picker.options.pickDate = eData.datePickdate;
                }
                if (eData.datePicktime !== undefined) {
                    picker.options.pickTime = eData.datePicktime;
                }
                if (eData.dateUseminutes !== undefined) {
                    picker.options.useMinutes = eData.dateUseminutes;
                }
                if (eData.dateUseseconds !== undefined) {
                    picker.options.useSeconds = eData.dateUseseconds;
                }
                if (eData.dateUsecurrent !== undefined) {
                    picker.options.useCurrent = eData.dateUsecurrent;
                }
                if (eData.calendarWeeks !== undefined) {
                    picker.options.calendarWeeks = eData.calendarWeeks;
                }
                if (eData.dateMinutestepping !== undefined) {
                    picker.options.minuteStepping = eData.dateMinutestepping;
                }
                if (eData.dateMindate !== undefined) {
                    picker.options.minDate = eData.dateMindate;
                }
                if (eData.dateMaxdate !== undefined) {
                    picker.options.maxDate = eData.dateMaxdate;
                }
                if (eData.dateShowtoday !== undefined) {
                    picker.options.showToday = eData.dateShowtoday;
                }
                if (eData.dateCollapse !== undefined) {
                    picker.options.collapse = eData.dateCollapse;
                }
                if (eData.dateLanguage !== undefined) {
                    picker.options.language = eData.dateLanguage;
                }
                if (eData.dateDefaultdate !== undefined) {
                    picker.options.defaultDate = eData.dateDefaultdate;
                }
                if (eData.dateDisableddates !== undefined) {
                    picker.options.disabledDates = eData.dateDisableddates;
                }
                if (eData.dateEnableddates !== undefined) {
                    picker.options.enabledDates = eData.dateEnableddates;
                }
                if (eData.dateIcons !== undefined) {
                    picker.options.icons = eData.dateIcons;
                }
                if (eData.dateUsestrict !== undefined) {
                    picker.options.useStrict = eData.dateUsestrict;
                }
                if (eData.dateDirection !== undefined) {
                    picker.options.direction = eData.dateDirection;
                }
                if (eData.dateSidebyside !== undefined) {
                    picker.options.sideBySide = eData.dateSidebyside;
                }
                if (eData.dateDaysofweekdisabled !== undefined) {
                    picker.options.daysOfWeekDisabled = eData.dateDaysofweekdisabled;
                }
            }, place = function() {
                var position = "absolute", offset = picker.component ? picker.component.offset() : picker.element.offset(), $window = $(window), placePosition;
                picker.width = picker.component ? picker.component.outerWidth() : picker.element.outerWidth();
                offset.top = offset.top + picker.element.outerHeight();
                if (picker.options.direction === "up") {
                    placePosition = "top";
                } else if (picker.options.direction === "bottom") {
                    placePosition = "bottom";
                } else if (picker.options.direction === "auto") {
                    if (offset.top + picker.widget.height() > $window.height() + $window.scrollTop() && picker.widget.height() + picker.element.outerHeight() < offset.top) {
                        placePosition = "top";
                    } else {
                        placePosition = "bottom";
                    }
                }
                if (placePosition === "top") {
                    offset.top = offset.top - picker.element.outerHeight() - picker.widget.height() - 13;
                    picker.widget.addClass("top").removeClass("bottom");
                } else {
                    offset.top += 1;
                    picker.widget.addClass("bottom").removeClass("top");
                }
                if (picker.options.width !== undefined) {
                    picker.widget.width(picker.options.width);
                }
                if (picker.options.orientation === "left") {
                    picker.widget.addClass("left-oriented");
                    offset.left = offset.left - picker.widget.width() + 20;
                }
                if (isInFixed()) {
                    position = "fixed";
                    offset.top -= $window.scrollTop();
                    offset.left -= $window.scrollLeft();
                }
                if ($window.width() < offset.left + picker.widget.outerWidth()) {
                    offset.right = $window.width() - offset.left - picker.width;
                    offset.left = "auto";
                    picker.widget.addClass("pull-right");
                } else {
                    offset.right = "auto";
                    picker.widget.removeClass("pull-right");
                }
                if (placePosition === "top") {
                    picker.widget.css({
                        position: position,
                        bottom: "auto",
                        top: offset.top,
                        left: offset.left,
                        right: offset.right
                    });
                } else {
                    picker.widget.css({
                        position: position,
                        top: offset.top,
                        bottom: "auto",
                        left: offset.left,
                        right: offset.right
                    });
                }
            }, notifyChange = function(oldDate, eventType) {
                if (moment(picker.date).isSame(moment(oldDate)) && !errored) {
                    return;
                }
                errored = false;
                picker.element.trigger({
                    type: "dp.change",
                    date: moment(picker.date),
                    oldDate: moment(oldDate)
                });
                if (eventType !== "change") {
                    picker.element.change();
                }
            }, notifyError = function(date) {
                errored = true;
                picker.element.trigger({
                    type: "dp.error",
                    date: moment(date, picker.format, picker.options.useStrict)
                });
            }, update = function(newDate) {
                moment.locale(picker.options.language);
                var dateStr = newDate;
                if (!dateStr) {
                    dateStr = getPickerInput().val();
                    if (dateStr) {
                        picker.date = moment(dateStr, picker.format, picker.options.useStrict);
                    }
                    if (!picker.date) {
                        picker.date = moment();
                    }
                }
                picker.viewDate = moment(picker.date).startOf("month");
                fillDate();
                fillTime();
            }, fillDow = function() {
                moment.locale(picker.options.language);
                var html = $("<tr>"), weekdaysMin = moment.weekdaysMin(), i;
                if (picker.options.calendarWeeks === true) {
                    html.append('<th class="cw">#</th>');
                }
                if (moment().localeData()._week.dow === 0) {
                    // starts on Sunday
                    for (i = 0; i < 7; i++) {
                        html.append('<th class="dow">' + weekdaysMin[i] + "</th>");
                    }
                } else {
                    for (i = 1; i < 8; i++) {
                        if (i === 7) {
                            html.append('<th class="dow">' + weekdaysMin[0] + "</th>");
                        } else {
                            html.append('<th class="dow">' + weekdaysMin[i] + "</th>");
                        }
                    }
                }
                picker.widget.find(".datepicker-days thead").append(html);
            }, fillMonths = function() {
                moment.locale(picker.options.language);
                var html = "", i, monthsShort = moment.monthsShort();
                for (i = 0; i < 12; i++) {
                    html += '<span class="month">' + monthsShort[i] + "</span>";
                }
                picker.widget.find(".datepicker-months td").append(html);
            }, fillDate = function() {
                if (!picker.options.pickDate) {
                    return;
                }
                moment.locale(picker.options.language);
                var year = picker.viewDate.year(), month = picker.viewDate.month(), startYear = picker.options.minDate.year(), startMonth = picker.options.minDate.month(), endYear = picker.options.maxDate.year(), endMonth = picker.options.maxDate.month(), currentDate, prevMonth, nextMonth, html = [], row, clsName, i, days, yearCont, currentYear, months = moment.months();
                picker.widget.find(".datepicker-days").find(".disabled").removeClass("disabled");
                picker.widget.find(".datepicker-months").find(".disabled").removeClass("disabled");
                picker.widget.find(".datepicker-years").find(".disabled").removeClass("disabled");
                picker.widget.find(".datepicker-days th:eq(1)").text(months[month] + " " + year);
                prevMonth = moment(picker.viewDate, picker.format, picker.options.useStrict).subtract(1, "months");
                days = prevMonth.daysInMonth();
                prevMonth.date(days).startOf("week");
                if (year === startYear && month <= startMonth || year < startYear) {
                    picker.widget.find(".datepicker-days th:eq(0)").addClass("disabled");
                }
                if (year === endYear && month >= endMonth || year > endYear) {
                    picker.widget.find(".datepicker-days th:eq(2)").addClass("disabled");
                }
                nextMonth = moment(prevMonth).add(42, "d");
                while (prevMonth.isBefore(nextMonth)) {
                    if (prevMonth.weekday() === moment().startOf("week").weekday()) {
                        row = $("<tr>");
                        html.push(row);
                        if (picker.options.calendarWeeks === true) {
                            row.append('<td class="cw">' + prevMonth.week() + "</td>");
                        }
                    }
                    clsName = "";
                    if (prevMonth.year() < year || prevMonth.year() === year && prevMonth.month() < month) {
                        clsName += " old";
                    } else if (prevMonth.year() > year || prevMonth.year() === year && prevMonth.month() > month) {
                        clsName += " new";
                    }
                    if (prevMonth.isSame(moment({
                        y: picker.date.year(),
                        M: picker.date.month(),
                        d: picker.date.date()
                    }))) {
                        clsName += " active";
                    }
                    if (isInDisableDates(prevMonth, "day") || !isInEnableDates(prevMonth)) {
                        clsName += " disabled";
                    }
                    if (picker.options.showToday === true) {
                        if (prevMonth.isSame(moment(), "day")) {
                            clsName += " today";
                        }
                    }
                    if (picker.options.daysOfWeekDisabled) {
                        for (i = 0; i < picker.options.daysOfWeekDisabled.length; i++) {
                            if (prevMonth.day() === picker.options.daysOfWeekDisabled[i]) {
                                clsName += " disabled";
                                break;
                            }
                        }
                    }
                    row.append('<td class="day' + clsName + '">' + prevMonth.date() + "</td>");
                    currentDate = prevMonth.date();
                    prevMonth.add(1, "d");
                    if (currentDate === prevMonth.date()) {
                        prevMonth.add(1, "d");
                    }
                }
                picker.widget.find(".datepicker-days tbody").empty().append(html);
                currentYear = picker.date.year();
                months = picker.widget.find(".datepicker-months").find("th:eq(1)").text(year).end().find("span").removeClass("active");
                if (currentYear === year) {
                    months.eq(picker.date.month()).addClass("active");
                }
                if (year - 1 < startYear) {
                    picker.widget.find(".datepicker-months th:eq(0)").addClass("disabled");
                }
                if (year + 1 > endYear) {
                    picker.widget.find(".datepicker-months th:eq(2)").addClass("disabled");
                }
                for (i = 0; i < 12; i++) {
                    if (year === startYear && startMonth > i || year < startYear) {
                        $(months[i]).addClass("disabled");
                    } else if (year === endYear && endMonth < i || year > endYear) {
                        $(months[i]).addClass("disabled");
                    }
                }
                html = "";
                year = parseInt(year / 10, 10) * 10;
                yearCont = picker.widget.find(".datepicker-years").find("th:eq(1)").text(year + "-" + (year + 9)).parents("table").find("td");
                picker.widget.find(".datepicker-years").find("th").removeClass("disabled");
                if (startYear > year) {
                    picker.widget.find(".datepicker-years").find("th:eq(0)").addClass("disabled");
                }
                if (endYear < year + 9) {
                    picker.widget.find(".datepicker-years").find("th:eq(2)").addClass("disabled");
                }
                year -= 1;
                for (i = -1; i < 11; i++) {
                    html += '<span class="year' + (i === -1 || i === 10 ? " old" : "") + (currentYear === year ? " active" : "") + (year < startYear || year > endYear ? " disabled" : "") + '">' + year + "</span>";
                    year += 1;
                }
                yearCont.html(html);
            }, fillHours = function() {
                moment.locale(picker.options.language);
                var table = picker.widget.find(".timepicker .timepicker-hours table"), html = "", current, i, j;
                table.parent().hide();
                if (picker.use24hours) {
                    current = 0;
                    for (i = 0; i < 6; i += 1) {
                        html += "<tr>";
                        for (j = 0; j < 4; j += 1) {
                            html += '<td class="hour">' + padLeft(current.toString()) + "</td>";
                            current++;
                        }
                        html += "</tr>";
                    }
                } else {
                    current = 1;
                    for (i = 0; i < 3; i += 1) {
                        html += "<tr>";
                        for (j = 0; j < 4; j += 1) {
                            html += '<td class="hour">' + padLeft(current.toString()) + "</td>";
                            current++;
                        }
                        html += "</tr>";
                    }
                }
                table.html(html);
            }, fillMinutes = function() {
                var table = picker.widget.find(".timepicker .timepicker-minutes table"), html = "", current = 0, i, j, step = picker.options.minuteStepping;
                table.parent().hide();
                if (step === 1) {
                    step = 5;
                }
                for (i = 0; i < Math.ceil(60 / step / 4); i++) {
                    html += "<tr>";
                    for (j = 0; j < 4; j += 1) {
                        if (current < 60) {
                            html += '<td class="minute">' + padLeft(current.toString()) + "</td>";
                            current += step;
                        } else {
                            html += "<td></td>";
                        }
                    }
                    html += "</tr>";
                }
                table.html(html);
            }, fillSeconds = function() {
                var table = picker.widget.find(".timepicker .timepicker-seconds table"), html = "", current = 0, i, j;
                table.parent().hide();
                for (i = 0; i < 3; i++) {
                    html += "<tr>";
                    for (j = 0; j < 4; j += 1) {
                        html += '<td class="second">' + padLeft(current.toString()) + "</td>";
                        current += 5;
                    }
                    html += "</tr>";
                }
                table.html(html);
            }, fillTime = function() {
                if (!picker.date) {
                    return;
                }
                var timeComponents = picker.widget.find(".timepicker span[data-time-component]"), hour = picker.date.hours(), period = picker.date.format("A");
                if (!picker.use24hours) {
                    if (hour === 0) {
                        hour = 12;
                    } else if (hour !== 12) {
                        hour = hour % 12;
                    }
                    picker.widget.find(".timepicker [data-action=togglePeriod]").text(period);
                }
                timeComponents.filter("[data-time-component=hours]").text(padLeft(hour));
                timeComponents.filter("[data-time-component=minutes]").text(padLeft(picker.date.minutes()));
                timeComponents.filter("[data-time-component=seconds]").text(padLeft(picker.date.second()));
            }, click = function(e) {
                e.stopPropagation();
                e.preventDefault();
                picker.unset = false;
                var target = $(e.target).closest("span, td, th"), month, year, step, day, oldDate = moment(picker.date);
                if (target.length === 1) {
                    if (!target.is(".disabled")) {
                        switch (target[0].nodeName.toLowerCase()) {
                          case "th":
                            switch (target[0].className) {
                              case "picker-switch":
                                showMode(1);
                                break;

                              case "prev":
                              case "next":
                                step = dpGlobal.modes[picker.viewMode].navStep;
                                if (target[0].className === "prev") {
                                    step = step * -1;
                                }
                                picker.viewDate.add(step, dpGlobal.modes[picker.viewMode].navFnc);
                                fillDate();
                                break;
                            }
                            break;

                          case "span":
                            if (target.is(".month")) {
                                month = target.parent().find("span").index(target);
                                picker.viewDate.month(month);
                            } else {
                                year = parseInt(target.text(), 10) || 0;
                                picker.viewDate.year(year);
                            }
                            if (picker.viewMode === picker.minViewMode) {
                                picker.date = moment({
                                    y: picker.viewDate.year(),
                                    M: picker.viewDate.month(),
                                    d: picker.viewDate.date(),
                                    h: picker.date.hours(),
                                    m: picker.date.minutes(),
                                    s: picker.date.seconds()
                                });
                                set();
                                notifyChange(oldDate, e.type);
                            }
                            showMode(-1);
                            fillDate();
                            break;

                          case "td":
                            if (target.is(".day")) {
                                day = parseInt(target.text(), 10) || 1;
                                month = picker.viewDate.month();
                                year = picker.viewDate.year();
                                if (target.is(".old")) {
                                    if (month === 0) {
                                        month = 11;
                                        year -= 1;
                                    } else {
                                        month -= 1;
                                    }
                                } else if (target.is(".new")) {
                                    if (month === 11) {
                                        month = 0;
                                        year += 1;
                                    } else {
                                        month += 1;
                                    }
                                }
                                picker.date = moment({
                                    y: year,
                                    M: month,
                                    d: day,
                                    h: picker.date.hours(),
                                    m: picker.date.minutes(),
                                    s: picker.date.seconds()
                                });
                                picker.viewDate = moment({
                                    y: year,
                                    M: month,
                                    d: Math.min(28, day)
                                });
                                fillDate();
                                set();
                                notifyChange(oldDate, e.type);
                            }
                            break;
                        }
                    }
                }
            }, actions = {
                incrementHours: function() {
                    checkDate("add", "hours", 1);
                },
                incrementMinutes: function() {
                    checkDate("add", "minutes", picker.options.minuteStepping);
                },
                incrementSeconds: function() {
                    checkDate("add", "seconds", 1);
                },
                decrementHours: function() {
                    checkDate("subtract", "hours", 1);
                },
                decrementMinutes: function() {
                    checkDate("subtract", "minutes", picker.options.minuteStepping);
                },
                decrementSeconds: function() {
                    checkDate("subtract", "seconds", 1);
                },
                togglePeriod: function() {
                    var hour = picker.date.hours();
                    if (hour >= 12) {
                        hour -= 12;
                    } else {
                        hour += 12;
                    }
                    picker.date.hours(hour);
                },
                showPicker: function() {
                    picker.widget.find(".timepicker > div:not(.timepicker-picker)").hide();
                    picker.widget.find(".timepicker .timepicker-picker").show();
                },
                showHours: function() {
                    picker.widget.find(".timepicker .timepicker-picker").hide();
                    picker.widget.find(".timepicker .timepicker-hours").show();
                },
                showMinutes: function() {
                    picker.widget.find(".timepicker .timepicker-picker").hide();
                    picker.widget.find(".timepicker .timepicker-minutes").show();
                },
                showSeconds: function() {
                    picker.widget.find(".timepicker .timepicker-picker").hide();
                    picker.widget.find(".timepicker .timepicker-seconds").show();
                },
                selectHour: function(e) {
                    var hour = parseInt($(e.target).text(), 10);
                    if (!picker.use24hours) {
                        if (picker.date.hours() >= 12) {
                            if (hour !== 12) {
                                hour += 12;
                            }
                        } else {
                            if (hour === 12) {
                                hour = 0;
                            }
                        }
                    }
                    picker.date.hours(hour);
                    actions.showPicker.call(picker);
                },
                selectMinute: function(e) {
                    picker.date.minutes(parseInt($(e.target).text(), 10));
                    actions.showPicker.call(picker);
                },
                selectSecond: function(e) {
                    picker.date.seconds(parseInt($(e.target).text(), 10));
                    actions.showPicker.call(picker);
                }
            }, doAction = function(e) {
                var oldDate = moment(picker.date), action = $(e.currentTarget).data("action"), rv = actions[action].apply(picker, arguments);
                stopEvent(e);
                if (!picker.date) {
                    picker.date = moment({
                        y: 1970
                    });
                }
                set();
                fillTime();
                notifyChange(oldDate, e.type);
                return rv;
            }, stopEvent = function(e) {
                e.stopPropagation();
                e.preventDefault();
            }, keydown = function(e) {
                if (e.keyCode === 27) {
                    // allow escape to hide picker
                    picker.hide();
                }
            }, change = function(e) {
                moment.locale(picker.options.language);
                var input = $(e.target), oldDate = moment(picker.date), newDate = moment(input.val(), picker.format, picker.options.useStrict);
                if (newDate.isValid() && !isInDisableDates(newDate) && isInEnableDates(newDate)) {
                    update();
                    picker.setValue(newDate);
                    notifyChange(oldDate, e.type);
                    set();
                } else {
                    picker.viewDate = oldDate;
                    picker.unset = true;
                    notifyChange(oldDate, e.type);
                    notifyError(newDate);
                }
            }, showMode = function(dir) {
                if (dir) {
                    picker.viewMode = Math.max(picker.minViewMode, Math.min(2, picker.viewMode + dir));
                }
                picker.widget.find(".datepicker > div").hide().filter(".datepicker-" + dpGlobal.modes[picker.viewMode].clsName).show();
            }, attachDatePickerEvents = function() {
                var $this, $parent, expanded, closed, collapseData;
                picker.widget.on("click", ".datepicker *", $.proxy(click, this));
                // this handles date picker clicks
                picker.widget.on("click", "[data-action]", $.proxy(doAction, this));
                // this handles time picker clicks
                picker.widget.on("mousedown", $.proxy(stopEvent, this));
                picker.element.on("keydown", $.proxy(keydown, this));
                if (picker.options.pickDate && picker.options.pickTime) {
                    picker.widget.on("click.togglePicker", ".accordion-toggle", function(e) {
                        e.stopPropagation();
                        $this = $(this);
                        $parent = $this.closest("ul");
                        expanded = $parent.find(".in");
                        closed = $parent.find(".collapse:not(.in)");
                        if (expanded && expanded.length) {
                            collapseData = expanded.data("collapse");
                            if (collapseData && collapseData.transitioning) {
                                return;
                            }
                            expanded.collapse("hide");
                            closed.collapse("show");
                            $this.find("span").toggleClass(picker.options.icons.time + " " + picker.options.icons.date);
                            if (picker.component) {
                                picker.component.find("span").toggleClass(picker.options.icons.time + " " + picker.options.icons.date);
                            }
                        }
                    });
                }
                if (picker.isInput) {
                    picker.element.on({
                        click: $.proxy(picker.show, this),
                        focus: $.proxy(picker.show, this),
                        change: $.proxy(change, this),
                        blur: $.proxy(picker.hide, this)
                    });
                } else {
                    picker.element.on({
                        change: $.proxy(change, this)
                    }, "input");
                    if (picker.component) {
                        picker.component.on("click", $.proxy(picker.show, this));
                        picker.component.on("mousedown", $.proxy(stopEvent, this));
                    } else {
                        picker.element.on("click", $.proxy(picker.show, this));
                    }
                }
            }, attachDatePickerGlobalEvents = function() {
                $(window).on("resize.datetimepicker" + picker.id, $.proxy(place, this));
                if (!picker.isInput) {
                    $(document).on("mousedown.datetimepicker" + picker.id, $.proxy(picker.hide, this));
                }
            }, detachDatePickerEvents = function() {
                picker.widget.off("click", ".datepicker *", picker.click);
                picker.widget.off("click", "[data-action]");
                picker.widget.off("mousedown", picker.stopEvent);
                if (picker.options.pickDate && picker.options.pickTime) {
                    picker.widget.off("click.togglePicker");
                }
                if (picker.isInput) {
                    picker.element.off({
                        focus: picker.show,
                        change: change,
                        click: picker.show,
                        blur: picker.hide
                    });
                } else {
                    picker.element.off({
                        change: change
                    }, "input");
                    if (picker.component) {
                        picker.component.off("click", picker.show);
                        picker.component.off("mousedown", picker.stopEvent);
                    } else {
                        picker.element.off("click", picker.show);
                    }
                }
            }, detachDatePickerGlobalEvents = function() {
                $(window).off("resize.datetimepicker" + picker.id);
                if (!picker.isInput) {
                    $(document).off("mousedown.datetimepicker" + picker.id);
                }
            }, isInFixed = function() {
                if (picker.element) {
                    var parents = picker.element.parents(), inFixed = false, i;
                    for (i = 0; i < parents.length; i++) {
                        if ($(parents[i]).css("position") === "fixed") {
                            inFixed = true;
                            break;
                        }
                    }
                    return inFixed;
                } else {
                    return false;
                }
            }, set = function() {
                moment.locale(picker.options.language);
                var formatted = "";
                if (!picker.unset) {
                    formatted = moment(picker.date).format(picker.format);
                }
                getPickerInput().val(formatted);
                picker.element.data("date", formatted);
                if (!picker.options.pickTime) {
                    picker.hide();
                }
            }, checkDate = function(direction, unit, amount) {
                moment.locale(picker.options.language);
                var newDate;
                if (direction === "add") {
                    newDate = moment(picker.date);
                    if (newDate.hours() === 23) {
                        newDate.add(amount, unit);
                    }
                    newDate.add(amount, unit);
                } else {
                    newDate = moment(picker.date).subtract(amount, unit);
                }
                if (isInDisableDates(moment(newDate.subtract(amount, unit))) || isInDisableDates(newDate)) {
                    notifyError(newDate.format(picker.format));
                    return;
                }
                if (direction === "add") {
                    picker.date.add(amount, unit);
                } else {
                    picker.date.subtract(amount, unit);
                }
                picker.unset = false;
            }, isInDisableDates = function(date, timeUnit) {
                moment.locale(picker.options.language);
                var maxDate = moment(picker.options.maxDate, picker.format, picker.options.useStrict), minDate = moment(picker.options.minDate, picker.format, picker.options.useStrict);
                if (timeUnit) {
                    maxDate = maxDate.endOf(timeUnit);
                    minDate = minDate.startOf(timeUnit);
                }
                if (date.isAfter(maxDate) || date.isBefore(minDate)) {
                    return true;
                }
                if (picker.options.disabledDates === false) {
                    return false;
                }
                return picker.options.disabledDates[date.format("YYYY-MM-DD")] === true;
            }, isInEnableDates = function(date) {
                moment.locale(picker.options.language);
                if (picker.options.enabledDates === false) {
                    return true;
                }
                return picker.options.enabledDates[date.format("YYYY-MM-DD")] === true;
            }, indexGivenDates = function(givenDatesArray) {
                // Store given enabledDates and disabledDates as keys.
                // This way we can check their existence in O(1) time instead of looping through whole array.
                // (for example: picker.options.enabledDates['2014-02-27'] === true)
                var givenDatesIndexed = {}, givenDatesCount = 0, i;
                for (i = 0; i < givenDatesArray.length; i++) {
                    if (moment.isMoment(givenDatesArray[i]) || givenDatesArray[i] instanceof Date) {
                        dDate = moment(givenDatesArray[i]);
                    } else {
                        dDate = moment(givenDatesArray[i], picker.format, picker.options.useStrict);
                    }
                    if (dDate.isValid()) {
                        givenDatesIndexed[dDate.format("YYYY-MM-DD")] = true;
                        givenDatesCount++;
                    }
                }
                if (givenDatesCount > 0) {
                    return givenDatesIndexed;
                }
                return false;
            }, padLeft = function(string) {
                string = string.toString();
                if (string.length >= 2) {
                    return string;
                }
                return "0" + string;
            }, getTemplate = function() {
                var headTemplate = "<thead>" + "<tr>" + '<th class="prev">&lsaquo;</th><th colspan="' + (picker.options.calendarWeeks ? "6" : "5") + '" class="picker-switch"></th><th class="next">&rsaquo;</th>' + "</tr>" + "</thead>", contTemplate = '<tbody><tr><td colspan="' + (picker.options.calendarWeeks ? "8" : "7") + '"></td></tr></tbody>', template = '<div class="datepicker-days">' + '<table class="table-condensed">' + headTemplate + "<tbody></tbody></table>" + "</div>" + '<div class="datepicker-months">' + '<table class="table-condensed">' + headTemplate + contTemplate + "</table>" + "</div>" + '<div class="datepicker-years">' + '<table class="table-condensed">' + headTemplate + contTemplate + "</table>" + "</div>", ret = "";
                if (picker.options.pickDate && picker.options.pickTime) {
                    ret = '<div class="bootstrap-datetimepicker-widget' + (picker.options.sideBySide ? " timepicker-sbs" : "") + (picker.use24hours ? " usetwentyfour" : "") + ' dropdown-menu" style="z-index:9999 !important;">';
                    if (picker.options.sideBySide) {
                        ret += '<div class="row">' + '<div class="col-sm-6 datepicker">' + template + "</div>" + '<div class="col-sm-6 timepicker">' + tpGlobal.getTemplate() + "</div>" + "</div>";
                    } else {
                        ret += '<ul class="list-unstyled">' + "<li" + (picker.options.collapse ? ' class="collapse in"' : "") + ">" + '<div class="datepicker">' + template + "</div>" + "</li>" + '<li class="picker-switch accordion-toggle"><a class="btn" style="width:100%"><span class="' + picker.options.icons.time + '"></span></a></li>' + "<li" + (picker.options.collapse ? ' class="collapse"' : "") + ">" + '<div class="timepicker">' + tpGlobal.getTemplate() + "</div>" + "</li>" + "</ul>";
                    }
                    ret += "</div>";
                    return ret;
                }
                if (picker.options.pickTime) {
                    return '<div class="bootstrap-datetimepicker-widget dropdown-menu">' + '<div class="timepicker">' + tpGlobal.getTemplate() + "</div>" + "</div>";
                }
                return '<div class="bootstrap-datetimepicker-widget dropdown-menu">' + '<div class="datepicker">' + template + "</div>" + "</div>";
            }, dpGlobal = {
                modes: [ {
                    clsName: "days",
                    navFnc: "month",
                    navStep: 1
                }, {
                    clsName: "months",
                    navFnc: "year",
                    navStep: 1
                }, {
                    clsName: "years",
                    navFnc: "year",
                    navStep: 10
                } ]
            }, tpGlobal = {
                hourTemplate: '<span data-action="showHours"   data-time-component="hours"   class="timepicker-hour"></span>',
                minuteTemplate: '<span data-action="showMinutes" data-time-component="minutes" class="timepicker-minute"></span>',
                secondTemplate: '<span data-action="showSeconds"  data-time-component="seconds" class="timepicker-second"></span>'
            };
            tpGlobal.getTemplate = function() {
                return '<div class="timepicker-picker">' + '<table class="table-condensed">' + "<tr>" + '<td><a href="#" class="btn" data-action="incrementHours"><span class="' + picker.options.icons.up + '"></span></a></td>' + '<td class="separator"></td>' + "<td>" + (picker.options.useMinutes ? '<a href="#" class="btn" data-action="incrementMinutes"><span class="' + picker.options.icons.up + '"></span></a>' : "") + "</td>" + (picker.options.useSeconds ? '<td class="separator"></td><td><a href="#" class="btn" data-action="incrementSeconds"><span class="' + picker.options.icons.up + '"></span></a></td>' : "") + (picker.use24hours ? "" : '<td class="separator"></td>') + "</tr>" + "<tr>" + "<td>" + tpGlobal.hourTemplate + "</td> " + '<td class="separator">:</td>' + "<td>" + (picker.options.useMinutes ? tpGlobal.minuteTemplate : '<span class="timepicker-minute">00</span>') + "</td> " + (picker.options.useSeconds ? '<td class="separator">:</td><td>' + tpGlobal.secondTemplate + "</td>" : "") + (picker.use24hours ? "" : '<td class="separator"></td>' + '<td><button type="button" class="btn btn-primary" data-action="togglePeriod"></button></td>') + "</tr>" + "<tr>" + '<td><a href="#" class="btn" data-action="decrementHours"><span class="' + picker.options.icons.down + '"></span></a></td>' + '<td class="separator"></td>' + "<td>" + (picker.options.useMinutes ? '<a href="#" class="btn" data-action="decrementMinutes"><span class="' + picker.options.icons.down + '"></span></a>' : "") + "</td>" + (picker.options.useSeconds ? '<td class="separator"></td><td><a href="#" class="btn" data-action="decrementSeconds"><span class="' + picker.options.icons.down + '"></span></a></td>' : "") + (picker.use24hours ? "" : '<td class="separator"></td>') + "</tr>" + "</table>" + "</div>" + '<div class="timepicker-hours" data-action="selectHour">' + '<table class="table-condensed"></table>' + "</div>" + '<div class="timepicker-minutes" data-action="selectMinute">' + '<table class="table-condensed"></table>' + "</div>" + (picker.options.useSeconds ? '<div class="timepicker-seconds" data-action="selectSecond"><table class="table-condensed"></table></div>' : "");
            };
            picker.destroy = function() {
                detachDatePickerEvents();
                detachDatePickerGlobalEvents();
                picker.widget.remove();
                picker.element.removeData("DateTimePicker");
                if (picker.component) {
                    picker.component.removeData("DateTimePicker");
                }
            };
            picker.show = function(e) {
                if (getPickerInput().prop("disabled")) {
                    return;
                }
                if (picker.options.useCurrent) {
                    if (getPickerInput().val() === "") {
                        if (picker.options.minuteStepping !== 1) {
                            var mDate = moment(), rInterval = picker.options.minuteStepping;
                            mDate.minutes(Math.round(mDate.minutes() / rInterval) * rInterval % 60).seconds(0);
                            picker.setValue(mDate.format(picker.format));
                        } else {
                            picker.setValue(moment().format(picker.format));
                        }
                        notifyChange("", e.type);
                    }
                }
                // if this is a click event on the input field and picker is already open don't hide it
                if (e && e.type === "click" && picker.isInput && picker.widget.hasClass("picker-open")) {
                    return;
                }
                if (picker.widget.hasClass("picker-open")) {
                    picker.widget.hide();
                    picker.widget.removeClass("picker-open");
                } else {
                    picker.widget.show();
                    picker.widget.addClass("picker-open");
                }
                picker.height = picker.component ? picker.component.outerHeight() : picker.element.outerHeight();
                place();
                picker.element.trigger({
                    type: "dp.show",
                    date: moment(picker.date)
                });
                attachDatePickerGlobalEvents();
                if (e) {
                    stopEvent(e);
                }
            };
            picker.disable = function() {
                var input = getPickerInput();
                if (input.prop("disabled")) {
                    return;
                }
                input.prop("disabled", true);
                detachDatePickerEvents();
            };
            picker.enable = function() {
                var input = getPickerInput();
                if (!input.prop("disabled")) {
                    return;
                }
                input.prop("disabled", false);
                attachDatePickerEvents();
            };
            picker.hide = function() {
                // Ignore event if in the middle of a picker transition
                var collapse = picker.widget.find(".collapse"), i, collapseData;
                for (i = 0; i < collapse.length; i++) {
                    collapseData = collapse.eq(i).data("collapse");
                    if (collapseData && collapseData.transitioning) {
                        return;
                    }
                }
                picker.widget.hide();
                picker.widget.removeClass("picker-open");
                picker.viewMode = picker.startViewMode;
                showMode();
                picker.element.trigger({
                    type: "dp.hide",
                    date: moment(picker.date)
                });
                detachDatePickerGlobalEvents();
            };
            picker.setValue = function(newDate) {
                moment.locale(picker.options.language);
                if (!newDate) {
                    picker.unset = true;
                    set();
                } else {
                    picker.unset = false;
                }
                if (!moment.isMoment(newDate)) {
                    newDate = newDate instanceof Date ? moment(newDate) : moment(newDate, picker.format, picker.options.useStrict);
                } else {
                    newDate = newDate.locale(picker.options.language);
                }
                if (newDate.isValid()) {
                    picker.date = newDate;
                    set();
                    picker.viewDate = moment({
                        y: picker.date.year(),
                        M: picker.date.month()
                    });
                    fillDate();
                    fillTime();
                } else {
                    notifyError(newDate);
                }
            };
            picker.getDate = function() {
                if (picker.unset) {
                    return null;
                }
                return moment(picker.date);
            };
            picker.setDate = function(date) {
                var oldDate = moment(picker.date);
                if (!date) {
                    picker.setValue(null);
                } else {
                    picker.setValue(date);
                }
                notifyChange(oldDate, "function");
            };
            picker.setDisabledDates = function(dates) {
                picker.options.disabledDates = indexGivenDates(dates);
                if (picker.viewDate) {
                    update();
                }
            };
            picker.setEnabledDates = function(dates) {
                picker.options.enabledDates = indexGivenDates(dates);
                if (picker.viewDate) {
                    update();
                }
            };
            picker.setMaxDate = function(date) {
                if (date === undefined) {
                    return;
                }
                if (moment.isMoment(date) || date instanceof Date) {
                    picker.options.maxDate = moment(date);
                } else {
                    picker.options.maxDate = moment(date, picker.format, picker.options.useStrict);
                }
                if (picker.viewDate) {
                    update();
                }
            };
            picker.setMinDate = function(date) {
                if (date === undefined) {
                    return;
                }
                if (moment.isMoment(date) || date instanceof Date) {
                    picker.options.minDate = moment(date);
                } else {
                    picker.options.minDate = moment(date, picker.format, picker.options.useStrict);
                }
                if (picker.viewDate) {
                    update();
                }
            };
            init();
        };
        $.fn.datetimepicker = function(options) {
            return this.each(function() {
                var $this = $(this), data = $this.data("DateTimePicker");
                if (!data) {
                    $this.data("DateTimePicker", new DateTimePicker(this, options));
                }
            });
        };
        $.fn.datetimepicker.defaults = {
            format: false,
            pickDate: true,
            pickTime: true,
            useMinutes: true,
            useSeconds: false,
            useCurrent: true,
            calendarWeeks: false,
            minuteStepping: 1,
            minDate: moment({
                y: 1900
            }),
            maxDate: moment().add(100, "y"),
            showToday: true,
            collapse: true,
            language: moment.locale(),
            defaultDate: "",
            disabledDates: false,
            enabledDates: false,
            icons: {},
            useStrict: false,
            direction: "auto",
            sideBySide: false,
            daysOfWeekDisabled: [],
            widgetParent: false
        };
    });
});

define("dist/js/1.0.0/depends/bootstrap/moment.min-debug", [], function(require, exports, module) {
    //! moment.js
    //! version : 2.10.6
    //! authors : Tim Wood, Iskren Chernev, Moment.js contributors
    //! license : MIT
    //! momentjs.com
    !function(a, b) {
        "object" == typeof exports && "undefined" != typeof module ? module.exports = b() : "function" == typeof define && define.amd ? define(b) : a.moment = b();
    }(this, function() {
        "use strict";
        function a() {
            return Hc.apply(null, arguments);
        }
        function b(a) {
            Hc = a;
        }
        function c(a) {
            return "[object Array]" === Object.prototype.toString.call(a);
        }
        function d(a) {
            return a instanceof Date || "[object Date]" === Object.prototype.toString.call(a);
        }
        function e(a, b) {
            var c, d = [];
            for (c = 0; c < a.length; ++c) d.push(b(a[c], c));
            return d;
        }
        function f(a, b) {
            return Object.prototype.hasOwnProperty.call(a, b);
        }
        function g(a, b) {
            for (var c in b) f(b, c) && (a[c] = b[c]);
            return f(b, "toString") && (a.toString = b.toString), f(b, "valueOf") && (a.valueOf = b.valueOf), 
            a;
        }
        function h(a, b, c, d) {
            return Ca(a, b, c, d, !0).utc();
        }
        function i() {
            return {
                empty: !1,
                unusedTokens: [],
                unusedInput: [],
                overflow: -2,
                charsLeftOver: 0,
                nullInput: !1,
                invalidMonth: null,
                invalidFormat: !1,
                userInvalidated: !1,
                iso: !1
            };
        }
        function j(a) {
            return null == a._pf && (a._pf = i()), a._pf;
        }
        function k(a) {
            if (null == a._isValid) {
                var b = j(a);
                a._isValid = !(isNaN(a._d.getTime()) || !(b.overflow < 0) || b.empty || b.invalidMonth || b.invalidWeekday || b.nullInput || b.invalidFormat || b.userInvalidated), 
                a._strict && (a._isValid = a._isValid && 0 === b.charsLeftOver && 0 === b.unusedTokens.length && void 0 === b.bigHour);
            }
            return a._isValid;
        }
        function l(a) {
            var b = h(NaN);
            return null != a ? g(j(b), a) : j(b).userInvalidated = !0, b;
        }
        function m(a, b) {
            var c, d, e;
            if ("undefined" != typeof b._isAMomentObject && (a._isAMomentObject = b._isAMomentObject), 
            "undefined" != typeof b._i && (a._i = b._i), "undefined" != typeof b._f && (a._f = b._f), 
            "undefined" != typeof b._l && (a._l = b._l), "undefined" != typeof b._strict && (a._strict = b._strict), 
            "undefined" != typeof b._tzm && (a._tzm = b._tzm), "undefined" != typeof b._isUTC && (a._isUTC = b._isUTC), 
            "undefined" != typeof b._offset && (a._offset = b._offset), "undefined" != typeof b._pf && (a._pf = j(b)), 
            "undefined" != typeof b._locale && (a._locale = b._locale), Jc.length > 0) for (c in Jc) d = Jc[c], 
            e = b[d], "undefined" != typeof e && (a[d] = e);
            return a;
        }
        function n(b) {
            m(this, b), this._d = new Date(null != b._d ? b._d.getTime() : NaN), Kc === !1 && (Kc = !0, 
            a.updateOffset(this), Kc = !1);
        }
        function o(a) {
            return a instanceof n || null != a && null != a._isAMomentObject;
        }
        function p(a) {
            return 0 > a ? Math.ceil(a) : Math.floor(a);
        }
        function q(a) {
            var b = +a, c = 0;
            return 0 !== b && isFinite(b) && (c = p(b)), c;
        }
        function r(a, b, c) {
            var d, e = Math.min(a.length, b.length), f = Math.abs(a.length - b.length), g = 0;
            for (d = 0; e > d; d++) (c && a[d] !== b[d] || !c && q(a[d]) !== q(b[d])) && g++;
            return g + f;
        }
        function s() {}
        function t(a) {
            return a ? a.toLowerCase().replace("_", "-") : a;
        }
        function u(a) {
            for (var b, c, d, e, f = 0; f < a.length; ) {
                for (e = t(a[f]).split("-"), b = e.length, c = t(a[f + 1]), c = c ? c.split("-") : null; b > 0; ) {
                    if (d = v(e.slice(0, b).join("-"))) return d;
                    if (c && c.length >= b && r(e, c, !0) >= b - 1) break;
                    b--;
                }
                f++;
            }
            return null;
        }
        function v(a) {
            var b = null;
            if (!Lc[a] && "undefined" != typeof module && module && module.exports) try {} catch (c) {}
            return Lc[a];
        }
        function w(a, b) {
            var c;
            return a && (c = "undefined" == typeof b ? y(a) : x(a, b), c && (Ic = c)), Ic._abbr;
        }
        function x(a, b) {
            return null !== b ? (b.abbr = a, Lc[a] = Lc[a] || new s(), Lc[a].set(b), w(a), Lc[a]) : (delete Lc[a], 
            null);
        }
        function y(a) {
            var b;
            if (a && a._locale && a._locale._abbr && (a = a._locale._abbr), !a) return Ic;
            if (!c(a)) {
                if (b = v(a)) return b;
                a = [ a ];
            }
            return u(a);
        }
        function z(a, b) {
            var c = a.toLowerCase();
            Mc[c] = Mc[c + "s"] = Mc[b] = a;
        }
        function A(a) {
            return "string" == typeof a ? Mc[a] || Mc[a.toLowerCase()] : void 0;
        }
        function B(a) {
            var b, c, d = {};
            for (c in a) f(a, c) && (b = A(c), b && (d[b] = a[c]));
            return d;
        }
        function C(b, c) {
            return function(d) {
                return null != d ? (E(this, b, d), a.updateOffset(this, c), this) : D(this, b);
            };
        }
        function D(a, b) {
            return a._d["get" + (a._isUTC ? "UTC" : "") + b]();
        }
        function E(a, b, c) {
            return a._d["set" + (a._isUTC ? "UTC" : "") + b](c);
        }
        function F(a, b) {
            var c;
            if ("object" == typeof a) for (c in a) this.set(c, a[c]); else if (a = A(a), "function" == typeof this[a]) return this[a](b);
            return this;
        }
        function G(a, b, c) {
            var d = "" + Math.abs(a), e = b - d.length, f = a >= 0;
            return (f ? c ? "+" : "" : "-") + Math.pow(10, Math.max(0, e)).toString().substr(1) + d;
        }
        function H(a, b, c, d) {
            var e = d;
            "string" == typeof d && (e = function() {
                return this[d]();
            }), a && (Qc[a] = e), b && (Qc[b[0]] = function() {
                return G(e.apply(this, arguments), b[1], b[2]);
            }), c && (Qc[c] = function() {
                return this.localeData().ordinal(e.apply(this, arguments), a);
            });
        }
        function I(a) {
            return a.match(/\[[\s\S]/) ? a.replace(/^\[|\]$/g, "") : a.replace(/\\/g, "");
        }
        function J(a) {
            var b, c, d = a.match(Nc);
            for (b = 0, c = d.length; c > b; b++) Qc[d[b]] ? d[b] = Qc[d[b]] : d[b] = I(d[b]);
            return function(e) {
                var f = "";
                for (b = 0; c > b; b++) f += d[b] instanceof Function ? d[b].call(e, a) : d[b];
                return f;
            };
        }
        function K(a, b) {
            return a.isValid() ? (b = L(b, a.localeData()), Pc[b] = Pc[b] || J(b), Pc[b](a)) : a.localeData().invalidDate();
        }
        function L(a, b) {
            function c(a) {
                return b.longDateFormat(a) || a;
            }
            var d = 5;
            for (Oc.lastIndex = 0; d >= 0 && Oc.test(a); ) a = a.replace(Oc, c), Oc.lastIndex = 0, 
            d -= 1;
            return a;
        }
        function M(a) {
            return "function" == typeof a && "[object Function]" === Object.prototype.toString.call(a);
        }
        function N(a, b, c) {
            dd[a] = M(b) ? b : function(a) {
                return a && c ? c : b;
            };
        }
        function O(a, b) {
            return f(dd, a) ? dd[a](b._strict, b._locale) : new RegExp(P(a));
        }
        function P(a) {
            return a.replace("\\", "").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function(a, b, c, d, e) {
                return b || c || d || e;
            }).replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
        }
        function Q(a, b) {
            var c, d = b;
            for ("string" == typeof a && (a = [ a ]), "number" == typeof b && (d = function(a, c) {
                c[b] = q(a);
            }), c = 0; c < a.length; c++) ed[a[c]] = d;
        }
        function R(a, b) {
            Q(a, function(a, c, d, e) {
                d._w = d._w || {}, b(a, d._w, d, e);
            });
        }
        function S(a, b, c) {
            null != b && f(ed, a) && ed[a](b, c._a, c, a);
        }
        function T(a, b) {
            return new Date(Date.UTC(a, b + 1, 0)).getUTCDate();
        }
        function U(a) {
            return this._months[a.month()];
        }
        function V(a) {
            return this._monthsShort[a.month()];
        }
        function W(a, b, c) {
            var d, e, f;
            for (this._monthsParse || (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = []), 
            d = 0; 12 > d; d++) {
                if (e = h([ 2e3, d ]), c && !this._longMonthsParse[d] && (this._longMonthsParse[d] = new RegExp("^" + this.months(e, "").replace(".", "") + "$", "i"), 
                this._shortMonthsParse[d] = new RegExp("^" + this.monthsShort(e, "").replace(".", "") + "$", "i")), 
                c || this._monthsParse[d] || (f = "^" + this.months(e, "") + "|^" + this.monthsShort(e, ""), 
                this._monthsParse[d] = new RegExp(f.replace(".", ""), "i")), c && "MMMM" === b && this._longMonthsParse[d].test(a)) return d;
                if (c && "MMM" === b && this._shortMonthsParse[d].test(a)) return d;
                if (!c && this._monthsParse[d].test(a)) return d;
            }
        }
        function X(a, b) {
            var c;
            return "string" == typeof b && (b = a.localeData().monthsParse(b), "number" != typeof b) ? a : (c = Math.min(a.date(), T(a.year(), b)), 
            a._d["set" + (a._isUTC ? "UTC" : "") + "Month"](b, c), a);
        }
        function Y(b) {
            return null != b ? (X(this, b), a.updateOffset(this, !0), this) : D(this, "Month");
        }
        function Z() {
            return T(this.year(), this.month());
        }
        function $(a) {
            var b, c = a._a;
            return c && -2 === j(a).overflow && (b = c[gd] < 0 || c[gd] > 11 ? gd : c[hd] < 1 || c[hd] > T(c[fd], c[gd]) ? hd : c[id] < 0 || c[id] > 24 || 24 === c[id] && (0 !== c[jd] || 0 !== c[kd] || 0 !== c[ld]) ? id : c[jd] < 0 || c[jd] > 59 ? jd : c[kd] < 0 || c[kd] > 59 ? kd : c[ld] < 0 || c[ld] > 999 ? ld : -1, 
            j(a)._overflowDayOfYear && (fd > b || b > hd) && (b = hd), j(a).overflow = b), a;
        }
        function _(b) {
            a.suppressDeprecationWarnings === !1 && "undefined" != typeof console && console.warn && console.warn("Deprecation warning: " + b);
        }
        function aa(a, b) {
            var c = !0;
            return g(function() {
                return c && (_(a + "\n" + new Error().stack), c = !1), b.apply(this, arguments);
            }, b);
        }
        function ba(a, b) {
            od[a] || (_(b), od[a] = !0);
        }
        function ca(a) {
            var b, c, d = a._i, e = pd.exec(d);
            if (e) {
                for (j(a).iso = !0, b = 0, c = qd.length; c > b; b++) if (qd[b][1].exec(d)) {
                    a._f = qd[b][0];
                    break;
                }
                for (b = 0, c = rd.length; c > b; b++) if (rd[b][1].exec(d)) {
                    a._f += (e[6] || " ") + rd[b][0];
                    break;
                }
                d.match(ad) && (a._f += "Z"), va(a);
            } else a._isValid = !1;
        }
        function da(b) {
            var c = sd.exec(b._i);
            return null !== c ? void (b._d = new Date(+c[1])) : (ca(b), void (b._isValid === !1 && (delete b._isValid, 
            a.createFromInputFallback(b))));
        }
        function ea(a, b, c, d, e, f, g) {
            var h = new Date(a, b, c, d, e, f, g);
            return 1970 > a && h.setFullYear(a), h;
        }
        function fa(a) {
            var b = new Date(Date.UTC.apply(null, arguments));
            return 1970 > a && b.setUTCFullYear(a), b;
        }
        function ga(a) {
            return ha(a) ? 366 : 365;
        }
        function ha(a) {
            return a % 4 === 0 && a % 100 !== 0 || a % 400 === 0;
        }
        function ia() {
            return ha(this.year());
        }
        function ja(a, b, c) {
            var d, e = c - b, f = c - a.day();
            return f > e && (f -= 7), e - 7 > f && (f += 7), d = Da(a).add(f, "d"), {
                week: Math.ceil(d.dayOfYear() / 7),
                year: d.year()
            };
        }
        function ka(a) {
            return ja(a, this._week.dow, this._week.doy).week;
        }
        function la() {
            return this._week.dow;
        }
        function ma() {
            return this._week.doy;
        }
        function na(a) {
            var b = this.localeData().week(this);
            return null == a ? b : this.add(7 * (a - b), "d");
        }
        function oa(a) {
            var b = ja(this, 1, 4).week;
            return null == a ? b : this.add(7 * (a - b), "d");
        }
        function pa(a, b, c, d, e) {
            var f, g = 6 + e - d, h = fa(a, 0, 1 + g), i = h.getUTCDay();
            return e > i && (i += 7), c = null != c ? 1 * c : e, f = 1 + g + 7 * (b - 1) - i + c, 
            {
                year: f > 0 ? a : a - 1,
                dayOfYear: f > 0 ? f : ga(a - 1) + f
            };
        }
        function qa(a) {
            var b = Math.round((this.clone().startOf("day") - this.clone().startOf("year")) / 864e5) + 1;
            return null == a ? b : this.add(a - b, "d");
        }
        function ra(a, b, c) {
            return null != a ? a : null != b ? b : c;
        }
        function sa(a) {
            var b = new Date();
            return a._useUTC ? [ b.getUTCFullYear(), b.getUTCMonth(), b.getUTCDate() ] : [ b.getFullYear(), b.getMonth(), b.getDate() ];
        }
        function ta(a) {
            var b, c, d, e, f = [];
            if (!a._d) {
                for (d = sa(a), a._w && null == a._a[hd] && null == a._a[gd] && ua(a), a._dayOfYear && (e = ra(a._a[fd], d[fd]), 
                a._dayOfYear > ga(e) && (j(a)._overflowDayOfYear = !0), c = fa(e, 0, a._dayOfYear), 
                a._a[gd] = c.getUTCMonth(), a._a[hd] = c.getUTCDate()), b = 0; 3 > b && null == a._a[b]; ++b) a._a[b] = f[b] = d[b];
                for (;7 > b; b++) a._a[b] = f[b] = null == a._a[b] ? 2 === b ? 1 : 0 : a._a[b];
                24 === a._a[id] && 0 === a._a[jd] && 0 === a._a[kd] && 0 === a._a[ld] && (a._nextDay = !0, 
                a._a[id] = 0), a._d = (a._useUTC ? fa : ea).apply(null, f), null != a._tzm && a._d.setUTCMinutes(a._d.getUTCMinutes() - a._tzm), 
                a._nextDay && (a._a[id] = 24);
            }
        }
        function ua(a) {
            var b, c, d, e, f, g, h;
            b = a._w, null != b.GG || null != b.W || null != b.E ? (f = 1, g = 4, c = ra(b.GG, a._a[fd], ja(Da(), 1, 4).year), 
            d = ra(b.W, 1), e = ra(b.E, 1)) : (f = a._locale._week.dow, g = a._locale._week.doy, 
            c = ra(b.gg, a._a[fd], ja(Da(), f, g).year), d = ra(b.w, 1), null != b.d ? (e = b.d, 
            f > e && ++d) : e = null != b.e ? b.e + f : f), h = pa(c, d, e, g, f), a._a[fd] = h.year, 
            a._dayOfYear = h.dayOfYear;
        }
        function va(b) {
            if (b._f === a.ISO_8601) return void ca(b);
            b._a = [], j(b).empty = !0;
            var c, d, e, f, g, h = "" + b._i, i = h.length, k = 0;
            for (e = L(b._f, b._locale).match(Nc) || [], c = 0; c < e.length; c++) f = e[c], 
            d = (h.match(O(f, b)) || [])[0], d && (g = h.substr(0, h.indexOf(d)), g.length > 0 && j(b).unusedInput.push(g), 
            h = h.slice(h.indexOf(d) + d.length), k += d.length), Qc[f] ? (d ? j(b).empty = !1 : j(b).unusedTokens.push(f), 
            S(f, d, b)) : b._strict && !d && j(b).unusedTokens.push(f);
            j(b).charsLeftOver = i - k, h.length > 0 && j(b).unusedInput.push(h), j(b).bigHour === !0 && b._a[id] <= 12 && b._a[id] > 0 && (j(b).bigHour = void 0), 
            b._a[id] = wa(b._locale, b._a[id], b._meridiem), ta(b), $(b);
        }
        function wa(a, b, c) {
            var d;
            return null == c ? b : null != a.meridiemHour ? a.meridiemHour(b, c) : null != a.isPM ? (d = a.isPM(c), 
            d && 12 > b && (b += 12), d || 12 !== b || (b = 0), b) : b;
        }
        function xa(a) {
            var b, c, d, e, f;
            if (0 === a._f.length) return j(a).invalidFormat = !0, void (a._d = new Date(NaN));
            for (e = 0; e < a._f.length; e++) f = 0, b = m({}, a), null != a._useUTC && (b._useUTC = a._useUTC), 
            b._f = a._f[e], va(b), k(b) && (f += j(b).charsLeftOver, f += 10 * j(b).unusedTokens.length, 
            j(b).score = f, (null == d || d > f) && (d = f, c = b));
            g(a, c || b);
        }
        function ya(a) {
            if (!a._d) {
                var b = B(a._i);
                a._a = [ b.year, b.month, b.day || b.date, b.hour, b.minute, b.second, b.millisecond ], 
                ta(a);
            }
        }
        function za(a) {
            var b = new n($(Aa(a)));
            return b._nextDay && (b.add(1, "d"), b._nextDay = void 0), b;
        }
        function Aa(a) {
            var b = a._i, e = a._f;
            return a._locale = a._locale || y(a._l), null === b || void 0 === e && "" === b ? l({
                nullInput: !0
            }) : ("string" == typeof b && (a._i = b = a._locale.preparse(b)), o(b) ? new n($(b)) : (c(e) ? xa(a) : e ? va(a) : d(b) ? a._d = b : Ba(a), 
            a));
        }
        function Ba(b) {
            var f = b._i;
            void 0 === f ? b._d = new Date() : d(f) ? b._d = new Date(+f) : "string" == typeof f ? da(b) : c(f) ? (b._a = e(f.slice(0), function(a) {
                return parseInt(a, 10);
            }), ta(b)) : "object" == typeof f ? ya(b) : "number" == typeof f ? b._d = new Date(f) : a.createFromInputFallback(b);
        }
        function Ca(a, b, c, d, e) {
            var f = {};
            return "boolean" == typeof c && (d = c, c = void 0), f._isAMomentObject = !0, f._useUTC = f._isUTC = e, 
            f._l = c, f._i = a, f._f = b, f._strict = d, za(f);
        }
        function Da(a, b, c, d) {
            return Ca(a, b, c, d, !1);
        }
        function Ea(a, b) {
            var d, e;
            if (1 === b.length && c(b[0]) && (b = b[0]), !b.length) return Da();
            for (d = b[0], e = 1; e < b.length; ++e) (!b[e].isValid() || b[e][a](d)) && (d = b[e]);
            return d;
        }
        function Fa() {
            var a = [].slice.call(arguments, 0);
            return Ea("isBefore", a);
        }
        function Ga() {
            var a = [].slice.call(arguments, 0);
            return Ea("isAfter", a);
        }
        function Ha(a) {
            var b = B(a), c = b.year || 0, d = b.quarter || 0, e = b.month || 0, f = b.week || 0, g = b.day || 0, h = b.hour || 0, i = b.minute || 0, j = b.second || 0, k = b.millisecond || 0;
            this._milliseconds = +k + 1e3 * j + 6e4 * i + 36e5 * h, this._days = +g + 7 * f, 
            this._months = +e + 3 * d + 12 * c, this._data = {}, this._locale = y(), this._bubble();
        }
        function Ia(a) {
            return a instanceof Ha;
        }
        function Ja(a, b) {
            H(a, 0, 0, function() {
                var a = this.utcOffset(), c = "+";
                return 0 > a && (a = -a, c = "-"), c + G(~~(a / 60), 2) + b + G(~~a % 60, 2);
            });
        }
        function Ka(a) {
            var b = (a || "").match(ad) || [], c = b[b.length - 1] || [], d = (c + "").match(xd) || [ "-", 0, 0 ], e = +(60 * d[1]) + q(d[2]);
            return "+" === d[0] ? e : -e;
        }
        function La(b, c) {
            var e, f;
            return c._isUTC ? (e = c.clone(), f = (o(b) || d(b) ? +b : +Da(b)) - +e, e._d.setTime(+e._d + f), 
            a.updateOffset(e, !1), e) : Da(b).local();
        }
        function Ma(a) {
            return 15 * -Math.round(a._d.getTimezoneOffset() / 15);
        }
        function Na(b, c) {
            var d, e = this._offset || 0;
            return null != b ? ("string" == typeof b && (b = Ka(b)), Math.abs(b) < 16 && (b = 60 * b), 
            !this._isUTC && c && (d = Ma(this)), this._offset = b, this._isUTC = !0, null != d && this.add(d, "m"), 
            e !== b && (!c || this._changeInProgress ? bb(this, Ya(b - e, "m"), 1, !1) : this._changeInProgress || (this._changeInProgress = !0, 
            a.updateOffset(this, !0), this._changeInProgress = null)), this) : this._isUTC ? e : Ma(this);
        }
        function Oa(a, b) {
            return null != a ? ("string" != typeof a && (a = -a), this.utcOffset(a, b), this) : -this.utcOffset();
        }
        function Pa(a) {
            return this.utcOffset(0, a);
        }
        function Qa(a) {
            return this._isUTC && (this.utcOffset(0, a), this._isUTC = !1, a && this.subtract(Ma(this), "m")), 
            this;
        }
        function Ra() {
            return this._tzm ? this.utcOffset(this._tzm) : "string" == typeof this._i && this.utcOffset(Ka(this._i)), 
            this;
        }
        function Sa(a) {
            return a = a ? Da(a).utcOffset() : 0, (this.utcOffset() - a) % 60 === 0;
        }
        function Ta() {
            return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset();
        }
        function Ua() {
            if ("undefined" != typeof this._isDSTShifted) return this._isDSTShifted;
            var a = {};
            if (m(a, this), a = Aa(a), a._a) {
                var b = a._isUTC ? h(a._a) : Da(a._a);
                this._isDSTShifted = this.isValid() && r(a._a, b.toArray()) > 0;
            } else this._isDSTShifted = !1;
            return this._isDSTShifted;
        }
        function Va() {
            return !this._isUTC;
        }
        function Wa() {
            return this._isUTC;
        }
        function Xa() {
            return this._isUTC && 0 === this._offset;
        }
        function Ya(a, b) {
            var c, d, e, g = a, h = null;
            return Ia(a) ? g = {
                ms: a._milliseconds,
                d: a._days,
                M: a._months
            } : "number" == typeof a ? (g = {}, b ? g[b] = a : g.milliseconds = a) : (h = yd.exec(a)) ? (c = "-" === h[1] ? -1 : 1, 
            g = {
                y: 0,
                d: q(h[hd]) * c,
                h: q(h[id]) * c,
                m: q(h[jd]) * c,
                s: q(h[kd]) * c,
                ms: q(h[ld]) * c
            }) : (h = zd.exec(a)) ? (c = "-" === h[1] ? -1 : 1, g = {
                y: Za(h[2], c),
                M: Za(h[3], c),
                d: Za(h[4], c),
                h: Za(h[5], c),
                m: Za(h[6], c),
                s: Za(h[7], c),
                w: Za(h[8], c)
            }) : null == g ? g = {} : "object" == typeof g && ("from" in g || "to" in g) && (e = _a(Da(g.from), Da(g.to)), 
            g = {}, g.ms = e.milliseconds, g.M = e.months), d = new Ha(g), Ia(a) && f(a, "_locale") && (d._locale = a._locale), 
            d;
        }
        function Za(a, b) {
            var c = a && parseFloat(a.replace(",", "."));
            return (isNaN(c) ? 0 : c) * b;
        }
        function $a(a, b) {
            var c = {
                milliseconds: 0,
                months: 0
            };
            return c.months = b.month() - a.month() + 12 * (b.year() - a.year()), a.clone().add(c.months, "M").isAfter(b) && --c.months, 
            c.milliseconds = +b - +a.clone().add(c.months, "M"), c;
        }
        function _a(a, b) {
            var c;
            return b = La(b, a), a.isBefore(b) ? c = $a(a, b) : (c = $a(b, a), c.milliseconds = -c.milliseconds, 
            c.months = -c.months), c;
        }
        function ab(a, b) {
            return function(c, d) {
                var e, f;
                return null === d || isNaN(+d) || (ba(b, "moment()." + b + "(period, number) is deprecated. Please use moment()." + b + "(number, period)."), 
                f = c, c = d, d = f), c = "string" == typeof c ? +c : c, e = Ya(c, d), bb(this, e, a), 
                this;
            };
        }
        function bb(b, c, d, e) {
            var f = c._milliseconds, g = c._days, h = c._months;
            e = null == e ? !0 : e, f && b._d.setTime(+b._d + f * d), g && E(b, "Date", D(b, "Date") + g * d), 
            h && X(b, D(b, "Month") + h * d), e && a.updateOffset(b, g || h);
        }
        function cb(a, b) {
            var c = a || Da(), d = La(c, this).startOf("day"), e = this.diff(d, "days", !0), f = -6 > e ? "sameElse" : -1 > e ? "lastWeek" : 0 > e ? "lastDay" : 1 > e ? "sameDay" : 2 > e ? "nextDay" : 7 > e ? "nextWeek" : "sameElse";
            return this.format(b && b[f] || this.localeData().calendar(f, this, Da(c)));
        }
        function db() {
            return new n(this);
        }
        function eb(a, b) {
            var c;
            return b = A("undefined" != typeof b ? b : "millisecond"), "millisecond" === b ? (a = o(a) ? a : Da(a), 
            +this > +a) : (c = o(a) ? +a : +Da(a), c < +this.clone().startOf(b));
        }
        function fb(a, b) {
            var c;
            return b = A("undefined" != typeof b ? b : "millisecond"), "millisecond" === b ? (a = o(a) ? a : Da(a), 
            +a > +this) : (c = o(a) ? +a : +Da(a), +this.clone().endOf(b) < c);
        }
        function gb(a, b, c) {
            return this.isAfter(a, c) && this.isBefore(b, c);
        }
        function hb(a, b) {
            var c;
            return b = A(b || "millisecond"), "millisecond" === b ? (a = o(a) ? a : Da(a), +this === +a) : (c = +Da(a), 
            +this.clone().startOf(b) <= c && c <= +this.clone().endOf(b));
        }
        function ib(a, b, c) {
            var d, e, f = La(a, this), g = 6e4 * (f.utcOffset() - this.utcOffset());
            return b = A(b), "year" === b || "month" === b || "quarter" === b ? (e = jb(this, f), 
            "quarter" === b ? e /= 3 : "year" === b && (e /= 12)) : (d = this - f, e = "second" === b ? d / 1e3 : "minute" === b ? d / 6e4 : "hour" === b ? d / 36e5 : "day" === b ? (d - g) / 864e5 : "week" === b ? (d - g) / 6048e5 : d), 
            c ? e : p(e);
        }
        function jb(a, b) {
            var c, d, e = 12 * (b.year() - a.year()) + (b.month() - a.month()), f = a.clone().add(e, "months");
            return 0 > b - f ? (c = a.clone().add(e - 1, "months"), d = (b - f) / (f - c)) : (c = a.clone().add(e + 1, "months"), 
            d = (b - f) / (c - f)), -(e + d);
        }
        function kb() {
            return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
        }
        function lb() {
            var a = this.clone().utc();
            return 0 < a.year() && a.year() <= 9999 ? "function" == typeof Date.prototype.toISOString ? this.toDate().toISOString() : K(a, "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]") : K(a, "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]");
        }
        function mb(b) {
            var c = K(this, b || a.defaultFormat);
            return this.localeData().postformat(c);
        }
        function nb(a, b) {
            return this.isValid() ? Ya({
                to: this,
                from: a
            }).locale(this.locale()).humanize(!b) : this.localeData().invalidDate();
        }
        function ob(a) {
            return this.from(Da(), a);
        }
        function pb(a, b) {
            return this.isValid() ? Ya({
                from: this,
                to: a
            }).locale(this.locale()).humanize(!b) : this.localeData().invalidDate();
        }
        function qb(a) {
            return this.to(Da(), a);
        }
        function rb(a) {
            var b;
            return void 0 === a ? this._locale._abbr : (b = y(a), null != b && (this._locale = b), 
            this);
        }
        function sb() {
            return this._locale;
        }
        function tb(a) {
            switch (a = A(a)) {
              case "year":
                this.month(0);

              case "quarter":
              case "month":
                this.date(1);

              case "week":
              case "isoWeek":
              case "day":
                this.hours(0);

              case "hour":
                this.minutes(0);

              case "minute":
                this.seconds(0);

              case "second":
                this.milliseconds(0);
            }
            return "week" === a && this.weekday(0), "isoWeek" === a && this.isoWeekday(1), "quarter" === a && this.month(3 * Math.floor(this.month() / 3)), 
            this;
        }
        function ub(a) {
            return a = A(a), void 0 === a || "millisecond" === a ? this : this.startOf(a).add(1, "isoWeek" === a ? "week" : a).subtract(1, "ms");
        }
        function vb() {
            return +this._d - 6e4 * (this._offset || 0);
        }
        function wb() {
            return Math.floor(+this / 1e3);
        }
        function xb() {
            return this._offset ? new Date(+this) : this._d;
        }
        function yb() {
            var a = this;
            return [ a.year(), a.month(), a.date(), a.hour(), a.minute(), a.second(), a.millisecond() ];
        }
        function zb() {
            var a = this;
            return {
                years: a.year(),
                months: a.month(),
                date: a.date(),
                hours: a.hours(),
                minutes: a.minutes(),
                seconds: a.seconds(),
                milliseconds: a.milliseconds()
            };
        }
        function Ab() {
            return k(this);
        }
        function Bb() {
            return g({}, j(this));
        }
        function Cb() {
            return j(this).overflow;
        }
        function Db(a, b) {
            H(0, [ a, a.length ], 0, b);
        }
        function Eb(a, b, c) {
            return ja(Da([ a, 11, 31 + b - c ]), b, c).week;
        }
        function Fb(a) {
            var b = ja(this, this.localeData()._week.dow, this.localeData()._week.doy).year;
            return null == a ? b : this.add(a - b, "y");
        }
        function Gb(a) {
            var b = ja(this, 1, 4).year;
            return null == a ? b : this.add(a - b, "y");
        }
        function Hb() {
            return Eb(this.year(), 1, 4);
        }
        function Ib() {
            var a = this.localeData()._week;
            return Eb(this.year(), a.dow, a.doy);
        }
        function Jb(a) {
            return null == a ? Math.ceil((this.month() + 1) / 3) : this.month(3 * (a - 1) + this.month() % 3);
        }
        function Kb(a, b) {
            return "string" != typeof a ? a : isNaN(a) ? (a = b.weekdaysParse(a), "number" == typeof a ? a : null) : parseInt(a, 10);
        }
        function Lb(a) {
            return this._weekdays[a.day()];
        }
        function Mb(a) {
            return this._weekdaysShort[a.day()];
        }
        function Nb(a) {
            return this._weekdaysMin[a.day()];
        }
        function Ob(a) {
            var b, c, d;
            for (this._weekdaysParse = this._weekdaysParse || [], b = 0; 7 > b; b++) if (this._weekdaysParse[b] || (c = Da([ 2e3, 1 ]).day(b), 
            d = "^" + this.weekdays(c, "") + "|^" + this.weekdaysShort(c, "") + "|^" + this.weekdaysMin(c, ""), 
            this._weekdaysParse[b] = new RegExp(d.replace(".", ""), "i")), this._weekdaysParse[b].test(a)) return b;
        }
        function Pb(a) {
            var b = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
            return null != a ? (a = Kb(a, this.localeData()), this.add(a - b, "d")) : b;
        }
        function Qb(a) {
            var b = (this.day() + 7 - this.localeData()._week.dow) % 7;
            return null == a ? b : this.add(a - b, "d");
        }
        function Rb(a) {
            return null == a ? this.day() || 7 : this.day(this.day() % 7 ? a : a - 7);
        }
        function Sb(a, b) {
            H(a, 0, 0, function() {
                return this.localeData().meridiem(this.hours(), this.minutes(), b);
            });
        }
        function Tb(a, b) {
            return b._meridiemParse;
        }
        function Ub(a) {
            return "p" === (a + "").toLowerCase().charAt(0);
        }
        function Vb(a, b, c) {
            return a > 11 ? c ? "pm" : "PM" : c ? "am" : "AM";
        }
        function Wb(a, b) {
            b[ld] = q(1e3 * ("0." + a));
        }
        function Xb() {
            return this._isUTC ? "UTC" : "";
        }
        function Yb() {
            return this._isUTC ? "Coordinated Universal Time" : "";
        }
        function Zb(a) {
            return Da(1e3 * a);
        }
        function $b() {
            return Da.apply(null, arguments).parseZone();
        }
        function _b(a, b, c) {
            var d = this._calendar[a];
            return "function" == typeof d ? d.call(b, c) : d;
        }
        function ac(a) {
            var b = this._longDateFormat[a], c = this._longDateFormat[a.toUpperCase()];
            return b || !c ? b : (this._longDateFormat[a] = c.replace(/MMMM|MM|DD|dddd/g, function(a) {
                return a.slice(1);
            }), this._longDateFormat[a]);
        }
        function bc() {
            return this._invalidDate;
        }
        function cc(a) {
            return this._ordinal.replace("%d", a);
        }
        function dc(a) {
            return a;
        }
        function ec(a, b, c, d) {
            var e = this._relativeTime[c];
            return "function" == typeof e ? e(a, b, c, d) : e.replace(/%d/i, a);
        }
        function fc(a, b) {
            var c = this._relativeTime[a > 0 ? "future" : "past"];
            return "function" == typeof c ? c(b) : c.replace(/%s/i, b);
        }
        function gc(a) {
            var b, c;
            for (c in a) b = a[c], "function" == typeof b ? this[c] = b : this["_" + c] = b;
            this._ordinalParseLenient = new RegExp(this._ordinalParse.source + "|" + /\d{1,2}/.source);
        }
        function hc(a, b, c, d) {
            var e = y(), f = h().set(d, b);
            return e[c](f, a);
        }
        function ic(a, b, c, d, e) {
            if ("number" == typeof a && (b = a, a = void 0), a = a || "", null != b) return hc(a, b, c, e);
            var f, g = [];
            for (f = 0; d > f; f++) g[f] = hc(a, f, c, e);
            return g;
        }
        function jc(a, b) {
            return ic(a, b, "months", 12, "month");
        }
        function kc(a, b) {
            return ic(a, b, "monthsShort", 12, "month");
        }
        function lc(a, b) {
            return ic(a, b, "weekdays", 7, "day");
        }
        function mc(a, b) {
            return ic(a, b, "weekdaysShort", 7, "day");
        }
        function nc(a, b) {
            return ic(a, b, "weekdaysMin", 7, "day");
        }
        function oc() {
            var a = this._data;
            return this._milliseconds = Wd(this._milliseconds), this._days = Wd(this._days), 
            this._months = Wd(this._months), a.milliseconds = Wd(a.milliseconds), a.seconds = Wd(a.seconds), 
            a.minutes = Wd(a.minutes), a.hours = Wd(a.hours), a.months = Wd(a.months), a.years = Wd(a.years), 
            this;
        }
        function pc(a, b, c, d) {
            var e = Ya(b, c);
            return a._milliseconds += d * e._milliseconds, a._days += d * e._days, a._months += d * e._months, 
            a._bubble();
        }
        function qc(a, b) {
            return pc(this, a, b, 1);
        }
        function rc(a, b) {
            return pc(this, a, b, -1);
        }
        function sc(a) {
            return 0 > a ? Math.floor(a) : Math.ceil(a);
        }
        function tc() {
            var a, b, c, d, e, f = this._milliseconds, g = this._days, h = this._months, i = this._data;
            return f >= 0 && g >= 0 && h >= 0 || 0 >= f && 0 >= g && 0 >= h || (f += 864e5 * sc(vc(h) + g), 
            g = 0, h = 0), i.milliseconds = f % 1e3, a = p(f / 1e3), i.seconds = a % 60, b = p(a / 60), 
            i.minutes = b % 60, c = p(b / 60), i.hours = c % 24, g += p(c / 24), e = p(uc(g)), 
            h += e, g -= sc(vc(e)), d = p(h / 12), h %= 12, i.days = g, i.months = h, i.years = d, 
            this;
        }
        function uc(a) {
            return 4800 * a / 146097;
        }
        function vc(a) {
            return 146097 * a / 4800;
        }
        function wc(a) {
            var b, c, d = this._milliseconds;
            if (a = A(a), "month" === a || "year" === a) return b = this._days + d / 864e5, 
            c = this._months + uc(b), "month" === a ? c : c / 12;
            switch (b = this._days + Math.round(vc(this._months)), a) {
              case "week":
                return b / 7 + d / 6048e5;

              case "day":
                return b + d / 864e5;

              case "hour":
                return 24 * b + d / 36e5;

              case "minute":
                return 1440 * b + d / 6e4;

              case "second":
                return 86400 * b + d / 1e3;

              case "millisecond":
                return Math.floor(864e5 * b) + d;

              default:
                throw new Error("Unknown unit " + a);
            }
        }
        function xc() {
            return this._milliseconds + 864e5 * this._days + this._months % 12 * 2592e6 + 31536e6 * q(this._months / 12);
        }
        function yc(a) {
            return function() {
                return this.as(a);
            };
        }
        function zc(a) {
            return a = A(a), this[a + "s"]();
        }
        function Ac(a) {
            return function() {
                return this._data[a];
            };
        }
        function Bc() {
            return p(this.days() / 7);
        }
        function Cc(a, b, c, d, e) {
            return e.relativeTime(b || 1, !!c, a, d);
        }
        function Dc(a, b, c) {
            var d = Ya(a).abs(), e = ke(d.as("s")), f = ke(d.as("m")), g = ke(d.as("h")), h = ke(d.as("d")), i = ke(d.as("M")), j = ke(d.as("y")), k = e < le.s && [ "s", e ] || 1 === f && [ "m" ] || f < le.m && [ "mm", f ] || 1 === g && [ "h" ] || g < le.h && [ "hh", g ] || 1 === h && [ "d" ] || h < le.d && [ "dd", h ] || 1 === i && [ "M" ] || i < le.M && [ "MM", i ] || 1 === j && [ "y" ] || [ "yy", j ];
            return k[2] = b, k[3] = +a > 0, k[4] = c, Cc.apply(null, k);
        }
        function Ec(a, b) {
            return void 0 === le[a] ? !1 : void 0 === b ? le[a] : (le[a] = b, !0);
        }
        function Fc(a) {
            var b = this.localeData(), c = Dc(this, !a, b);
            return a && (c = b.pastFuture(+this, c)), b.postformat(c);
        }
        function Gc() {
            var a, b, c, d = me(this._milliseconds) / 1e3, e = me(this._days), f = me(this._months);
            a = p(d / 60), b = p(a / 60), d %= 60, a %= 60, c = p(f / 12), f %= 12;
            var g = c, h = f, i = e, j = b, k = a, l = d, m = this.asSeconds();
            return m ? (0 > m ? "-" : "") + "P" + (g ? g + "Y" : "") + (h ? h + "M" : "") + (i ? i + "D" : "") + (j || k || l ? "T" : "") + (j ? j + "H" : "") + (k ? k + "M" : "") + (l ? l + "S" : "") : "P0D";
        }
        var Hc, Ic, Jc = a.momentProperties = [], Kc = !1, Lc = {}, Mc = {}, Nc = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Q|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g, Oc = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, Pc = {}, Qc = {}, Rc = /\d/, Sc = /\d\d/, Tc = /\d{3}/, Uc = /\d{4}/, Vc = /[+-]?\d{6}/, Wc = /\d\d?/, Xc = /\d{1,3}/, Yc = /\d{1,4}/, Zc = /[+-]?\d{1,6}/, $c = /\d+/, _c = /[+-]?\d+/, ad = /Z|[+-]\d\d:?\d\d/gi, bd = /[+-]?\d+(\.\d{1,3})?/, cd = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i, dd = {}, ed = {}, fd = 0, gd = 1, hd = 2, id = 3, jd = 4, kd = 5, ld = 6;
        H("M", [ "MM", 2 ], "Mo", function() {
            return this.month() + 1;
        }), H("MMM", 0, 0, function(a) {
            return this.localeData().monthsShort(this, a);
        }), H("MMMM", 0, 0, function(a) {
            return this.localeData().months(this, a);
        }), z("month", "M"), N("M", Wc), N("MM", Wc, Sc), N("MMM", cd), N("MMMM", cd), Q([ "M", "MM" ], function(a, b) {
            b[gd] = q(a) - 1;
        }), Q([ "MMM", "MMMM" ], function(a, b, c, d) {
            var e = c._locale.monthsParse(a, d, c._strict);
            null != e ? b[gd] = e : j(c).invalidMonth = a;
        });
        var md = "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), nd = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), od = {};
        a.suppressDeprecationWarnings = !1;
        var pd = /^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/, qd = [ [ "YYYYYY-MM-DD", /[+-]\d{6}-\d{2}-\d{2}/ ], [ "YYYY-MM-DD", /\d{4}-\d{2}-\d{2}/ ], [ "GGGG-[W]WW-E", /\d{4}-W\d{2}-\d/ ], [ "GGGG-[W]WW", /\d{4}-W\d{2}/ ], [ "YYYY-DDD", /\d{4}-\d{3}/ ] ], rd = [ [ "HH:mm:ss.SSSS", /(T| )\d\d:\d\d:\d\d\.\d+/ ], [ "HH:mm:ss", /(T| )\d\d:\d\d:\d\d/ ], [ "HH:mm", /(T| )\d\d:\d\d/ ], [ "HH", /(T| )\d\d/ ] ], sd = /^\/?Date\((\-?\d+)/i;
        a.createFromInputFallback = aa("moment construction falls back to js Date. This is discouraged and will be removed in upcoming major release. Please refer to https://github.com/moment/moment/issues/1407 for more info.", function(a) {
            a._d = new Date(a._i + (a._useUTC ? " UTC" : ""));
        }), H(0, [ "YY", 2 ], 0, function() {
            return this.year() % 100;
        }), H(0, [ "YYYY", 4 ], 0, "year"), H(0, [ "YYYYY", 5 ], 0, "year"), H(0, [ "YYYYYY", 6, !0 ], 0, "year"), 
        z("year", "y"), N("Y", _c), N("YY", Wc, Sc), N("YYYY", Yc, Uc), N("YYYYY", Zc, Vc), 
        N("YYYYYY", Zc, Vc), Q([ "YYYYY", "YYYYYY" ], fd), Q("YYYY", function(b, c) {
            c[fd] = 2 === b.length ? a.parseTwoDigitYear(b) : q(b);
        }), Q("YY", function(b, c) {
            c[fd] = a.parseTwoDigitYear(b);
        }), a.parseTwoDigitYear = function(a) {
            return q(a) + (q(a) > 68 ? 1900 : 2e3);
        };
        var td = C("FullYear", !1);
        H("w", [ "ww", 2 ], "wo", "week"), H("W", [ "WW", 2 ], "Wo", "isoWeek"), z("week", "w"), 
        z("isoWeek", "W"), N("w", Wc), N("ww", Wc, Sc), N("W", Wc), N("WW", Wc, Sc), R([ "w", "ww", "W", "WW" ], function(a, b, c, d) {
            b[d.substr(0, 1)] = q(a);
        });
        var ud = {
            dow: 0,
            doy: 6
        };
        H("DDD", [ "DDDD", 3 ], "DDDo", "dayOfYear"), z("dayOfYear", "DDD"), N("DDD", Xc), 
        N("DDDD", Tc), Q([ "DDD", "DDDD" ], function(a, b, c) {
            c._dayOfYear = q(a);
        }), a.ISO_8601 = function() {};
        var vd = aa("moment().min is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548", function() {
            var a = Da.apply(null, arguments);
            return this > a ? this : a;
        }), wd = aa("moment().max is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548", function() {
            var a = Da.apply(null, arguments);
            return a > this ? this : a;
        });
        Ja("Z", ":"), Ja("ZZ", ""), N("Z", ad), N("ZZ", ad), Q([ "Z", "ZZ" ], function(a, b, c) {
            c._useUTC = !0, c._tzm = Ka(a);
        });
        var xd = /([\+\-]|\d\d)/gi;
        a.updateOffset = function() {};
        var yd = /(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/, zd = /^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/;
        Ya.fn = Ha.prototype;
        var Ad = ab(1, "add"), Bd = ab(-1, "subtract");
        a.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ";
        var Cd = aa("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.", function(a) {
            return void 0 === a ? this.localeData() : this.locale(a);
        });
        H(0, [ "gg", 2 ], 0, function() {
            return this.weekYear() % 100;
        }), H(0, [ "GG", 2 ], 0, function() {
            return this.isoWeekYear() % 100;
        }), Db("gggg", "weekYear"), Db("ggggg", "weekYear"), Db("GGGG", "isoWeekYear"), 
        Db("GGGGG", "isoWeekYear"), z("weekYear", "gg"), z("isoWeekYear", "GG"), N("G", _c), 
        N("g", _c), N("GG", Wc, Sc), N("gg", Wc, Sc), N("GGGG", Yc, Uc), N("gggg", Yc, Uc), 
        N("GGGGG", Zc, Vc), N("ggggg", Zc, Vc), R([ "gggg", "ggggg", "GGGG", "GGGGG" ], function(a, b, c, d) {
            b[d.substr(0, 2)] = q(a);
        }), R([ "gg", "GG" ], function(b, c, d, e) {
            c[e] = a.parseTwoDigitYear(b);
        }), H("Q", 0, 0, "quarter"), z("quarter", "Q"), N("Q", Rc), Q("Q", function(a, b) {
            b[gd] = 3 * (q(a) - 1);
        }), H("D", [ "DD", 2 ], "Do", "date"), z("date", "D"), N("D", Wc), N("DD", Wc, Sc), 
        N("Do", function(a, b) {
            return a ? b._ordinalParse : b._ordinalParseLenient;
        }), Q([ "D", "DD" ], hd), Q("Do", function(a, b) {
            b[hd] = q(a.match(Wc)[0], 10);
        });
        var Dd = C("Date", !0);
        H("d", 0, "do", "day"), H("dd", 0, 0, function(a) {
            return this.localeData().weekdaysMin(this, a);
        }), H("ddd", 0, 0, function(a) {
            return this.localeData().weekdaysShort(this, a);
        }), H("dddd", 0, 0, function(a) {
            return this.localeData().weekdays(this, a);
        }), H("e", 0, 0, "weekday"), H("E", 0, 0, "isoWeekday"), z("day", "d"), z("weekday", "e"), 
        z("isoWeekday", "E"), N("d", Wc), N("e", Wc), N("E", Wc), N("dd", cd), N("ddd", cd), 
        N("dddd", cd), R([ "dd", "ddd", "dddd" ], function(a, b, c) {
            var d = c._locale.weekdaysParse(a);
            null != d ? b.d = d : j(c).invalidWeekday = a;
        }), R([ "d", "e", "E" ], function(a, b, c, d) {
            b[d] = q(a);
        });
        var Ed = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), Fd = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), Gd = "Su_Mo_Tu_We_Th_Fr_Sa".split("_");
        H("H", [ "HH", 2 ], 0, "hour"), H("h", [ "hh", 2 ], 0, function() {
            return this.hours() % 12 || 12;
        }), Sb("a", !0), Sb("A", !1), z("hour", "h"), N("a", Tb), N("A", Tb), N("H", Wc), 
        N("h", Wc), N("HH", Wc, Sc), N("hh", Wc, Sc), Q([ "H", "HH" ], id), Q([ "a", "A" ], function(a, b, c) {
            c._isPm = c._locale.isPM(a), c._meridiem = a;
        }), Q([ "h", "hh" ], function(a, b, c) {
            b[id] = q(a), j(c).bigHour = !0;
        });
        var Hd = /[ap]\.?m?\.?/i, Id = C("Hours", !0);
        H("m", [ "mm", 2 ], 0, "minute"), z("minute", "m"), N("m", Wc), N("mm", Wc, Sc), 
        Q([ "m", "mm" ], jd);
        var Jd = C("Minutes", !1);
        H("s", [ "ss", 2 ], 0, "second"), z("second", "s"), N("s", Wc), N("ss", Wc, Sc), 
        Q([ "s", "ss" ], kd);
        var Kd = C("Seconds", !1);
        H("S", 0, 0, function() {
            return ~~(this.millisecond() / 100);
        }), H(0, [ "SS", 2 ], 0, function() {
            return ~~(this.millisecond() / 10);
        }), H(0, [ "SSS", 3 ], 0, "millisecond"), H(0, [ "SSSS", 4 ], 0, function() {
            return 10 * this.millisecond();
        }), H(0, [ "SSSSS", 5 ], 0, function() {
            return 100 * this.millisecond();
        }), H(0, [ "SSSSSS", 6 ], 0, function() {
            return 1e3 * this.millisecond();
        }), H(0, [ "SSSSSSS", 7 ], 0, function() {
            return 1e4 * this.millisecond();
        }), H(0, [ "SSSSSSSS", 8 ], 0, function() {
            return 1e5 * this.millisecond();
        }), H(0, [ "SSSSSSSSS", 9 ], 0, function() {
            return 1e6 * this.millisecond();
        }), z("millisecond", "ms"), N("S", Xc, Rc), N("SS", Xc, Sc), N("SSS", Xc, Tc);
        var Ld;
        for (Ld = "SSSS"; Ld.length <= 9; Ld += "S") N(Ld, $c);
        for (Ld = "S"; Ld.length <= 9; Ld += "S") Q(Ld, Wb);
        var Md = C("Milliseconds", !1);
        H("z", 0, 0, "zoneAbbr"), H("zz", 0, 0, "zoneName");
        var Nd = n.prototype;
        Nd.add = Ad, Nd.calendar = cb, Nd.clone = db, Nd.diff = ib, Nd.endOf = ub, Nd.format = mb, 
        Nd.from = nb, Nd.fromNow = ob, Nd.to = pb, Nd.toNow = qb, Nd.get = F, Nd.invalidAt = Cb, 
        Nd.isAfter = eb, Nd.isBefore = fb, Nd.isBetween = gb, Nd.isSame = hb, Nd.isValid = Ab, 
        Nd.lang = Cd, Nd.locale = rb, Nd.localeData = sb, Nd.max = wd, Nd.min = vd, Nd.parsingFlags = Bb, 
        Nd.set = F, Nd.startOf = tb, Nd.subtract = Bd, Nd.toArray = yb, Nd.toObject = zb, 
        Nd.toDate = xb, Nd.toISOString = lb, Nd.toJSON = lb, Nd.toString = kb, Nd.unix = wb, 
        Nd.valueOf = vb, Nd.year = td, Nd.isLeapYear = ia, Nd.weekYear = Fb, Nd.isoWeekYear = Gb, 
        Nd.quarter = Nd.quarters = Jb, Nd.month = Y, Nd.daysInMonth = Z, Nd.week = Nd.weeks = na, 
        Nd.isoWeek = Nd.isoWeeks = oa, Nd.weeksInYear = Ib, Nd.isoWeeksInYear = Hb, Nd.date = Dd, 
        Nd.day = Nd.days = Pb, Nd.weekday = Qb, Nd.isoWeekday = Rb, Nd.dayOfYear = qa, Nd.hour = Nd.hours = Id, 
        Nd.minute = Nd.minutes = Jd, Nd.second = Nd.seconds = Kd, Nd.millisecond = Nd.milliseconds = Md, 
        Nd.utcOffset = Na, Nd.utc = Pa, Nd.local = Qa, Nd.parseZone = Ra, Nd.hasAlignedHourOffset = Sa, 
        Nd.isDST = Ta, Nd.isDSTShifted = Ua, Nd.isLocal = Va, Nd.isUtcOffset = Wa, Nd.isUtc = Xa, 
        Nd.isUTC = Xa, Nd.zoneAbbr = Xb, Nd.zoneName = Yb, Nd.dates = aa("dates accessor is deprecated. Use date instead.", Dd), 
        Nd.months = aa("months accessor is deprecated. Use month instead", Y), Nd.years = aa("years accessor is deprecated. Use year instead", td), 
        Nd.zone = aa("moment().zone is deprecated, use moment().utcOffset instead. https://github.com/moment/moment/issues/1779", Oa);
        var Od = Nd, Pd = {
            sameDay: "[Today at] LT",
            nextDay: "[Tomorrow at] LT",
            nextWeek: "dddd [at] LT",
            lastDay: "[Yesterday at] LT",
            lastWeek: "[Last] dddd [at] LT",
            sameElse: "L"
        }, Qd = {
            LTS: "h:mm:ss A",
            LT: "h:mm A",
            L: "MM/DD/YYYY",
            LL: "MMMM D, YYYY",
            LLL: "MMMM D, YYYY h:mm A",
            LLLL: "dddd, MMMM D, YYYY h:mm A"
        }, Rd = "Invalid date", Sd = "%d", Td = /\d{1,2}/, Ud = {
            future: "in %s",
            past: "%s ago",
            s: "a few seconds",
            m: "a minute",
            mm: "%d minutes",
            h: "an hour",
            hh: "%d hours",
            d: "a day",
            dd: "%d days",
            M: "a month",
            MM: "%d months",
            y: "a year",
            yy: "%d years"
        }, Vd = s.prototype;
        Vd._calendar = Pd, Vd.calendar = _b, Vd._longDateFormat = Qd, Vd.longDateFormat = ac, 
        Vd._invalidDate = Rd, Vd.invalidDate = bc, Vd._ordinal = Sd, Vd.ordinal = cc, Vd._ordinalParse = Td, 
        Vd.preparse = dc, Vd.postformat = dc, Vd._relativeTime = Ud, Vd.relativeTime = ec, 
        Vd.pastFuture = fc, Vd.set = gc, Vd.months = U, Vd._months = md, Vd.monthsShort = V, 
        Vd._monthsShort = nd, Vd.monthsParse = W, Vd.week = ka, Vd._week = ud, Vd.firstDayOfYear = ma, 
        Vd.firstDayOfWeek = la, Vd.weekdays = Lb, Vd._weekdays = Ed, Vd.weekdaysMin = Nb, 
        Vd._weekdaysMin = Gd, Vd.weekdaysShort = Mb, Vd._weekdaysShort = Fd, Vd.weekdaysParse = Ob, 
        Vd.isPM = Ub, Vd._meridiemParse = Hd, Vd.meridiem = Vb, w("en", {
            ordinalParse: /\d{1,2}(th|st|nd|rd)/,
            ordinal: function(a) {
                var b = a % 10, c = 1 === q(a % 100 / 10) ? "th" : 1 === b ? "st" : 2 === b ? "nd" : 3 === b ? "rd" : "th";
                return a + c;
            }
        }), a.lang = aa("moment.lang is deprecated. Use moment.locale instead.", w), a.langData = aa("moment.langData is deprecated. Use moment.localeData instead.", y);
        var Wd = Math.abs, Xd = yc("ms"), Yd = yc("s"), Zd = yc("m"), $d = yc("h"), _d = yc("d"), ae = yc("w"), be = yc("M"), ce = yc("y"), de = Ac("milliseconds"), ee = Ac("seconds"), fe = Ac("minutes"), ge = Ac("hours"), he = Ac("days"), ie = Ac("months"), je = Ac("years"), ke = Math.round, le = {
            s: 45,
            m: 45,
            h: 22,
            d: 26,
            M: 11
        }, me = Math.abs, ne = Ha.prototype;
        ne.abs = oc, ne.add = qc, ne.subtract = rc, ne.as = wc, ne.asMilliseconds = Xd, 
        ne.asSeconds = Yd, ne.asMinutes = Zd, ne.asHours = $d, ne.asDays = _d, ne.asWeeks = ae, 
        ne.asMonths = be, ne.asYears = ce, ne.valueOf = xc, ne._bubble = tc, ne.get = zc, 
        ne.milliseconds = de, ne.seconds = ee, ne.minutes = fe, ne.hours = ge, ne.days = he, 
        ne.weeks = Bc, ne.months = ie, ne.years = je, ne.humanize = Fc, ne.toISOString = Gc, 
        ne.toString = Gc, ne.toJSON = Gc, ne.locale = rb, ne.localeData = sb, ne.toIsoString = aa("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)", Gc), 
        ne.lang = Cd, H("X", 0, 0, "unix"), H("x", 0, 0, "valueOf"), N("x", _c), N("X", bd), 
        Q("X", function(a, b, c) {
            c._d = new Date(1e3 * parseFloat(a, 10));
        }), Q("x", function(a, b, c) {
            c._d = new Date(q(a));
        }), a.version = "2.10.6", b(Da), a.fn = Od, a.min = Fa, a.max = Ga, a.utc = h, a.unix = Zb, 
        a.months = jc, a.isDate = d, a.locale = w, a.invalid = l, a.duration = Ya, a.isMoment = o, 
        a.weekdays = lc, a.parseZone = $b, a.localeData = y, a.isDuration = Ia, a.monthsShort = kc, 
        a.weekdaysMin = nc, a.defineLocale = x, a.weekdaysShort = mc, a.normalizeUnits = A, 
        a.relativeTimeThreshold = Ec;
        var oe = a;
        return oe;
    });
});

define("dist/js/1.0.0/zmall/activeModalTab-debug", [ "$-debug", "dist/js/1.0.0/depends/bootstrap/modal-debug", "dist/js/1.0.0/depends/bootstrap/tab-debug" ], function(require, exports, module) {
    var $ = jQuery = require("$-debug");
    var modal = require("dist/js/1.0.0/depends/bootstrap/modal-debug");
    var tab = require("dist/js/1.0.0/depends/bootstrap/tab-debug");
    //active the tab inside the modal
    $('[data-target^="#modal_"]').each(function() {
        var ele = $(this);
        var modal_target = ele.attr("data-target");
        //get the whole modal target
        var opt = ele.attr("data-active");
        //get the tab option
        var single = ele.attr("modal-single");
        //check if single tab needed
        ele.on("click", function() {
            //trigger the tab wanted
            var _ele = $(modal_target + " .nav-tabs li a[href='#" + opt + "']");
            _ele.trigger("click");
            //hide the other tabs if needed 
            if (single) {
                var p_ele = _ele.parent();
                p_ele.attr("class", "pure-u-1-1 active");
                //adjust the tab's width
                p_ele.siblings().remove();
            }
        });
    });
    // adjust the size if needed
    $('[data-toggle="tab"]').each(function() {
        var ele = $(this);
        var p_ele = ele.parents(".modal-dialog");
        var size = ele.attr("modal-size");
        ele.on("click", function() {
            if (size) {
                p_ele.addClass("modal-" + size);
            } else {
                p_ele.attr("class", "modal-dialog");
            }
        });
    });
});

define("dist/js/1.0.0/depends/bootstrap/modal-debug", [ "$-debug" ], function(require, exports, module) {
    var $ = jQuery = require("$-debug");
    /* ========================================================================
 * + add option to ignore the bg click event
 * + set header scrollbar's padding right para
 * based on Bootstrap: modal.js v3.3.5
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
    +function($) {
        "use strict";
        // MODAL CLASS DEFINITION
        // ======================
        var Modal = function(element, options) {
            this.options = options;
            this.$body = $(document.body);
            this.$header = $("body > header");
            this.$element = $(element);
            this.$dialog = this.$element.find(".modal-dialog");
            this.$backdrop = null;
            this.isShown = null;
            this.originalBodyPad = null;
            this.scrollbarWidth = 0;
            this.ignoreBackdropClick = false;
            this.ignoreBgclick = this.$element.attr("bgclick");
            // option to ignore the bg click event
            // console.log(options)
            if (this.options.remote) {
                this.$element.find(".modal-content").load(this.options.remote, $.proxy(function() {
                    this.$element.trigger("loaded.bs.modal");
                }, this));
            }
        };
        Modal.VERSION = "3.3.5";
        Modal.TRANSITION_DURATION = 300;
        Modal.BACKDROP_TRANSITION_DURATION = 150;
        Modal.DEFAULTS = {
            backdrop: true,
            keyboard: false,
            show: true
        };
        Modal.prototype.toggle = function(_relatedTarget) {
            return this.isShown ? this.hide() : this.show(_relatedTarget);
        };
        Modal.prototype.show = function(_relatedTarget) {
            var that = this;
            var e = $.Event("show.bs.modal", {
                relatedTarget: _relatedTarget
            });
            this.$element.trigger(e);
            if (this.isShown || e.isDefaultPrevented()) return;
            this.isShown = true;
            this.checkScrollbar();
            this.setScrollbar();
            this.$body.addClass("modal-open");
            this.escape();
            this.resize();
            this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', $.proxy(this.hide, this));
            this.$dialog.on("mousedown.dismiss.bs.modal", function() {
                that.$element.one("mouseup.dismiss.bs.modal", function(e) {
                    if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true;
                });
            });
            this.backdrop(function() {
                var transition = $.support.transition && that.$element.hasClass("fade");
                if (!that.$element.parent().length) {
                    that.$element.appendTo(that.$body);
                }
                that.$element.show().scrollTop(0);
                that.adjustDialog();
                if (transition) {
                    that.$element[0].offsetWidth;
                }
                that.$element.addClass("in");
                that.enforceFocus();
                var e = $.Event("shown.bs.modal", {
                    relatedTarget: _relatedTarget
                });
                transition ? that.$dialog.one("bsTransitionEnd", function() {
                    that.$element.trigger("focus").trigger(e);
                }).emulateTransitionEnd(Modal.TRANSITION_DURATION) : that.$element.trigger("focus").trigger(e);
            });
        };
        Modal.prototype.hide = function(e) {
            if (e) e.preventDefault();
            e = $.Event("hide.bs.modal");
            this.$element.trigger(e);
            if (!this.isShown || e.isDefaultPrevented()) return;
            this.isShown = false;
            this.escape();
            this.resize();
            $(document).off("focusin.bs.modal");
            this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal");
            this.$dialog.off("mousedown.dismiss.bs.modal");
            $.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", $.proxy(this.hideModal, this)).emulateTransitionEnd(Modal.TRANSITION_DURATION) : this.hideModal();
        };
        Modal.prototype.enforceFocus = function() {
            $(document).off("focusin.bs.modal").on("focusin.bs.modal", $.proxy(function(e) {
                if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
                    this.$element.trigger("focus");
                }
            }, this));
        };
        Modal.prototype.escape = function() {
            if (this.isShown && this.options.keyboard) {
                this.$element.on("keydown.dismiss.bs.modal", $.proxy(function(e) {
                    e.which == 27 && this.hide();
                }, this));
            } else if (!this.isShown) {
                this.$element.off("keydown.dismiss.bs.modal");
            }
        };
        Modal.prototype.resize = function() {
            if (this.isShown) {
                $(window).on("resize.bs.modal", $.proxy(this.handleUpdate, this));
            } else {
                $(window).off("resize.bs.modal");
            }
        };
        Modal.prototype.hideModal = function() {
            var that = this;
            this.$element.hide();
            this.backdrop(function() {
                if ($(".modal.in").length == 0) {
                    // overflow hidden removed from body only when there's no modal shown in page 
                    that.$body.removeClass("modal-open");
                }
                that.resetAdjustments();
                that.resetScrollbar();
                that.$element.trigger("hidden.bs.modal");
            });
        };
        Modal.prototype.removeBackdrop = function() {
            this.$backdrop && this.$backdrop.remove();
            this.$backdrop = null;
        };
        Modal.prototype.backdrop = function(callback) {
            var that = this;
            var animate = this.$element.hasClass("fade") ? "fade" : "";
            if (this.isShown && this.options.backdrop) {
                var doAnimate = $.support.transition && animate;
                this.$backdrop = $(document.createElement("div")).addClass("modal-backdrop " + animate).appendTo(this.$body);
                this.$element.on("click.dismiss.bs.modal", $.proxy(function(e) {
                    if (this.ignoreBackdropClick) {
                        this.ignoreBackdropClick = false;
                        return;
                    }
                    if (e.target !== e.currentTarget) return;
                    this.options.backdrop == "static" || this.ignoreBgclick == "ignore" ? this.$element[0].focus() : this.hide();
                }, this));
                if (doAnimate) this.$backdrop[0].offsetWidth;
                // force reflow
                this.$backdrop.addClass("in");
                if (!callback) return;
                doAnimate ? this.$backdrop.one("bsTransitionEnd", callback).emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) : callback();
            } else if (!this.isShown && this.$backdrop) {
                this.$backdrop.removeClass("in");
                var callbackRemove = function() {
                    that.removeBackdrop();
                    callback && callback();
                };
                $.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", callbackRemove).emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) : callbackRemove();
            } else if (callback) {
                callback();
            }
        };
        // these following methods are used to handle overflowing modals
        Modal.prototype.handleUpdate = function() {
            this.adjustDialog();
        };
        Modal.prototype.adjustDialog = function() {
            var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight;
            this.$element.css({
                paddingLeft: !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : "",
                paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ""
            });
        };
        Modal.prototype.resetAdjustments = function() {
            this.$element.css({
                paddingLeft: "",
                paddingRight: ""
            });
        };
        Modal.prototype.checkScrollbar = function() {
            var fullWindowWidth = window.innerWidth;
            if (!fullWindowWidth) {
                // workaround for missing window.innerWidth in IE8
                var documentElementRect = document.documentElement.getBoundingClientRect();
                fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left);
            }
            this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth;
            this.scrollbarWidth = this.measureScrollbar();
        };
        Modal.prototype.setScrollbar = function() {
            var bodyPad = parseInt(this.$body.css("padding-right") || 0, 10);
            this.originalBodyPad = document.body.style.paddingRight || "";
            if (this.bodyIsOverflowing) {
                this.$body.css("padding-right", bodyPad + this.scrollbarWidth);
                this.$header.css("padding-right", bodyPad + this.scrollbarWidth);
            }
        };
        Modal.prototype.resetScrollbar = function() {
            this.$body.css("padding-right", this.originalBodyPad);
            this.$header.css("padding-right", this.originalBodyPad);
        };
        Modal.prototype.measureScrollbar = function() {
            // thx walsh
            var scrollDiv = document.createElement("div");
            scrollDiv.className = "modal-scrollbar-measure";
            this.$body.append(scrollDiv);
            var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
            this.$body[0].removeChild(scrollDiv);
            return scrollbarWidth;
        };
        // MODAL PLUGIN DEFINITION
        // =======================
        function Plugin(option, _relatedTarget) {
            return this.each(function() {
                var $this = $(this);
                var data = $this.data("bs.modal");
                var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == "object" && option);
                if (!data) $this.data("bs.modal", data = new Modal(this, options));
                if (typeof option == "string") data[option](_relatedTarget); else if (options.show) data.show(_relatedTarget);
            });
        }
        var old = $.fn.modal;
        $.fn.modal = Plugin;
        $.fn.modal.Constructor = Modal;
        // MODAL NO CONFLICT
        // =================
        $.fn.modal.noConflict = function() {
            $.fn.modal = old;
            return this;
        };
        // MODAL DATA-API
        // ==============
        $(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function(e) {
            var $this = $(this);
            var href = $this.attr("href");
            var $target = $($this.attr("data-target") || href && href.replace(/.*(?=#[^\s]+$)/, ""));
            // strip for ie7
            var option = $target.data("bs.modal") ? "toggle" : $.extend({
                remote: !/#/.test(href) && href
            }, $target.data(), $this.data());
            if ($this.is("a")) e.preventDefault();
            $target.one("show.bs.modal", function(showEvent) {
                if (showEvent.isDefaultPrevented()) return;
                // only register focus restorer if modal will actually get shown
                $target.one("hidden.bs.modal", function() {
                    $this.is(":visible") && $this.trigger("focus");
                });
            });
            Plugin.call($target, option, this);
        });
    }(jQuery);
});

define("dist/js/1.0.0/depends/bootstrap/tab-debug", [ "$-debug" ], function(require, exports, module) {
    var $ = jQuery = require("$-debug");
    /* ========================================================================
 * Bootstrap: tab.js v3.3.5
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
    +function($) {
        "use strict";
        // TAB CLASS DEFINITION
        // ====================
        var Tab = function(element) {
            // jscs:disable requireDollarBeforejQueryAssignment
            this.element = $(element);
        };
        Tab.VERSION = "3.3.5";
        Tab.TRANSITION_DURATION = 150;
        Tab.prototype.show = function() {
            var $this = this.element;
            var $ul = $this.closest("ul:not(.dropdown-menu)");
            var selector = $this.data("target");
            if (!selector) {
                selector = $this.attr("href");
                selector = selector && selector.replace(/.*(?=#[^\s]*$)/, "");
            }
            if ($this.parent("li").hasClass("active")) return;
            var $previous = $ul.find(".active:last a");
            var hideEvent = $.Event("hide.bs.tab", {
                relatedTarget: $this[0]
            });
            var showEvent = $.Event("show.bs.tab", {
                relatedTarget: $previous[0]
            });
            $previous.trigger(hideEvent);
            $this.trigger(showEvent);
            if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return;
            var $target = $(selector);
            this.activate($this.closest("li"), $ul);
            this.activate($target, $target.parent(), function() {
                $previous.trigger({
                    type: "hidden.bs.tab",
                    relatedTarget: $this[0]
                });
                $this.trigger({
                    type: "shown.bs.tab",
                    relatedTarget: $previous[0]
                });
            });
        };
        Tab.prototype.activate = function(element, container, callback) {
            var $active = container.find("> .active");
            var transition = callback && $.support.transition && ($active.length && $active.hasClass("fade") || !!container.find("> .fade").length);
            function next() {
                $active.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", false);
                element.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", true);
                if (transition) {
                    element[0].offsetWidth;
                    // reflow for transition
                    element.addClass("in");
                } else {
                    element.removeClass("fade");
                }
                if (element.parent(".dropdown-menu").length) {
                    element.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", true);
                }
                callback && callback();
            }
            $active.length && transition ? $active.one("bsTransitionEnd", next).emulateTransitionEnd(Tab.TRANSITION_DURATION) : next();
            $active.removeClass("in");
        };
        // TAB PLUGIN DEFINITION
        // =====================
        function Plugin(option) {
            return this.each(function() {
                var $this = $(this);
                var data = $this.data("bs.tab");
                if (!data) $this.data("bs.tab", data = new Tab(this));
                if (typeof option == "string") data[option]();
            });
        }
        var old = $.fn.tab;
        $.fn.tab = Plugin;
        $.fn.tab.Constructor = Tab;
        // TAB NO CONFLICT
        // ===============
        $.fn.tab.noConflict = function() {
            $.fn.tab = old;
            return this;
        };
        // TAB DATA-API
        // ============
        var clickHandler = function(e) {
            e.preventDefault();
            Plugin.call($(this), "show");
        };
        $(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', clickHandler).on("click.bs.tab.data-api", '[data-toggle="pill"]', clickHandler);
    }(jQuery);
});

define("dist/js/1.0.0/zmall/affixOverflow-debug", [ "$-debug", "dist/js/1.0.0/zmall/consAndFunc-debug", "dist/js/1.0.0/depends/bootstrap/affix-debug" ], function(require) {
    var $ = jQuery = require("$-debug");
    var consAndFunc = require("dist/js/1.0.0/zmall/consAndFunc-debug");
    // var stickyCheck = require('./stickyCheck.js');
    var affixJs = require("dist/js/1.0.0/depends/bootstrap/affix-debug");
    //TODO: the affix should be called everytime dom changes
    $('[data-affix="overflow"]').each(function() {
        var ele = $(this);
        var offsetTop = ele.offset().top + ele.height() - $(window).height();
        // - parseInt(ele.css("margin-top").split("px")[0]);//element's marginTop
        //affix top = offset to top + own height - window's height
        ele.affix("destroy");
        //destroy the affix function before
        if (offsetTop < 0) return false;
        //no affix while it is not overflow
        ele.affix({
            offset: {
                top: function() {
                    return offsetTop;
                }
            }
        });
    });
    //left menu affix in account page
    $(".left-menu").each(function() {
        var ele = $(this);
        ele.affix({
            offset: {
                top: ele.offset().top - consAndFunc.navOffset - 18,
                //no accuracy
                bottom: function() {
                    return this.bottom = $("footer").outerHeight(!0) + 24;
                }
            }
        });
    });
});

define("dist/js/1.0.0/depends/bootstrap/affix-debug", [ "$-debug" ], function(require, exports, module) {
    var $ = jQuery = require("$-debug");
    /* ========================================================================
 * Bootstrap: affix.js v3.3.5
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
    +function($) {
        "use strict";
        // AFFIX CLASS DEFINITION
        // ======================
        var Affix = function(element, options) {
            this.options = $.extend({}, Affix.DEFAULTS, options);
            this.$target = $(this.options.target).on("scroll.bs.affix.data-api", $.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", $.proxy(this.checkPositionWithEventLoop, this));
            this.$element = $(element);
            this.affixed = null;
            this.unpin = null;
            this.pinnedOffset = null;
            this.checkPosition();
        };
        Affix.VERSION = "3.3.5";
        Affix.RESET = "affix affix-top affix-bottom";
        Affix.DEFAULTS = {
            offset: 0,
            target: window
        };
        Affix.prototype.getState = function(scrollHeight, height, offsetTop, offsetBottom) {
            var scrollTop = this.$target.scrollTop();
            var position = this.$element.offset();
            var targetHeight = this.$target.height();
            if (offsetTop != null && this.affixed == "top") return scrollTop < offsetTop ? "top" : false;
            if (this.affixed == "bottom") {
                if (offsetTop != null) return scrollTop + this.unpin <= position.top ? false : "bottom";
                return scrollTop + targetHeight <= scrollHeight - offsetBottom ? false : "bottom";
            }
            var initializing = this.affixed == null;
            var colliderTop = initializing ? scrollTop : position.top;
            var colliderHeight = initializing ? targetHeight : height;
            if (offsetTop != null && scrollTop <= offsetTop) return "top";
            if (offsetBottom != null && colliderTop + colliderHeight >= scrollHeight - offsetBottom) return "bottom";
            return false;
        };
        Affix.prototype.getPinnedOffset = function() {
            if (this.pinnedOffset) return this.pinnedOffset;
            this.$element.removeClass(Affix.RESET).addClass("affix");
            var scrollTop = this.$target.scrollTop();
            var position = this.$element.offset();
            return this.pinnedOffset = position.top - scrollTop;
        };
        Affix.prototype.checkPositionWithEventLoop = function() {
            setTimeout($.proxy(this.checkPosition, this), 1);
        };
        Affix.prototype.checkPosition = function() {
            if (!this.$element.is(":visible")) return;
            var height = this.$element.height();
            var offset = this.options.offset;
            var offsetTop = offset.top;
            var offsetBottom = offset.bottom;
            var scrollHeight = Math.max($(document).height(), $(document.body).height());
            if (typeof offset != "object") offsetBottom = offsetTop = offset;
            if (typeof offsetTop == "function") offsetTop = offset.top(this.$element);
            if (typeof offsetBottom == "function") offsetBottom = offset.bottom(this.$element);
            var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom);
            if (this.affixed != affix) {
                if (this.unpin != null) this.$element.css("top", "");
                var affixType = "affix" + (affix ? "-" + affix : "");
                var e = $.Event(affixType + ".bs.affix");
                this.$element.trigger(e);
                if (e.isDefaultPrevented()) return;
                this.affixed = affix;
                this.unpin = affix == "bottom" ? this.getPinnedOffset() : null;
                this.$element.removeClass(Affix.RESET).addClass(affixType).trigger(affixType.replace("affix", "affixed") + ".bs.affix");
            }
            if (affix == "bottom") {
                this.$element.offset({
                    top: scrollHeight - height - offsetBottom
                });
            }
        };
        // destroy method
        Affix.prototype.destroy = function() {
            this.$target = $(this.options.target).off("scroll.bs.affix.data-api").off("click.bs.affix.data-api");
            this.$element.removeClass(Affix.RESET).removeAttr("style");
            $(this.$element).removeData();
        };
        // AFFIX PLUGIN DEFINITION
        // =======================
        function Plugin(option) {
            return this.each(function() {
                var $this = $(this);
                var data = $this.data("bs.affix");
                var options = typeof option == "object" && option;
                if (!data) $this.data("bs.affix", data = new Affix(this, options));
                if (typeof option == "string") data[option]();
            });
        }
        var old = $.fn.affix;
        $.fn.affix = Plugin;
        $.fn.affix.Constructor = Affix;
        // AFFIX NO CONFLICT
        // =================
        $.fn.affix.noConflict = function() {
            $.fn.affix = old;
            return this;
        };
        // AFFIX DATA-API
        // ==============
        $(window).on("load", function() {
            $('[data-spy="affix"]').each(function() {
                var $spy = $(this);
                var data = $spy.data();
                data.offset = data.offset || {};
                if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom;
                if (data.offsetTop != null) data.offset.top = data.offsetTop;
                Plugin.call($spy, data);
            });
        });
    }(jQuery);
});

define("dist/js/1.0.0/zmall/lightBox-debug", [ "$-debug", "dist/js/1.0.0/depends/bootstrap/ekko-lightbox-debug" ], function(require) {
    var $ = jQuery = require("$-debug");
    var lightbox = require("dist/js/1.0.0/depends/bootstrap/ekko-lightbox-debug");
    // lightbox for item detail
    // delegate calls to data-toggle="lightbox"
    $(document).delegate('*[data-toggle="lightbox"]', "click", function(event) {
        event.preventDefault();
        $(this).ekkoLightbox();
    });
});

define("dist/js/1.0.0/depends/bootstrap/ekko-lightbox-debug", [ "$-debug" ], function(require, exports, module) {
    var $ = jQuery = require("$-debug");
    /*
Lightbox for Bootstrap 3 by @ashleydw
https://github.com/ashleydw/lightbox

License: https://github.com/ashleydw/lightbox/blob/master/LICENSE
*/
    (function() {
        "use strict";
        var $, EkkoLightbox;
        $ = jQuery;
        EkkoLightbox = function(element, options) {
            var content, footer, header, _this = this;
            this.options = $.extend({
                title: null,
                footer: null,
                remote: null
            }, $.fn.ekkoLightbox.defaults, options || {});
            this.$element = $(element);
            content = "";
            this.modal_id = this.options.modal_id ? this.options.modal_id : "ekkoLightbox-" + Math.floor(Math.random() * 1e3 + 1);
            //header = '<div class="modal-header"' + (this.options.title || this.options.always_show_close ? '' : ' style="display:none"') + '><button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button><h4 class="modal-title">' + (this.options.title || "&nbsp;") + '</h4></div>';
            header = '<div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>';
            footer = '<div class="modal-footer"' + (this.options.footer ? "" : ' style="display:none"') + ">" + this.options.footer + "</div>";
            $(document.body).append('<div id="' + this.modal_id + '" class="ekko-lightbox modal fade" tabindex="-1"><div class="modal-dialog"><div class="modal-content">' + header + '<div class="modal-body"><div class="ekko-lightbox-container"><div></div></div></div>' + footer + "</div></div></div>");
            this.modal = $("#" + this.modal_id);
            this.modal_dialog = this.modal.find(".modal-dialog").first();
            this.modal_content = this.modal.find(".modal-content").first();
            this.modal_body = this.modal.find(".modal-body").first();
            this.lightbox_container = this.modal_body.find(".ekko-lightbox-container").first();
            this.lightbox_body = this.lightbox_container.find("> div:first-child").first();
            this.showLoading();
            this.modal_arrows = null;
            this.border = {
                top: parseFloat(this.modal_dialog.css("border-top-width")) + parseFloat(this.modal_content.css("border-top-width")) + parseFloat(this.modal_body.css("border-top-width")),
                right: parseFloat(this.modal_dialog.css("border-right-width")) + parseFloat(this.modal_content.css("border-right-width")) + parseFloat(this.modal_body.css("border-right-width")),
                bottom: parseFloat(this.modal_dialog.css("border-bottom-width")) + parseFloat(this.modal_content.css("border-bottom-width")) + parseFloat(this.modal_body.css("border-bottom-width")),
                left: parseFloat(this.modal_dialog.css("border-left-width")) + parseFloat(this.modal_content.css("border-left-width")) + parseFloat(this.modal_body.css("border-left-width"))
            };
            this.padding = {
                top: parseFloat(this.modal_dialog.css("padding-top")) + parseFloat(this.modal_content.css("padding-top")) + parseFloat(this.modal_body.css("padding-top")),
                right: parseFloat(this.modal_dialog.css("padding-right")) + parseFloat(this.modal_content.css("padding-right")) + parseFloat(this.modal_body.css("padding-right")),
                bottom: parseFloat(this.modal_dialog.css("padding-bottom")) + parseFloat(this.modal_content.css("padding-bottom")) + parseFloat(this.modal_body.css("padding-bottom")),
                left: parseFloat(this.modal_dialog.css("padding-left")) + parseFloat(this.modal_content.css("padding-left")) + parseFloat(this.modal_body.css("padding-left"))
            };
            this.modal.on("show.bs.modal", this.options.onShow.bind(this)).on("shown.bs.modal", function() {
                _this.modal_shown();
                return _this.options.onShown.call(_this);
            }).on("hide.bs.modal", this.options.onHide.bind(this)).on("hidden.bs.modal", function() {
                if (_this.gallery) {
                    $(document).off("keydown.ekkoLightbox");
                }
                _this.modal.remove();
                return _this.options.onHidden.call(_this);
            }).modal("show", options);
            return this.modal;
        };
        EkkoLightbox.prototype = {
            modal_shown: function() {
                var video_id, _this = this;
                if (!this.options.remote) {
                    return this.error("No remote target given");
                } else {
                    this.gallery = this.$element.data("gallery");
                    if (this.gallery) {
                        if (this.options.gallery_parent_selector === "document.body" || this.options.gallery_parent_selector === "") {
                            this.gallery_items = $(document.body).find('*[data-toggle="lightbox"][data-gallery="' + this.gallery + '"]');
                        } else {
                            this.gallery_items = this.$element.parents(this.options.gallery_parent_selector).first().find('*[data-toggle="lightbox"][data-gallery="' + this.gallery + '"]');
                        }
                        this.gallery_index = this.gallery_items.index(this.$element);
                        $(document).on("keydown.ekkoLightbox", this.navigate.bind(this));
                        if (this.options.directional_arrows && this.gallery_items.length > 1) {
                            this.lightbox_container.append('<div class="ekko-lightbox-nav-overlay"><a href="#" class="' + this.strip_stops(this.options.left_arrow_class) + '"></a><a href="#" class="' + this.strip_stops(this.options.right_arrow_class) + '"></a></div>');
                            this.modal_arrows = this.lightbox_container.find("div.ekko-lightbox-nav-overlay").first();
                            this.lightbox_container.find("a" + this.strip_spaces(this.options.left_arrow_class)).on("click", function(event) {
                                event.preventDefault();
                                return _this.navigate_left();
                            });
                            this.lightbox_container.find("a" + this.strip_spaces(this.options.right_arrow_class)).on("click", function(event) {
                                event.preventDefault();
                                return _this.navigate_right();
                            });
                        }
                    }
                    if (this.options.type) {
                        if (this.options.type === "image") {
                            return this.preloadImage(this.options.remote, true);
                        } else if (this.options.type === "youtube" && (video_id = this.getYoutubeId(this.options.remote))) {
                            return this.showYoutubeVideo(video_id);
                        } else if (this.options.type === "vimeo") {
                            return this.showVimeoVideo(this.options.remote);
                        } else if (this.options.type === "instagram") {
                            return this.showInstagramVideo(this.options.remote);
                        } else if (this.options.type === "url") {
                            return this.loadRemoteContent(this.options.remote);
                        } else if (this.options.type === "video") {
                            return this.showVideoIframe(this.options.remote);
                        } else {
                            return this.error('Could not detect remote target type. Force the type using data-type="image|youtube|vimeo|instagram|url|video"');
                        }
                    } else {
                        return this.detectRemoteType(this.options.remote);
                    }
                }
            },
            strip_stops: function(str) {
                return str.replace(/\./g, "");
            },
            strip_spaces: function(str) {
                return str.replace(/\s/g, "");
            },
            isImage: function(str) {
                return str.match(/(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg)((\?|#).*)?$)/i);
            },
            isSwf: function(str) {
                return str.match(/\.(swf)((\?|#).*)?$/i);
            },
            getYoutubeId: function(str) {
                var match;
                match = str.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/);
                if (match && match[2].length === 11) {
                    return match[2];
                } else {
                    return false;
                }
            },
            getVimeoId: function(str) {
                if (str.indexOf("vimeo") > 0) {
                    return str;
                } else {
                    return false;
                }
            },
            getInstagramId: function(str) {
                if (str.indexOf("instagram") > 0) {
                    return str;
                } else {
                    return false;
                }
            },
            navigate: function(event) {
                event = event || window.event;
                if (event.keyCode === 39 || event.keyCode === 37) {
                    if (event.keyCode === 39) {
                        return this.navigate_right();
                    } else if (event.keyCode === 37) {
                        return this.navigate_left();
                    }
                }
            },
            navigateTo: function(index) {
                var next, src;
                if (index < 0 || index > this.gallery_items.length - 1) {
                    return this;
                }
                this.showLoading();
                this.gallery_index = index;
                this.$element = $(this.gallery_items.get(this.gallery_index));
                this.updateTitleAndFooter();
                src = this.$element.attr("data-remote") || this.$element.attr("href");
                this.detectRemoteType(src, this.$element.attr("data-type") || false);
                if (this.gallery_index + 1 < this.gallery_items.length) {
                    next = $(this.gallery_items.get(this.gallery_index + 1), false);
                    src = next.attr("data-remote") || next.attr("href");
                    if (next.attr("data-type") === "image" || this.isImage(src)) {
                        return this.preloadImage(src, false);
                    }
                }
            },
            navigate_left: function() {
                if (this.gallery_items.length === 1) {
                    return;
                }
                if (this.gallery_index === 0) {
                    this.gallery_index = this.gallery_items.length - 1;
                } else {
                    this.gallery_index--;
                }
                this.options.onNavigate.call(this, "left", this.gallery_index);
                return this.navigateTo(this.gallery_index);
            },
            navigate_right: function() {
                if (this.gallery_items.length === 1) {
                    return;
                }
                if (this.gallery_index === this.gallery_items.length - 1) {
                    this.gallery_index = 0;
                } else {
                    this.gallery_index++;
                }
                this.options.onNavigate.call(this, "right", this.gallery_index);
                return this.navigateTo(this.gallery_index);
            },
            detectRemoteType: function(src, type) {
                var video_id;
                type = type || false;
                if (type === "image" || this.isImage(src)) {
                    this.options.type = "image";
                    return this.preloadImage(src, true);
                } else if (type === "youtube" || (video_id = this.getYoutubeId(src))) {
                    this.options.type = "youtube";
                    return this.showYoutubeVideo(video_id);
                } else if (type === "vimeo" || (video_id = this.getVimeoId(src))) {
                    this.options.type = "vimeo";
                    return this.showVimeoVideo(video_id);
                } else if (type === "instagram" || (video_id = this.getInstagramId(src))) {
                    this.options.type = "instagram";
                    return this.showInstagramVideo(video_id);
                } else if (type === "video") {
                    this.options.type = "video";
                    return this.showVideoIframe(video_id);
                } else {
                    this.options.type = "url";
                    return this.loadRemoteContent(src);
                }
            },
            updateTitleAndFooter: function() {
                var caption, footer, header, title;
                header = this.modal_content.find(".modal-header");
                footer = this.modal_content.find(".modal-footer");
                title = this.$element.data("title") || "";
                caption = this.$element.data("footer") || "";
                if (title || this.options.always_show_close) {
                    header.css("display", "").find(".modal-title").html(title || "&nbsp;");
                } else {
                    header.css("display", "none");
                }
                if (caption) {
                    footer.css("display", "").html(caption);
                } else {
                    footer.css("display", "none");
                }
                return this;
            },
            showLoading: function() {
                this.lightbox_body.html('<div class="modal-loading">' + this.options.loadingMessage + "</div>");
                return this;
            },
            showYoutubeVideo: function(id) {
                var height, width;
                width = this.checkDimensions(this.$element.data("width") || 560);
                height = width / (560 / 315);
                return this.showVideoIframe("//www.youtube.com/embed/" + id + "?badge=0&autoplay=1&html5=1", width, height);
            },
            showVimeoVideo: function(id) {
                var height, width;
                width = this.checkDimensions(this.$element.data("width") || 560);
                height = width / (500 / 281);
                return this.showVideoIframe(id + "?autoplay=1", width, height);
            },
            showInstagramVideo: function(id) {
                var height, width;
                width = this.checkDimensions(this.$element.data("width") || 612);
                this.resize(width);
                height = width + 80;
                this.lightbox_body.html('<iframe width="' + width + '" height="' + height + '" src="' + this.addTrailingSlash(id) + 'embed/" frameborder="0" allowfullscreen></iframe>');
                this.options.onContentLoaded.call(this);
                if (this.modal_arrows) {
                    return this.modal_arrows.css("display", "none");
                }
            },
            showVideoIframe: function(url, width, height) {
                height = height || width;
                this.resize(width);
                this.lightbox_body.html('<div class="embed-responsive embed-responsive-16by9"><iframe width="' + width + '" height="' + height + '" src="' + url + '" frameborder="0" allowfullscreen class="embed-responsive-item"></iframe></div>');
                this.options.onContentLoaded.call(this);
                if (this.modal_arrows) {
                    this.modal_arrows.css("display", "none");
                }
                return this;
            },
            loadRemoteContent: function(url) {
                var disableExternalCheck, width, _this = this;
                width = this.$element.data("width") || 560;
                this.resize(width);
                disableExternalCheck = this.$element.data("disableExternalCheck") || false;
                if (!disableExternalCheck && !this.isExternal(url)) {
                    this.lightbox_body.load(url, $.proxy(function() {
                        return _this.$element.trigger("loaded.bs.modal");
                    }));
                } else {
                    this.lightbox_body.html('<iframe width="' + width + '" height="' + width + '" src="' + url + '" frameborder="0" allowfullscreen></iframe>');
                    this.options.onContentLoaded.call(this);
                }
                if (this.modal_arrows) {
                    this.modal_arrows.css("display", "none");
                }
                return this;
            },
            isExternal: function(url) {
                var match;
                match = url.match(/^([^:\/?#]+:)?(?:\/\/([^\/?#]*))?([^?#]+)?(\?[^#]*)?(#.*)?/);
                if (typeof match[1] === "string" && match[1].length > 0 && match[1].toLowerCase() !== location.protocol) {
                    return true;
                }
                if (typeof match[2] === "string" && match[2].length > 0 && match[2].replace(new RegExp(":(" + {
                    "http:": 80,
                    "https:": 443
                }[location.protocol] + ")?$"), "") !== location.host) {
                    return true;
                }
                return false;
            },
            error: function(message) {
                this.lightbox_body.html(message);
                return this;
            },
            preloadImage: function(src, onLoadShowImage) {
                var img, _this = this;
                img = new Image();
                if (onLoadShowImage == null || onLoadShowImage === true) {
                    img.onload = function() {
                        var image;
                        image = $("<img />");
                        image.attr("src", img.src);
                        image.addClass("img-responsive");
                        _this.lightbox_body.html(image);
                        if (_this.modal_arrows) {
                            _this.modal_arrows.css("display", "block");
                        }
                        return image.load(function() {
                            _this.resize(img.width);
                            return _this.options.onContentLoaded.call(_this);
                        });
                    };
                    img.onerror = function() {
                        return _this.error("Failed to load image: " + src);
                    };
                }
                img.src = src;
                return img;
            },
            resize: function(width) {
                var width_total;
                width_total = width + this.border.left + this.padding.left + this.padding.right + this.border.right;
                this.modal_dialog.css("width", "auto").css("max-width", width_total);
                this.lightbox_container.find("a").css("line-height", function() {
                    return $(this).parent().height() + "px";
                });
                return this;
            },
            checkDimensions: function(width) {
                var body_width, width_total;
                width_total = width + this.border.left + this.padding.left + this.padding.right + this.border.right;
                body_width = document.body.clientWidth;
                if (width_total > body_width) {
                    width = this.modal_body.width();
                }
                return width;
            },
            close: function() {
                return this.modal.modal("hide");
            },
            addTrailingSlash: function(url) {
                if (url.substr(-1) !== "/") {
                    url += "/";
                }
                return url;
            }
        };
        $.fn.ekkoLightbox = function(options) {
            return this.each(function() {
                var $this;
                $this = $(this);
                options = $.extend({
                    remote: $this.attr("data-remote") || $this.attr("href"),
                    gallery_parent_selector: $this.attr("data-parent"),
                    type: $this.attr("data-type")
                }, options, $this.data());
                new EkkoLightbox(this, options);
                return this;
            });
        };
        $.fn.ekkoLightbox.defaults = {
            gallery_parent_selector: "document.body",
            left_arrow_class: ".glyphicon .glyphicon-chevron-left",
            right_arrow_class: ".glyphicon .glyphicon-chevron-right",
            directional_arrows: true,
            type: null,
            always_show_close: true,
            loadingMessage: "Loading...",
            onShow: function() {},
            onShown: function() {},
            onHide: function() {},
            onHidden: function() {},
            onNavigate: function() {},
            onContentLoaded: function() {}
        };
    }).call(this);
});

define("dist/js/1.0.0/zmall/menuAccordion-debug", [ "$-debug", "dist/js/1.0.0/depends/bootstrap/collapse-debug" ], function(require) {
    var $ = jQuery = require("$-debug");
    var collapseJs = require("dist/js/1.0.0/depends/bootstrap/collapse-debug");
    //left menu accordion
    $(".left-menu .collapse").on("show.bs.collapse", function() {
        var prntEle = $(this).parent();
        prntEle.find(".glyphicon-chevron-down").addClass("rotate");
        prntEle.siblings().children(".collapse").collapse("hide");
    }).on("hide.bs.collapse", function() {
        $(this).parent().find(".glyphicon-chevron-down").removeClass("rotate");
    });
});

define("dist/js/1.0.0/depends/bootstrap/collapse-debug", [ "$-debug" ], function(require, exports, module) {
    var $ = jQuery = require("$-debug");
    /* ========================================================================
 * Bootstrap: collapse.js v3.3.5
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
    +function($) {
        "use strict";
        // COLLAPSE PUBLIC CLASS DEFINITION
        // ================================
        var Collapse = function(element, options) {
            this.$element = $(element);
            this.options = $.extend({}, Collapse.DEFAULTS, options);
            this.$trigger = $('[data-toggle="collapse"][href="#' + element.id + '"],' + '[data-toggle="collapse"][data-target="#' + element.id + '"]');
            this.transitioning = null;
            if (this.options.parent) {
                this.$parent = this.getParent();
            } else {
                this.addAriaAndCollapsedClass(this.$element, this.$trigger);
            }
            if (this.options.toggle) this.toggle();
        };
        Collapse.VERSION = "3.3.5";
        Collapse.TRANSITION_DURATION = 350;
        Collapse.DEFAULTS = {
            toggle: true
        };
        Collapse.prototype.dimension = function() {
            var hasWidth = this.$element.hasClass("width");
            return hasWidth ? "width" : "height";
        };
        Collapse.prototype.show = function() {
            if (this.transitioning || this.$element.hasClass("in")) return;
            var activesData;
            var actives = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");
            if (actives && actives.length) {
                activesData = actives.data("bs.collapse");
                if (activesData && activesData.transitioning) return;
            }
            var startEvent = $.Event("show.bs.collapse");
            this.$element.trigger(startEvent);
            if (startEvent.isDefaultPrevented()) return;
            if (actives && actives.length) {
                Plugin.call(actives, "hide");
                activesData || actives.data("bs.collapse", null);
            }
            var dimension = this.dimension();
            this.$element.removeClass("collapse").addClass("collapsing")[dimension](0).attr("aria-expanded", true);
            this.$trigger.removeClass("collapsed").attr("aria-expanded", true);
            this.transitioning = 1;
            var complete = function() {
                this.$element.removeClass("collapsing").addClass("collapse in")[dimension]("");
                this.transitioning = 0;
                this.$element.trigger("shown.bs.collapse");
            };
            if (!$.support.transition) return complete.call(this);
            var scrollSize = $.camelCase([ "scroll", dimension ].join("-"));
            this.$element.one("bsTransitionEnd", $.proxy(complete, this)).emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize]);
        };
        Collapse.prototype.hide = function() {
            if (this.transitioning || !this.$element.hasClass("in")) return;
            var startEvent = $.Event("hide.bs.collapse");
            this.$element.trigger(startEvent);
            if (startEvent.isDefaultPrevented()) return;
            var dimension = this.dimension();
            this.$element[dimension](this.$element[dimension]())[0].offsetHeight;
            this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", false);
            this.$trigger.addClass("collapsed").attr("aria-expanded", false);
            this.transitioning = 1;
            var complete = function() {
                this.transitioning = 0;
                this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse");
            };
            if (!$.support.transition) return complete.call(this);
            this.$element[dimension](0).one("bsTransitionEnd", $.proxy(complete, this)).emulateTransitionEnd(Collapse.TRANSITION_DURATION);
        };
        Collapse.prototype.toggle = function() {
            this[this.$element.hasClass("in") ? "hide" : "show"]();
        };
        Collapse.prototype.getParent = function() {
            return $(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each($.proxy(function(i, element) {
                var $element = $(element);
                this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element);
            }, this)).end();
        };
        Collapse.prototype.addAriaAndCollapsedClass = function($element, $trigger) {
            var isOpen = $element.hasClass("in");
            $element.attr("aria-expanded", isOpen);
            $trigger.toggleClass("collapsed", !isOpen).attr("aria-expanded", isOpen);
        };
        function getTargetFromTrigger($trigger) {
            var href;
            var target = $trigger.attr("data-target") || (href = $trigger.attr("href")) && href.replace(/.*(?=#[^\s]+$)/, "");
            // strip for ie7
            return $(target);
        }
        // COLLAPSE PLUGIN DEFINITION
        // ==========================
        function Plugin(option) {
            return this.each(function() {
                var $this = $(this);
                var data = $this.data("bs.collapse");
                var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == "object" && option);
                if (!data && options.toggle && /show|hide/.test(option)) options.toggle = false;
                if (!data) $this.data("bs.collapse", data = new Collapse(this, options));
                if (typeof option == "string") data[option]();
            });
        }
        var old = $.fn.collapse;
        $.fn.collapse = Plugin;
        $.fn.collapse.Constructor = Collapse;
        // COLLAPSE NO CONFLICT
        // ====================
        $.fn.collapse.noConflict = function() {
            $.fn.collapse = old;
            return this;
        };
        // COLLAPSE DATA-API
        // =================
        $(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function(e) {
            var $this = $(this);
            if (!$this.attr("data-target")) e.preventDefault();
            var $target = getTargetFromTrigger($this);
            var data = $target.data("bs.collapse");
            var option = data ? "toggle" : $this.data();
            Plugin.call($target, option);
        });
    }(jQuery);
});

define("dist/js/1.0.0/zmall/itemGallery-debug", [ "$-debug", "dist/js/1.0.0/depends/jquery.jcarousel.min-debug", "dist/js/1.0.0/depends/gallary-carousels-debug" ], function(require) {
    var $ = jQuery = require("$-debug");
    var jcarsl = require("dist/js/1.0.0/depends/jquery.jcarousel.min-debug");
    var gallary = require("dist/js/1.0.0/depends/gallary-carousels-debug");
    //item detail gallary config and lazy load
    $(".carousel-stage").jcarousel({}).on("jcarousel:targetin", "li", function(event, carousel) {
        //Triggered when the item becomes the targeted item.
        // lazyload
        var ele = $(this).find("img");
        var src_cur = ele.attr("ssrc");
        ele.attr("src", src_cur);
    });
});

define("dist/js/1.0.0/depends/jquery.jcarousel.min-debug", [ "$-debug" ], function(require, exports, module) {
    var $ = jQuery = require("$-debug");
    /*! jCarousel - v0.3.4 - 2015-09-23
* http://sorgalla.com/jcarousel/
* Copyright (c) 2006-2015 Jan Sorgalla; Licensed MIT */
    !function(a) {
        "use strict";
        var b = a.jCarousel = {};
        b.version = "0.3.4";
        var c = /^([+\-]=)?(.+)$/;
        b.parseTarget = function(a) {
            var b = !1, d = "object" != typeof a ? c.exec(a) : null;
            return d ? (a = parseInt(d[2], 10) || 0, d[1] && (b = !0, "-=" === d[1] && (a *= -1))) : "object" != typeof a && (a = parseInt(a, 10) || 0), 
            {
                target: a,
                relative: b
            };
        }, b.detectCarousel = function(a) {
            for (var b; a.length > 0; ) {
                if (b = a.filter("[data-jcarousel]"), b.length > 0) return b;
                if (b = a.find("[data-jcarousel]"), b.length > 0) return b;
                a = a.parent();
            }
            return null;
        }, b.base = function(c) {
            return {
                version: b.version,
                _options: {},
                _element: null,
                _carousel: null,
                _init: a.noop,
                _create: a.noop,
                _destroy: a.noop,
                _reload: a.noop,
                create: function() {
                    return this._element.attr("data-" + c.toLowerCase(), !0).data(c, this), !1 === this._trigger("create") ? this : (this._create(), 
                    this._trigger("createend"), this);
                },
                destroy: function() {
                    return !1 === this._trigger("destroy") ? this : (this._destroy(), this._trigger("destroyend"), 
                    this._element.removeData(c).removeAttr("data-" + c.toLowerCase()), this);
                },
                reload: function(a) {
                    return !1 === this._trigger("reload") ? this : (a && this.options(a), this._reload(), 
                    this._trigger("reloadend"), this);
                },
                element: function() {
                    return this._element;
                },
                options: function(b, c) {
                    if (0 === arguments.length) return a.extend({}, this._options);
                    if ("string" == typeof b) {
                        if ("undefined" == typeof c) return "undefined" == typeof this._options[b] ? null : this._options[b];
                        this._options[b] = c;
                    } else this._options = a.extend({}, this._options, b);
                    return this;
                },
                carousel: function() {
                    return this._carousel || (this._carousel = b.detectCarousel(this.options("carousel") || this._element), 
                    this._carousel || a.error('Could not detect carousel for plugin "' + c + '"')), 
                    this._carousel;
                },
                _trigger: function(b, d, e) {
                    var f, g = !1;
                    return e = [ this ].concat(e || []), (d || this._element).each(function() {
                        f = a.Event((c + ":" + b).toLowerCase()), a(this).trigger(f, e), f.isDefaultPrevented() && (g = !0);
                    }), !g;
                }
            };
        }, b.plugin = function(c, d) {
            var e = a[c] = function(b, c) {
                this._element = a(b), this.options(c), this._init(), this.create();
            };
            return e.fn = e.prototype = a.extend({}, b.base(c), d), a.fn[c] = function(b) {
                var d = Array.prototype.slice.call(arguments, 1), f = this;
                return this.each("string" == typeof b ? function() {
                    var e = a(this).data(c);
                    if (!e) return a.error("Cannot call methods on " + c + ' prior to initialization; attempted to call method "' + b + '"');
                    if (!a.isFunction(e[b]) || "_" === b.charAt(0)) return a.error('No such method "' + b + '" for ' + c + " instance");
                    var g = e[b].apply(e, d);
                    return g !== e && "undefined" != typeof g ? (f = g, !1) : void 0;
                } : function() {
                    var d = a(this).data(c);
                    d instanceof e ? d.reload(b) : new e(this, b);
                }), f;
            }, e;
        };
    }(jQuery), function(a, b) {
        "use strict";
        var c = function(a) {
            return parseFloat(a) || 0;
        };
        a.jCarousel.plugin("jcarousel", {
            animating: !1,
            tail: 0,
            inTail: !1,
            resizeTimer: null,
            lt: null,
            vertical: !1,
            rtl: !1,
            circular: !1,
            underflow: !1,
            relative: !1,
            _options: {
                list: function() {
                    return this.element().children().eq(0);
                },
                items: function() {
                    return this.list().children();
                },
                animation: 400,
                transitions: !1,
                wrap: null,
                vertical: null,
                rtl: null,
                center: !1
            },
            _list: null,
            _items: null,
            _target: a(),
            _first: a(),
            _last: a(),
            _visible: a(),
            _fullyvisible: a(),
            _init: function() {
                var a = this;
                return this.onWindowResize = function() {
                    a.resizeTimer && clearTimeout(a.resizeTimer), a.resizeTimer = setTimeout(function() {
                        a.reload();
                    }, 100);
                }, this;
            },
            _create: function() {
                this._reload(), a(b).on("resize.jcarousel", this.onWindowResize);
            },
            _destroy: function() {
                a(b).off("resize.jcarousel", this.onWindowResize);
            },
            _reload: function() {
                this.vertical = this.options("vertical"), null == this.vertical && (this.vertical = this.list().height() > this.list().width()), 
                this.rtl = this.options("rtl"), null == this.rtl && (this.rtl = function(b) {
                    if ("rtl" === ("" + b.attr("dir")).toLowerCase()) return !0;
                    var c = !1;
                    return b.parents("[dir]").each(function() {
                        return /rtl/i.test(a(this).attr("dir")) ? (c = !0, !1) : void 0;
                    }), c;
                }(this._element)), this.lt = this.vertical ? "top" : "left", this.relative = "relative" === this.list().css("position"), 
                this._list = null, this._items = null;
                var b = this.index(this._target) >= 0 ? this._target : this.closest();
                this.circular = "circular" === this.options("wrap"), this.underflow = !1;
                var c = {
                    left: 0,
                    top: 0
                };
                return b.length > 0 && (this._prepare(b), this.list().find("[data-jcarousel-clone]").remove(), 
                this._items = null, this.underflow = this._fullyvisible.length >= this.items().length, 
                this.circular = this.circular && !this.underflow, c[this.lt] = this._position(b) + "px"), 
                this.move(c), this;
            },
            list: function() {
                if (null === this._list) {
                    var b = this.options("list");
                    this._list = a.isFunction(b) ? b.call(this) : this._element.find(b);
                }
                return this._list;
            },
            items: function() {
                if (null === this._items) {
                    var b = this.options("items");
                    this._items = (a.isFunction(b) ? b.call(this) : this.list().find(b)).not("[data-jcarousel-clone]");
                }
                return this._items;
            },
            index: function(a) {
                return this.items().index(a);
            },
            closest: function() {
                var b, d = this, e = this.list().position()[this.lt], f = a(), g = !1, h = this.vertical ? "bottom" : this.rtl && !this.relative ? "left" : "right";
                return this.rtl && this.relative && !this.vertical && (e += this.list().width() - this.clipping()), 
                this.items().each(function() {
                    if (f = a(this), g) return !1;
                    var i = d.dimension(f);
                    if (e += i, e >= 0) {
                        if (b = i - c(f.css("margin-" + h)), !(Math.abs(e) - i + b / 2 <= 0)) return !1;
                        g = !0;
                    }
                }), f;
            },
            target: function() {
                return this._target;
            },
            first: function() {
                return this._first;
            },
            last: function() {
                return this._last;
            },
            visible: function() {
                return this._visible;
            },
            fullyvisible: function() {
                return this._fullyvisible;
            },
            hasNext: function() {
                if (!1 === this._trigger("hasnext")) return !0;
                var a = this.options("wrap"), b = this.items().length - 1, c = this.options("center") ? this._target : this._last;
                return b >= 0 && !this.underflow && (a && "first" !== a || this.index(c) < b || this.tail && !this.inTail) ? !0 : !1;
            },
            hasPrev: function() {
                if (!1 === this._trigger("hasprev")) return !0;
                var a = this.options("wrap");
                return this.items().length > 0 && !this.underflow && (a && "last" !== a || this.index(this._first) > 0 || this.tail && this.inTail) ? !0 : !1;
            },
            clipping: function() {
                return this._element["inner" + (this.vertical ? "Height" : "Width")]();
            },
            dimension: function(a) {
                return a["outer" + (this.vertical ? "Height" : "Width")](!0);
            },
            scroll: function(b, c, d) {
                if (this.animating) return this;
                if (!1 === this._trigger("scroll", null, [ b, c ])) return this;
                a.isFunction(c) && (d = c, c = !0);
                var e = a.jCarousel.parseTarget(b);
                if (e.relative) {
                    var f, g, h, i, j, k, l, m, n = this.items().length - 1, o = Math.abs(e.target), p = this.options("wrap");
                    if (e.target > 0) {
                        var q = this.index(this._last);
                        if (q >= n && this.tail) this.inTail ? "both" === p || "last" === p ? this._scroll(0, c, d) : a.isFunction(d) && d.call(this, !1) : this._scrollTail(c, d); else if (f = this.index(this._target), 
                        this.underflow && f === n && ("circular" === p || "both" === p || "last" === p) || !this.underflow && q === n && ("both" === p || "last" === p)) this._scroll(0, c, d); else if (h = f + o, 
                        this.circular && h > n) {
                            for (m = n, j = this.items().get(-1); m++ < h; ) j = this.items().eq(0), k = this._visible.index(j) >= 0, 
                            k && j.after(j.clone(!0).attr("data-jcarousel-clone", !0)), this.list().append(j), 
                            k || (l = {}, l[this.lt] = this.dimension(j), this.moveBy(l)), this._items = null;
                            this._scroll(j, c, d);
                        } else this._scroll(Math.min(h, n), c, d);
                    } else if (this.inTail) this._scroll(Math.max(this.index(this._first) - o + 1, 0), c, d); else if (g = this.index(this._first), 
                    f = this.index(this._target), i = this.underflow ? f : g, h = i - o, 0 >= i && (this.underflow && "circular" === p || "both" === p || "first" === p)) this._scroll(n, c, d); else if (this.circular && 0 > h) {
                        for (m = h, j = this.items().get(0); m++ < 0; ) {
                            j = this.items().eq(-1), k = this._visible.index(j) >= 0, k && j.after(j.clone(!0).attr("data-jcarousel-clone", !0)), 
                            this.list().prepend(j), this._items = null;
                            var r = this.dimension(j);
                            l = {}, l[this.lt] = -r, this.moveBy(l);
                        }
                        this._scroll(j, c, d);
                    } else this._scroll(Math.max(h, 0), c, d);
                } else this._scroll(e.target, c, d);
                return this._trigger("scrollend"), this;
            },
            moveBy: function(a, b) {
                var d = this.list().position(), e = 1, f = 0;
                return this.rtl && !this.vertical && (e = -1, this.relative && (f = this.list().width() - this.clipping())), 
                a.left && (a.left = d.left + f + c(a.left) * e + "px"), a.top && (a.top = d.top + f + c(a.top) * e + "px"), 
                this.move(a, b);
            },
            move: function(b, c) {
                c = c || {};
                var d = this.options("transitions"), e = !!d, f = !!d.transforms, g = !!d.transforms3d, h = c.duration || 0, i = this.list();
                if (!e && h > 0) return void i.animate(b, c);
                var j = c.complete || a.noop, k = {};
                if (e) {
                    var l = {
                        transitionDuration: i.css("transitionDuration"),
                        transitionTimingFunction: i.css("transitionTimingFunction"),
                        transitionProperty: i.css("transitionProperty")
                    }, m = j;
                    j = function() {
                        a(this).css(l), m.call(this);
                    }, k = {
                        transitionDuration: (h > 0 ? h / 1e3 : 0) + "s",
                        transitionTimingFunction: d.easing || c.easing,
                        transitionProperty: h > 0 ? function() {
                            return f || g ? "all" : b.left ? "left" : "top";
                        }() : "none",
                        transform: "none"
                    };
                }
                g ? k.transform = "translate3d(" + (b.left || 0) + "," + (b.top || 0) + ",0)" : f ? k.transform = "translate(" + (b.left || 0) + "," + (b.top || 0) + ")" : a.extend(k, b), 
                e && h > 0 && i.one("transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd", j), 
                i.css(k), 0 >= h && i.each(function() {
                    j.call(this);
                });
            },
            _scroll: function(b, c, d) {
                if (this.animating) return a.isFunction(d) && d.call(this, !1), this;
                if ("object" != typeof b ? b = this.items().eq(b) : "undefined" == typeof b.jquery && (b = a(b)), 
                0 === b.length) return a.isFunction(d) && d.call(this, !1), this;
                this.inTail = !1, this._prepare(b);
                var e = this._position(b), f = this.list().position()[this.lt];
                if (e === f) return a.isFunction(d) && d.call(this, !1), this;
                var g = {};
                return g[this.lt] = e + "px", this._animate(g, c, d), this;
            },
            _scrollTail: function(b, c) {
                if (this.animating || !this.tail) return a.isFunction(c) && c.call(this, !1), this;
                var d = this.list().position()[this.lt];
                this.rtl && this.relative && !this.vertical && (d += this.list().width() - this.clipping()), 
                this.rtl && !this.vertical ? d += this.tail : d -= this.tail, this.inTail = !0;
                var e = {};
                return e[this.lt] = d + "px", this._update({
                    target: this._target.next(),
                    fullyvisible: this._fullyvisible.slice(1).add(this._visible.last())
                }), this._animate(e, b, c), this;
            },
            _animate: function(b, c, d) {
                if (d = d || a.noop, !1 === this._trigger("animate")) return d.call(this, !1), this;
                this.animating = !0;
                var e = this.options("animation"), f = a.proxy(function() {
                    this.animating = !1;
                    var a = this.list().find("[data-jcarousel-clone]");
                    a.length > 0 && (a.remove(), this._reload()), this._trigger("animateend"), d.call(this, !0);
                }, this), g = "object" == typeof e ? a.extend({}, e) : {
                    duration: e
                }, h = g.complete || a.noop;
                return c === !1 ? g.duration = 0 : "undefined" != typeof a.fx.speeds[g.duration] && (g.duration = a.fx.speeds[g.duration]), 
                g.complete = function() {
                    f(), h.call(this);
                }, this.move(b, g), this;
            },
            _prepare: function(b) {
                var d, e, f, g, h = this.index(b), i = h, j = this.dimension(b), k = this.clipping(), l = this.vertical ? "bottom" : this.rtl ? "left" : "right", m = this.options("center"), n = {
                    target: b,
                    first: b,
                    last: b,
                    visible: b,
                    fullyvisible: k >= j ? b : a()
                };
                if (m && (j /= 2, k /= 2), k > j) for (;;) {
                    if (d = this.items().eq(++i), 0 === d.length) {
                        if (!this.circular) break;
                        if (d = this.items().eq(0), b.get(0) === d.get(0)) break;
                        if (e = this._visible.index(d) >= 0, e && d.after(d.clone(!0).attr("data-jcarousel-clone", !0)), 
                        this.list().append(d), !e) {
                            var o = {};
                            o[this.lt] = this.dimension(d), this.moveBy(o);
                        }
                        this._items = null;
                    }
                    if (g = this.dimension(d), 0 === g) break;
                    if (j += g, n.last = d, n.visible = n.visible.add(d), f = c(d.css("margin-" + l)), 
                    k >= j - f && (n.fullyvisible = n.fullyvisible.add(d)), j >= k) break;
                }
                if (!this.circular && !m && k > j) for (i = h; ;) {
                    if (--i < 0) break;
                    if (d = this.items().eq(i), 0 === d.length) break;
                    if (g = this.dimension(d), 0 === g) break;
                    if (j += g, n.first = d, n.visible = n.visible.add(d), f = c(d.css("margin-" + l)), 
                    k >= j - f && (n.fullyvisible = n.fullyvisible.add(d)), j >= k) break;
                }
                return this._update(n), this.tail = 0, m || "circular" === this.options("wrap") || "custom" === this.options("wrap") || this.index(n.last) !== this.items().length - 1 || (j -= c(n.last.css("margin-" + l)), 
                j > k && (this.tail = j - k)), this;
            },
            _position: function(a) {
                var b = this._first, c = b.position()[this.lt], d = this.options("center"), e = d ? this.clipping() / 2 - this.dimension(b) / 2 : 0;
                return this.rtl && !this.vertical ? (c -= this.relative ? this.list().width() - this.dimension(b) : this.clipping() - this.dimension(b), 
                c += e) : c -= e, !d && (this.index(a) > this.index(b) || this.inTail) && this.tail ? (c = this.rtl && !this.vertical ? c - this.tail : c + this.tail, 
                this.inTail = !0) : this.inTail = !1, -c;
            },
            _update: function(b) {
                var c, d = this, e = {
                    target: this._target,
                    first: this._first,
                    last: this._last,
                    visible: this._visible,
                    fullyvisible: this._fullyvisible
                }, f = this.index(b.first || e.first) < this.index(e.first), g = function(c) {
                    var g = [], h = [];
                    b[c].each(function() {
                        e[c].index(this) < 0 && g.push(this);
                    }), e[c].each(function() {
                        b[c].index(this) < 0 && h.push(this);
                    }), f ? g = g.reverse() : h = h.reverse(), d._trigger(c + "in", a(g)), d._trigger(c + "out", a(h)), 
                    d["_" + c] = b[c];
                };
                for (c in b) g(c);
                return this;
            }
        });
    }(jQuery, window), function(a) {
        "use strict";
        a.jcarousel.fn.scrollIntoView = function(b, c, d) {
            var e, f = a.jCarousel.parseTarget(b), g = this.index(this._fullyvisible.first()), h = this.index(this._fullyvisible.last());
            if (e = f.relative ? f.target < 0 ? Math.max(0, g + f.target) : h + f.target : "object" != typeof f.target ? f.target : this.index(f.target), 
            g > e) return this.scroll(e, c, d);
            if (e >= g && h >= e) return a.isFunction(d) && d.call(this, !1), this;
            for (var i, j = this.items(), k = this.clipping(), l = this.vertical ? "bottom" : this.rtl ? "left" : "right", m = 0; ;) {
                if (i = j.eq(e), 0 === i.length) break;
                if (m += this.dimension(i), m >= k) {
                    var n = parseFloat(i.css("margin-" + l)) || 0;
                    m - n !== k && e++;
                    break;
                }
                if (0 >= e) break;
                e--;
            }
            return this.scroll(e, c, d);
        };
    }(jQuery), function(a) {
        "use strict";
        a.jCarousel.plugin("jcarouselControl", {
            _options: {
                target: "+=1",
                event: "click",
                method: "scroll"
            },
            _active: null,
            _init: function() {
                this.onDestroy = a.proxy(function() {
                    this._destroy(), this.carousel().one("jcarousel:createend", a.proxy(this._create, this));
                }, this), this.onReload = a.proxy(this._reload, this), this.onEvent = a.proxy(function(b) {
                    b.preventDefault();
                    var c = this.options("method");
                    a.isFunction(c) ? c.call(this) : this.carousel().jcarousel(this.options("method"), this.options("target"));
                }, this);
            },
            _create: function() {
                this.carousel().one("jcarousel:destroy", this.onDestroy).on("jcarousel:reloadend jcarousel:scrollend", this.onReload), 
                this._element.on(this.options("event") + ".jcarouselcontrol", this.onEvent), this._reload();
            },
            _destroy: function() {
                this._element.off(".jcarouselcontrol", this.onEvent), this.carousel().off("jcarousel:destroy", this.onDestroy).off("jcarousel:reloadend jcarousel:scrollend", this.onReload);
            },
            _reload: function() {
                var b, c = a.jCarousel.parseTarget(this.options("target")), d = this.carousel();
                if (c.relative) b = d.jcarousel(c.target > 0 ? "hasNext" : "hasPrev"); else {
                    var e = "object" != typeof c.target ? d.jcarousel("items").eq(c.target) : c.target;
                    b = d.jcarousel("target").index(e) >= 0;
                }
                return this._active !== b && (this._trigger(b ? "active" : "inactive"), this._active = b), 
                this;
            }
        });
    }(jQuery), function(a) {
        "use strict";
        a.jCarousel.plugin("jcarouselPagination", {
            _options: {
                perPage: null,
                item: function(a) {
                    return '<a href="#' + a + '">' + a + "</a>";
                },
                event: "click",
                method: "scroll"
            },
            _carouselItems: null,
            _pages: {},
            _items: {},
            _currentPage: null,
            _init: function() {
                this.onDestroy = a.proxy(function() {
                    this._destroy(), this.carousel().one("jcarousel:createend", a.proxy(this._create, this));
                }, this), this.onReload = a.proxy(this._reload, this), this.onScroll = a.proxy(this._update, this);
            },
            _create: function() {
                this.carousel().one("jcarousel:destroy", this.onDestroy).on("jcarousel:reloadend", this.onReload).on("jcarousel:scrollend", this.onScroll), 
                this._reload();
            },
            _destroy: function() {
                this._clear(), this.carousel().off("jcarousel:destroy", this.onDestroy).off("jcarousel:reloadend", this.onReload).off("jcarousel:scrollend", this.onScroll), 
                this._carouselItems = null;
            },
            _reload: function() {
                var b = this.options("perPage");
                if (this._pages = {}, this._items = {}, a.isFunction(b) && (b = b.call(this)), null == b) this._pages = this._calculatePages(); else for (var c, d = parseInt(b, 10) || 0, e = this._getCarouselItems(), f = 1, g = 0; ;) {
                    if (c = e.eq(g++), 0 === c.length) break;
                    this._pages[f] = this._pages[f] ? this._pages[f].add(c) : c, g % d === 0 && f++;
                }
                this._clear();
                var h = this, i = this.carousel().data("jcarousel"), j = this._element, k = this.options("item"), l = this._getCarouselItems().length;
                a.each(this._pages, function(b, c) {
                    var d = h._items[b] = a(k.call(h, b, c));
                    d.on(h.options("event") + ".jcarouselpagination", a.proxy(function() {
                        var a = c.eq(0);
                        if (i.circular) {
                            var d = i.index(i.target()), e = i.index(a);
                            parseFloat(b) > parseFloat(h._currentPage) ? d > e && (a = "+=" + (l - d + e)) : e > d && (a = "-=" + (d + (l - e)));
                        }
                        i[this.options("method")](a);
                    }, h)), j.append(d);
                }), this._update();
            },
            _update: function() {
                var b, c = this.carousel().jcarousel("target");
                a.each(this._pages, function(a, d) {
                    return d.each(function() {
                        return c.is(this) ? (b = a, !1) : void 0;
                    }), b ? !1 : void 0;
                }), this._currentPage !== b && (this._trigger("inactive", this._items[this._currentPage]), 
                this._trigger("active", this._items[b])), this._currentPage = b;
            },
            items: function() {
                return this._items;
            },
            reloadCarouselItems: function() {
                return this._carouselItems = null, this;
            },
            _clear: function() {
                this._element.empty(), this._currentPage = null;
            },
            _calculatePages: function() {
                for (var a, b, c = this.carousel().data("jcarousel"), d = this._getCarouselItems(), e = c.clipping(), f = 0, g = 0, h = 1, i = {}; ;) {
                    if (a = d.eq(g++), 0 === a.length) break;
                    b = c.dimension(a), f + b > e && (h++, f = 0), f += b, i[h] = i[h] ? i[h].add(a) : a;
                }
                return i;
            },
            _getCarouselItems: function() {
                return this._carouselItems || (this._carouselItems = this.carousel().jcarousel("items")), 
                this._carouselItems;
            }
        });
    }(jQuery), function(a, b) {
        "use strict";
        var c, d, e = {
            hidden: "visibilitychange",
            mozHidden: "mozvisibilitychange",
            msHidden: "msvisibilitychange",
            webkitHidden: "webkitvisibilitychange"
        };
        a.each(e, function(a, e) {
            return "undefined" != typeof b[a] ? (c = a, d = e, !1) : void 0;
        }), a.jCarousel.plugin("jcarouselAutoscroll", {
            _options: {
                target: "+=1",
                interval: 3e3,
                autostart: !0
            },
            _timer: null,
            _started: !1,
            _init: function() {
                this.onDestroy = a.proxy(function() {
                    this._destroy(), this.carousel().one("jcarousel:createend", a.proxy(this._create, this));
                }, this), this.onAnimateEnd = a.proxy(this._start, this), this.onVisibilityChange = a.proxy(function() {
                    b[c] ? this._stop() : this._start();
                }, this);
            },
            _create: function() {
                this.carousel().one("jcarousel:destroy", this.onDestroy), a(b).on(d, this.onVisibilityChange), 
                this.options("autostart") && this.start();
            },
            _destroy: function() {
                this._stop(), this.carousel().off("jcarousel:destroy", this.onDestroy), a(b).off(d, this.onVisibilityChange);
            },
            _start: function() {
                return this._stop(), this._started ? (this.carousel().one("jcarousel:animateend", this.onAnimateEnd), 
                this._timer = setTimeout(a.proxy(function() {
                    this.carousel().jcarousel("scroll", this.options("target"));
                }, this), this.options("interval")), this) : void 0;
            },
            _stop: function() {
                return this._timer && (this._timer = clearTimeout(this._timer)), this.carousel().off("jcarousel:animateend", this.onAnimateEnd), 
                this;
            },
            start: function() {
                return this._started = !0, this._start(), this;
            },
            stop: function() {
                return this._started = !1, this._stop(), this;
            }
        });
    }(jQuery, document);
});

define("dist/js/1.0.0/depends/gallary-carousels-debug", [ "$-debug", "dist/js/1.0.0/depends/jquery.jcarousel.min-debug" ], function(require, exports, module) {
    var $ = jQuery = require("$-debug");
    var jcarousel = require("dist/js/1.0.0/depends/jquery.jcarousel.min-debug");
    (function($) {
        // This is the connector function.
        // It connects one item from the navigation carousel to one item from the
        // stage carousel.
        // The default behaviour is, to connect items with the same index from both
        // carousels. This might _not_ work with circular carousels!
        var connector = function(itemNavigation, carouselStage) {
            return carouselStage.jcarousel("items").eq(itemNavigation.index());
        };
        $(function() {
            // Setup the carousels. Adjust the options for both carousels here.
            var carouselStage = $(".carousel-stage").jcarousel();
            var carouselNavigation = $(".carousel-navigation").jcarousel();
            // We loop through the items of the navigation carousel and set it up
            // as a control for an item from the stage carousel.
            carouselNavigation.jcarousel("items").each(function() {
                var item = $(this);
                // This is where we actually connect to items.
                var target = connector(item, carouselStage);
                item.on("jcarouselcontrol:active", function() {
                    carouselNavigation.jcarousel("scrollIntoView", this);
                    item.addClass("active");
                }).on("jcarouselcontrol:inactive", function() {
                    item.removeClass("active");
                }).jcarouselControl({
                    target: target,
                    carousel: carouselStage
                });
            });
            // Setup controls for the stage carousel
            $(".prev-stage").on("jcarouselcontrol:inactive", function() {
                $(this).addClass("inactive");
            }).on("jcarouselcontrol:active", function() {
                $(this).removeClass("inactive");
            }).jcarouselControl({
                target: "-=1"
            });
            $(".next-stage").on("jcarouselcontrol:inactive", function() {
                $(this).addClass("inactive");
            }).on("jcarouselcontrol:active", function() {
                $(this).removeClass("inactive");
            }).jcarouselControl({
                target: "+=1"
            });
            // Setup controls for the navigation carousel
            $(".prev-navigation").on("jcarouselcontrol:inactive", function() {
                $(this).addClass("inactive");
            }).on("jcarouselcontrol:active", function() {
                $(this).removeClass("inactive");
            }).jcarouselControl({
                target: "-=1"
            });
            $(".next-navigation").on("jcarouselcontrol:inactive", function() {
                $(this).addClass("inactive");
            }).on("jcarouselcontrol:active", function() {
                $(this).removeClass("inactive");
            }).jcarouselControl({
                target: "+=1"
            });
        });
    })(jQuery);
});

define("dist/js/1.0.0/zmall/toolTips-debug", [ "$-debug", "dist/js/1.0.0/depends/bootstrap/tooltip-debug", "dist/js/1.0.0/depends/bootstrap/modal-debug" ], function(require) {
    var $ = jQuery = require("$-debug");
    var tooltips = require("dist/js/1.0.0/depends/bootstrap/tooltip-debug");
    var tooltips = require("dist/js/1.0.0/depends/bootstrap/modal-debug");
    //call normal tooltips
    $('[data-toggle="tooltip"]').tooltip();
    //call tooltips for chat part in rights modal
    $("#modal_right").on("shown.bs.modal", function() {
        $('[data-toggle="chatTip"]').tooltip({
            trigger: "mamual",
            html: "true",
            autoPosition: "true",
            template: '<div class="media-body tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
        }).tooltip("show");
    });
});

define("dist/js/1.0.0/depends/bootstrap/tooltip-debug", [ "$-debug" ], function(require, exports, module) {
    var $ = jQuery = require("$-debug");
    /* ========================================================================
 * Bootstrap: tooltip.js v3.3.5
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
    +function($) {
        "use strict";
        // TOOLTIP PUBLIC CLASS DEFINITION
        // ===============================
        var Tooltip = function(element, options) {
            this.type = null;
            this.options = null;
            this.enabled = null;
            this.timeout = null;
            this.hoverState = null;
            this.$element = null;
            this.inState = null;
            this.init("tooltip", element, options);
        };
        Tooltip.VERSION = "3.3.5";
        Tooltip.TRANSITION_DURATION = 150;
        Tooltip.DEFAULTS = {
            animation: true,
            placement: "top",
            selector: false,
            template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
            trigger: "hover focus",
            title: "",
            delay: 0,
            html: false,
            container: false,
            autoPosition: false,
            // option to insert the tool tip before the element when the placement's left
            viewport: {
                selector: "body",
                padding: 0
            }
        };
        Tooltip.prototype.init = function(type, element, options) {
            this.enabled = true;
            this.type = type;
            this.$element = $(element);
            this.options = this.getOptions(options);
            this.$viewport = this.options.viewport && $($.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : this.options.viewport.selector || this.options.viewport);
            this.inState = {
                click: false,
                hover: false,
                focus: false
            };
            if (this.$element[0] instanceof document.constructor && !this.options.selector) {
                throw new Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");
            }
            var triggers = this.options.trigger.split(" ");
            for (var i = triggers.length; i--; ) {
                var trigger = triggers[i];
                if (trigger == "click") {
                    this.$element.on("click." + this.type, this.options.selector, $.proxy(this.toggle, this));
                } else if (trigger != "manual") {
                    var eventIn = trigger == "hover" ? "mouseenter" : "focusin";
                    var eventOut = trigger == "hover" ? "mouseleave" : "focusout";
                    this.$element.on(eventIn + "." + this.type, this.options.selector, $.proxy(this.enter, this));
                    this.$element.on(eventOut + "." + this.type, this.options.selector, $.proxy(this.leave, this));
                }
            }
            this.options.selector ? this._options = $.extend({}, this.options, {
                trigger: "manual",
                selector: ""
            }) : this.fixTitle();
        };
        Tooltip.prototype.getDefaults = function() {
            return Tooltip.DEFAULTS;
        };
        Tooltip.prototype.getOptions = function(options) {
            options = $.extend({}, this.getDefaults(), this.$element.data(), options);
            if (options.delay && typeof options.delay == "number") {
                options.delay = {
                    show: options.delay,
                    hide: options.delay
                };
            }
            return options;
        };
        Tooltip.prototype.getDelegateOptions = function() {
            var options = {};
            var defaults = this.getDefaults();
            this._options && $.each(this._options, function(key, value) {
                if (defaults[key] != value) options[key] = value;
            });
            return options;
        };
        Tooltip.prototype.enter = function(obj) {
            var self = obj instanceof this.constructor ? obj : $(obj.currentTarget).data("bs." + this.type);
            if (!self) {
                self = new this.constructor(obj.currentTarget, this.getDelegateOptions());
                $(obj.currentTarget).data("bs." + this.type, self);
            }
            if (obj instanceof $.Event) {
                self.inState[obj.type == "focusin" ? "focus" : "hover"] = true;
            }
            if (self.tip().hasClass("in") || self.hoverState == "in") {
                self.hoverState = "in";
                return;
            }
            clearTimeout(self.timeout);
            self.hoverState = "in";
            if (!self.options.delay || !self.options.delay.show) return self.show();
            self.timeout = setTimeout(function() {
                if (self.hoverState == "in") self.show();
            }, self.options.delay.show);
        };
        Tooltip.prototype.isInStateTrue = function() {
            for (var key in this.inState) {
                if (this.inState[key]) return true;
            }
            return false;
        };
        Tooltip.prototype.leave = function(obj) {
            var self = obj instanceof this.constructor ? obj : $(obj.currentTarget).data("bs." + this.type);
            if (!self) {
                self = new this.constructor(obj.currentTarget, this.getDelegateOptions());
                $(obj.currentTarget).data("bs." + this.type, self);
            }
            if (obj instanceof $.Event) {
                self.inState[obj.type == "focusout" ? "focus" : "hover"] = false;
            }
            if (self.isInStateTrue()) return;
            clearTimeout(self.timeout);
            self.hoverState = "out";
            if (!self.options.delay || !self.options.delay.hide) return self.hide();
            self.timeout = setTimeout(function() {
                if (self.hoverState == "out") self.hide();
            }, self.options.delay.hide);
        };
        Tooltip.prototype.show = function() {
            var e = $.Event("show.bs." + this.type);
            if (this.hasContent() && this.enabled) {
                this.$element.trigger(e);
                var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
                if (e.isDefaultPrevented() || !inDom) return;
                var that = this;
                var $tip = this.tip();
                var tipId = this.getUID(this.type);
                this.setContent();
                $tip.attr("id", tipId);
                this.$element.attr("aria-describedby", tipId);
                if (this.options.animation) $tip.addClass("fade");
                var placement = typeof this.options.placement == "function" ? this.options.placement.call(this, $tip[0], this.$element[0]) : this.options.placement;
                var autoToken = /\s?auto?\s?/i;
                var autoPlace = autoToken.test(placement);
                if (autoPlace) placement = placement.replace(autoToken, "") || "top";
                $tip.detach().css({
                    top: 0,
                    left: 0,
                    display: "block"
                }).addClass(placement).data("bs." + this.type, this);
                this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element);
                // insert before the element when the placement's left
                if (this.options.autoPosition) {
                    if (placement == "right") {
                        $tip.insertAfter(this.$element);
                    } else if (placement == "left") {
                        $tip.css("text-align", "right");
                        //fix the align issue for display inline-block condition
                        $tip.insertBefore(this.$element);
                    }
                }
                this.$element.trigger("inserted.bs." + this.type);
                var pos = this.getPosition();
                var actualWidth = $tip[0].offsetWidth;
                var actualHeight = $tip[0].offsetHeight;
                if (autoPlace) {
                    var orgPlacement = placement;
                    var viewportDim = this.getPosition(this.$viewport);
                    placement = placement == "bottom" && pos.bottom + actualHeight > viewportDim.bottom ? "top" : placement == "top" && pos.top - actualHeight < viewportDim.top ? "bottom" : placement == "right" && pos.right + actualWidth > viewportDim.width ? "left" : placement == "left" && pos.left - actualWidth < viewportDim.left ? "right" : placement;
                    $tip.removeClass(orgPlacement).addClass(placement);
                }
                var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight);
                this.applyPlacement(calculatedOffset, placement);
                var complete = function() {
                    var prevHoverState = that.hoverState;
                    that.$element.trigger("shown.bs." + that.type);
                    that.hoverState = null;
                    if (prevHoverState == "out") that.leave(that);
                };
                $.support.transition && this.$tip.hasClass("fade") ? $tip.one("bsTransitionEnd", complete).emulateTransitionEnd(Tooltip.TRANSITION_DURATION) : complete();
            }
        };
        Tooltip.prototype.applyPlacement = function(offset, placement) {
            var $tip = this.tip();
            var width = $tip[0].offsetWidth;
            var height = $tip[0].offsetHeight;
            // manually read margins because getBoundingClientRect includes difference
            var marginTop = parseInt($tip.css("margin-top"), 10);
            var marginLeft = parseInt($tip.css("margin-left"), 10);
            // we must check for NaN for ie 8/9
            if (isNaN(marginTop)) marginTop = 0;
            if (isNaN(marginLeft)) marginLeft = 0;
            offset.top += marginTop;
            offset.left += marginLeft;
            // $.fn.offset doesn't round pixel values
            // so we use setOffset directly with our own function B-0
            $.offset.setOffset($tip[0], $.extend({
                using: function(props) {
                    $tip.css({
                        top: Math.round(props.top),
                        left: Math.round(props.left)
                    });
                }
            }, offset), 0);
            $tip.addClass("in");
            // check to see if placing tip in new offset caused the tip to resize itself
            var actualWidth = $tip[0].offsetWidth;
            var actualHeight = $tip[0].offsetHeight;
            if (placement == "top" && actualHeight != height) {
                offset.top = offset.top + height - actualHeight;
            }
            var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight);
            if (delta.left) offset.left += delta.left; else offset.top += delta.top;
            var isVertical = /top|bottom/.test(placement);
            var arrowDelta = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight;
            var arrowOffsetPosition = isVertical ? "offsetWidth" : "offsetHeight";
            $tip.offset(offset);
            this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical);
        };
        Tooltip.prototype.replaceArrow = function(delta, dimension, isVertical) {
            this.arrow().css(isVertical ? "left" : "top", 50 * (1 - delta / dimension) + "%").css(isVertical ? "top" : "left", "");
        };
        Tooltip.prototype.setContent = function() {
            var $tip = this.tip();
            var title = this.getTitle();
            $tip.find(".tooltip-inner")[this.options.html ? "html" : "text"](title);
            $tip.removeClass("fade in top bottom left right");
        };
        Tooltip.prototype.hide = function(callback) {
            var that = this;
            var $tip = $(this.$tip);
            var e = $.Event("hide.bs." + this.type);
            function complete() {
                if (that.hoverState != "in") $tip.detach();
                that.$element.removeAttr("aria-describedby").trigger("hidden.bs." + that.type);
                callback && callback();
            }
            this.$element.trigger(e);
            if (e.isDefaultPrevented()) return;
            $tip.removeClass("in");
            $.support.transition && $tip.hasClass("fade") ? $tip.one("bsTransitionEnd", complete).emulateTransitionEnd(Tooltip.TRANSITION_DURATION) : complete();
            this.hoverState = null;
            return this;
        };
        Tooltip.prototype.fixTitle = function() {
            var $e = this.$element;
            if ($e.attr("title") || typeof $e.attr("data-original-title") != "string") {
                $e.attr("data-original-title", $e.attr("title") || "").attr("title", "");
            }
        };
        Tooltip.prototype.hasContent = function() {
            return this.getTitle();
        };
        Tooltip.prototype.getPosition = function($element) {
            $element = $element || this.$element;
            var el = $element[0];
            var isBody = el.tagName == "BODY";
            var elRect = el.getBoundingClientRect();
            if (elRect.width == null) {
                // width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
                elRect = $.extend({}, elRect, {
                    width: elRect.right - elRect.left,
                    height: elRect.bottom - elRect.top
                });
            }
            var elOffset = isBody ? {
                top: 0,
                left: 0
            } : $element.offset();
            var scroll = {
                scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop()
            };
            var outerDims = isBody ? {
                width: $(window).width(),
                height: $(window).height()
            } : null;
            return $.extend({}, elRect, scroll, outerDims, elOffset);
        };
        Tooltip.prototype.getCalculatedOffset = function(placement, pos, actualWidth, actualHeight) {
            return placement == "bottom" ? {
                top: pos.top + pos.height,
                left: pos.left + pos.width / 2 - actualWidth / 2
            } : placement == "top" ? {
                top: pos.top - actualHeight,
                left: pos.left + pos.width / 2 - actualWidth / 2
            } : placement == "left" ? {
                top: pos.top + pos.height / 2 - actualHeight / 2,
                left: pos.left - actualWidth
            } : /* placement == 'right' */
            {
                top: pos.top + pos.height / 2 - actualHeight / 2,
                left: pos.left + pos.width
            };
        };
        Tooltip.prototype.getViewportAdjustedDelta = function(placement, pos, actualWidth, actualHeight) {
            var delta = {
                top: 0,
                left: 0
            };
            if (!this.$viewport) return delta;
            var viewportPadding = this.options.viewport && this.options.viewport.padding || 0;
            var viewportDimensions = this.getPosition(this.$viewport);
            if (/right|left/.test(placement)) {
                var topEdgeOffset = pos.top - viewportPadding - viewportDimensions.scroll;
                var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight;
                if (topEdgeOffset < viewportDimensions.top) {
                    // top overflow
                    delta.top = viewportDimensions.top - topEdgeOffset;
                } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) {
                    // bottom overflow
                    delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset;
                }
            } else {
                var leftEdgeOffset = pos.left - viewportPadding;
                var rightEdgeOffset = pos.left + viewportPadding + actualWidth;
                if (leftEdgeOffset < viewportDimensions.left) {
                    // left overflow
                    delta.left = viewportDimensions.left - leftEdgeOffset;
                } else if (rightEdgeOffset > viewportDimensions.right) {
                    // right overflow
                    delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset;
                }
            }
            return delta;
        };
        Tooltip.prototype.getTitle = function() {
            var title;
            var $e = this.$element;
            var o = this.options;
            title = $e.attr("data-original-title") || (typeof o.title == "function" ? o.title.call($e[0]) : o.title);
            return title;
        };
        Tooltip.prototype.getUID = function(prefix) {
            do prefix += ~~(Math.random() * 1e6); while (document.getElementById(prefix));
            return prefix;
        };
        Tooltip.prototype.tip = function() {
            if (!this.$tip) {
                this.$tip = $(this.options.template);
                if (this.$tip.length != 1) {
                    throw new Error(this.type + " `template` option must consist of exactly 1 top-level element!");
                }
            }
            return this.$tip;
        };
        Tooltip.prototype.arrow = function() {
            return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow");
        };
        Tooltip.prototype.enable = function() {
            this.enabled = true;
        };
        Tooltip.prototype.disable = function() {
            this.enabled = false;
        };
        Tooltip.prototype.toggleEnabled = function() {
            this.enabled = !this.enabled;
        };
        Tooltip.prototype.toggle = function(e) {
            var self = this;
            if (e) {
                self = $(e.currentTarget).data("bs." + this.type);
                if (!self) {
                    self = new this.constructor(e.currentTarget, this.getDelegateOptions());
                    $(e.currentTarget).data("bs." + this.type, self);
                }
            }
            if (e) {
                self.inState.click = !self.inState.click;
                if (self.isInStateTrue()) self.enter(self); else self.leave(self);
            } else {
                self.tip().hasClass("in") ? self.leave(self) : self.enter(self);
            }
        };
        Tooltip.prototype.destroy = function() {
            var that = this;
            clearTimeout(this.timeout);
            this.hide(function() {
                that.$element.off("." + that.type).removeData("bs." + that.type);
                if (that.$tip) {
                    that.$tip.detach();
                }
                that.$tip = null;
                that.$arrow = null;
                that.$viewport = null;
            });
        };
        // TOOLTIP PLUGIN DEFINITION
        // =========================
        function Plugin(option) {
            return this.each(function() {
                var $this = $(this);
                var data = $this.data("bs.tooltip");
                var options = typeof option == "object" && option;
                if (!data && /destroy|hide/.test(option)) return;
                if (!data) $this.data("bs.tooltip", data = new Tooltip(this, options));
                if (typeof option == "string") data[option]();
            });
        }
        var old = $.fn.tooltip;
        $.fn.tooltip = Plugin;
        $.fn.tooltip.Constructor = Tooltip;
        // TOOLTIP NO CONFLICT
        // ===================
        $.fn.tooltip.noConflict = function() {
            $.fn.tooltip = old;
            return this;
        };
    }(jQuery);
});

define("dist/js/1.0.0/zmall/cartFly-debug", [ "$-debug", "dist/js/1.0.0/depends/fly-debug" ], function(require) {
    var $ = jQuery = require("$-debug");
    var flyJs = require("dist/js/1.0.0/depends/fly-debug");
    $(".detail-promo-para .btn-lg").click(function() {
        //avoid combo
        if ($(this).attr("disabled")) return false;
        var cart_icon = $(this).children(".glyphicon-shopping-cart"), //add to cart button
        cart_nav = $(".navbar-search .glyphicon-shopping-cart");
        //cart button on top nav
        //create the mini cart token to fly
        $("body").append('<button class="btn btn-warning btn-lg mini-cart-fly img-circle text-center"><i class="glyphicon glyphicon-shopping-cart"></i></button>');
        //init the token's top and left para
        $(".mini-cart-fly").css({
            position: "absolute",
            "z-index": "9999",
            "padding-left": "0",
            "padding-right": "0",
            width: "43px",
            top: cart_icon.offset().top,
            left: cart_icon.offset().left
        });
        //options
        $(".mini-cart-fly").fly({
            start: {
                top: cart_icon.offset().top - $(document).scrollTop() - 12,
                // offset top minus scrolled height minus padding top offset
                left: cart_icon.offset().left - 17
            },
            end: {
                top: cart_nav.offset().top - $(document).scrollTop() - 12,
                left: cart_nav.offset().left - 17
            },
            onEnd: function() {
                this.destroy();
            }
        });
        //disable the button
        $(this).attr("disabled", true);
        //run the animation and recover the button
        setTimeout(function() {
            var mini_cart_num = $(".navbar-search .badge").html();
            $(".navbar-search .badge").addClass("shine").html(++mini_cart_num);
            setTimeout(function() {
                $(".navbar-search .badge").removeClass("shine");
            }, 200);
            $(".detail-promo-para .btn-lg").removeAttr("disabled");
        }, 700);
    });
});

define("dist/js/1.0.0/depends/fly-debug", [ "$-debug" ], function(require, exports, module) {
    //cmdized
    var $ = jQuery = require("$-debug");
    /*
     * jquery.fly
     * 
     * 抛物线动画
     * @github https://github.com/amibug/fly
     * Copyright (c) 2014 wuyuedong
     * copy from tmall.com
     */
    // (function ($) {
    $.fly = function(element, options) {
        // 默认值
        var defaults = {
            version: "1.0.0",
            autoPlay: true,
            vertex_Rtop: 10,
            // 默认顶点高度top值
            speed: 1.5,
            start: {},
            // top, left, width, height
            end: {},
            onEnd: $.noop
        };
        var self = this, $element = $(element);
        /**
         * 初始化组件，new的时候即调用
         */
        self.init = function(options) {
            this.setOptions(options);
            !!this.settings.autoPlay && this.play();
        };
        /**
         * 设置组件参数
         */
        self.setOptions = function(options) {
            this.settings = $.extend(true, {}, defaults, options);
            var settings = this.settings, start = settings.start, end = settings.end;
            $element.css({
                marginTop: "0px",
                marginLeft: "0px",
                position: "fixed"
            }).appendTo("body");
            // 运动过程中有改变大小
            if (end.width != null && end.height != null) {
                $.extend(true, start, {
                    width: $element.width(),
                    height: $element.height()
                });
            }
            // 运动轨迹最高点top值
            var vertex_top = Math.min(start.top, end.top) - Math.abs(start.left - end.left) / 3;
            if (vertex_top < settings.vertex_Rtop) {
                // 可能出现起点或者终点就是运动曲线顶点的情况
                vertex_top = Math.min(settings.vertex_Rtop, Math.min(start.top, end.top));
            }
            /**
             * ======================================================
             * 运动轨迹在页面中的top值可以抽象成函数 y = a * x*x + b;
             * a = curvature
             * b = vertex_top
             * ======================================================
             */
            var distance = Math.sqrt(Math.pow(start.top - end.top, 2) + Math.pow(start.left - end.left, 2)), // 元素移动次数
            steps = Math.ceil(Math.min(Math.max(Math.log(distance) / .05 - 75, 30), 100) / settings.speed), ratio = start.top == vertex_top ? 0 : -Math.sqrt((end.top - vertex_top) / (start.top - vertex_top)), vertex_left = (ratio * start.left - end.left) / (ratio - 1), // 特殊情况，出现顶点left==终点left，将曲率设置为0，做直线运动。
            curvature = end.left == vertex_left ? 0 : (end.top - vertex_top) / Math.pow(end.left - vertex_left, 2);
            $.extend(true, settings, {
                count: -1,
                // 每次重置为-1
                steps: steps,
                vertex_left: vertex_left,
                vertex_top: vertex_top,
                curvature: curvature
            });
        };
        /**
         * 开始运动，可自己调用
         */
        self.play = function() {
            this.move();
        };
        /**
         * 按step运动
         */
        self.move = function() {
            var settings = this.settings, start = settings.start, count = settings.count, steps = settings.steps, end = settings.end;
            // 计算left top值
            var left = start.left + (end.left - start.left) * count / steps, top = settings.curvature == 0 ? start.top + (end.top - start.top) * count / steps : settings.curvature * Math.pow(left - settings.vertex_left, 2) + settings.vertex_top;
            // 运动过程中有改变大小
            if (end.width != null && end.height != null) {
                var i = steps / 2, width = end.width - (end.width - start.width) * Math.cos(count < i ? 0 : (count - i) / (steps - i) * Math.PI / 2), height = end.height - (end.height - start.height) * Math.cos(count < i ? 0 : (count - i) / (steps - i) * Math.PI / 2);
                $element.css({
                    width: width + "px",
                    height: height + "px",
                    "font-size": Math.min(width, height) + "px"
                });
            }
            $element.css({
                left: left + "px",
                top: top + "px"
            });
            settings.count++;
            // 定时任务
            var time = window.requestAnimationFrame($.proxy(this.move, this));
            if (count == steps) {
                window.cancelAnimationFrame(time);
                // fire callback
                settings.onEnd.apply(this);
            }
        };
        /**
         * 销毁
         */
        self.destroy = function() {
            $element.remove();
        };
        self.init(options);
    };
    // add the plugin to the jQuery.fn object
    $.fn.fly = function(options) {
        return this.each(function() {
            if (undefined == $(this).data("fly")) {
                $(this).data("fly", new $.fly(this, options));
            }
        });
    };
});

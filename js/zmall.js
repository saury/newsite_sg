$(function() {
    //zmall modual init
    var zmModual = (function() {
        var navOffset = 80;
        //checkbox toggle
        $(".zm-checkbox input").change(function() {
            var ele = $(this);
            if (this.checked) {
                ele.parent().children("i").css("display", "inline");
            } else {
                ele.parent().children("i").css("display", "none");
            }
        });
        //scrollspy for brands page
        $('.zmBrandsPage').scrollspy({
            target: '#brandNav',
            offset: navOffset + 1
        });
        //disable all the form's submit function
        $("form").submit(function() {
            return false
        });
        //general affix overflow
        function callAffixOverflow() {
            $('[data-affix="overflow"]').each(function() {
                var ele = $(this);
                var offsetTop = ele.offset().top - $(window).height() - parseInt(ele.css("margin-top").split("px")[0]);
                //affix top = offset to top - element's margin-top - window's height
                ele.affix("destroy"); //destroy the affix function berfore
                if (offsetTop < 0) return false; //no affix while it is not overflow
                ele.affix({
                    offset: {
                        top: function() {
                            return offsetTop; // distance to the top
                        }
                    }
                });
            });
        };
        //active the login or register tab
        function logOrReg(opt) {
            // body...
            switch (opt) {
                case "log":
                    $("#myLogin .nav-tabs li").eq(0).children("a").trigger("click");
                    break;
                default:
                    $("#myLogin .nav-tabs li").eq(1).children("a").trigger("click");
            }
        };

        // function for setting the html template of the cart details
        function setCartContent(item, overflow) {
            //hide the "You have xx more items" when the num is 0
            if (overflow) var _overflowStr = '<div class="mini-cart-hint cf"><p class="fll">You have <em>' + overflow + '</em> more items</p><p class="flr">Total: <em>S$234.23</em></p></div>';
            else _overflowStr = '';
            var _item = '<li class="mini-cart-item pure-g"><div class="pure-u-1-6"><img src="img/brands-thumb.jpg" class="img-responsive"></div><div class="pure-u-7-12"><p>Content content content</p><span>color: 1 Size: M</span></div><div class="pure-u-1-4 text-right"><em>S$234.56</em><a href="#" class="btn btn-warning hollow btn-xs">Delete</a></div><li><li class="mini-cart-item pure-g"><div class="pure-u-1-6"><img src="img/brands-thumb.jpg" class="img-responsive"></div><div class="pure-u-7-12"><p>Content content content</p><span>color: 1 Size: M</span></div><div class="pure-u-1-4 text-right"><em>S$234.56</em><a href="#" class="btn btn-warning hollow btn-xs">Delete</a></div><li><li class="mini-cart-item pure-g"><div class="pure-u-1-6"><img src="img/brands-thumb.jpg" class="img-responsive"></div><div class="pure-u-7-12"><p>Content content content</p><span>color: 1 Size: M</span></div><div class="pure-u-1-4 text-right"><em>S$234.56</em><a href="#" class="btn btn-warning hollow btn-xs">Delete</a></div><li>';
            // for (var i = 0; i < item.length; i++) {
            //     _item += "<li>"+item[i]+"</li>";
            // }

            //return the whole cart list string
            return '<ul class="list-unstyled mini-cart">' +
                _item +
                '</ul>' +
                _overflowStr +
                '<a class="btn btn-warning btn-sm flr" href="#">Checking my cart</a>';
        };

        //function for the floor jumping
        function scrollToPosition(dom) {
            $("html, body").animate({
                scrollTop: dom.offset().top - navOffset + "px"
            }, {
                duration: 300,
                easing: "swing"
            });
            return false;
        };

        //return all the functions
        return {
            navOffset: navOffset,
            setCartCnt: setCartContent,
            scroll: scrollToPosition,
            login: logOrReg,
            callAOF: callAffixOverflow
        };
    })();
    // bootstrap dropdown
    $('.dropdown-toggle').dropdown();
    // bootstrap carousel
    $('.carousel').carousel();
    // bootstrap popover
    $('[data-toggle="popover"]').each(function() {
        var element = $(this);
        var tiktak = function() {};
        var item = ["aaa", "bbb", "ccc", "ddd", "eee", "fff"]; //商品内容
        var overflow = item.length > 5 ? (item.length - 5) : 0; //超出商品显示限制条数
        element.on("mouseenter", function() {
            element.popover({
                trigger: 'manual',
                placement: 'bottom',
                html: 'true',
                content: zmModual.setCartCnt(item, overflow)
            });
            clearTimeout(tiktak);
            element.popover("show");
            element.siblings(".popover").on("mouseleave", function() {
                //element.popover('hide');
                element.popover('destroy');
            });
        }).on("mouseleave", function() {
            item = ["aaa", "bbb", "ccc", "ddd", "eee"];
            overflow = item.length > 5 ? (item.length - 5) : 0;
            tiktak = setTimeout(function() {
                if (!$(".popover:hover").length) {
                    //element.popover("hide");
                    element.popover('destroy');
                }
            }, 500);
        });
    });
    //reset all the form value
    $("input[type=reset]").trigger("click");
    // init the href
    $("*").click(function() {
        var linkHref = $(this).attr("data-href");
        if (linkHref) window.location.href = linkHref; //window.open(linkHref);
    });
    //nav scroll watch  
    $(window).scroll(function() {
        //hide the part of the nav when scrolled height > 80px
        if ($(document).scrollTop() > zmModual.navOffset) {
            $("header").addClass("hide");
        } else {
            //recover  
            $("header").removeClass("hide");
        }
    });
    //click to active the login or register tab
    $('[data-target="#myLogin"]').each(function() {
        var element = $(this);
        var opt = element.attr("data-active");
        element.on("click", function() {
            zmModual.login(opt)
        });
    });
    //hover to show the category detail in banner left side
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
    //floor jump
    //go down
    $(".glyphicon-chevron-down").click(function() {
        var index = $(".glyphicon-chevron-down").index(this) + 1;
        var dom = $("#floor_" + (index + 1));
        //to bottom if it's the last icon-down
        if (index == $(".glyphicon-chevron-down").length) {
            dom = $("footer");
        }
        zmModual.scroll(dom);
    });
    //go up
    $(".glyphicon-chevron-up").click(function() {
        var index = $(".glyphicon-chevron-up").index(this);
        var dom = $("#floor_" + (index));
        //back to top if it's the 1st icon-up
        if (index == 0) {
            dom = $("html");
        }
        zmModual.scroll(dom);
    });
    //brands floor nav - click jump
    $("#brandNav a").each(function() {
        var element = $(this);
        var dom = element.attr("href");
        element.click(function() {
            zmModual.scroll($(dom));
            return false; //prevent default anchor jumping
        })
    });
    //item detail gallary (optional)
    $('.carousel-stage').jcarousel({
        // Configuration goes here
    }).on('jcarousel:targetin', 'li', function(event, carousel) {
        // lazyload
        var element = $(this).find("img");
        var src_cur = element.attr("ssrc");
        element.attr("src", src_cur);
    });
    //active toggle
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
    //call Affix Overflow
    zmModual.callAOF();
    // gallary photo override
    $("[gallary-override]").each(function() {
        var ele = $(this),
            target = $(".detail-gallary-override");
        var arg = ele.attr("gallary-override");
        ele.on("click", function() {
            if (arg == "true") target.show();
            else target.hide();
        });
    });
    //account page
    //left menu accordion
    $('.collapse').on('show.bs.collapse', function() {
        var prntEle = $(this).parent();
        prntEle.find(".glyphicon-chevron-down").addClass("rotate");
        prntEle.siblings().children('.collapse').collapse('hide');
    }).on('hide.bs.collapse', function() {
        $(this).parent().find(".glyphicon-chevron-down").removeClass("rotate");
    });
});

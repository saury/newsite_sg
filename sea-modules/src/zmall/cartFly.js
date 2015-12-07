define(function(require) {
    var $ = jQuery = require('$');
    var flyJs = require('../depends/fly.js');

    $('.detail-promo-para .btn-lg').click(function() {
        //avoid combo
        if ($(this).attr("disabled")) return false;

        var cart_icon = $(this).children(".glyphicon-shopping-cart"), //add to cart button
            cart_nav = $('.navbar-search .glyphicon-shopping-cart'); //cart button on top nav

        //create the mini cart token to fly
        $("body").append('<button class="btn btn-warning btn-lg mini-cart-fly img-circle text-center"><i class="glyphicon glyphicon-shopping-cart"></i></button>');

        //init the token's top and left para
        $(".mini-cart-fly").css({
            'position': 'absolute',
            'z-index': '9999',
            'padding-left': '0',
            'padding-right': '0',
            'width': '43px',
            'top': cart_icon.offset().top,
            'left': cart_icon.offset().left
        });

        //options
        $(".mini-cart-fly").fly({
            start: {
                top: cart_icon.offset().top - $(document).scrollTop() - 12, // offset top minus scrolled height minus padding top offset
                left: cart_icon.offset().left - 17 // offset top minus minus padding left offset
            },
            end: {
                top: cart_nav.offset().top - $(document).scrollTop() - 12,
                left: cart_nav.offset().left - 17,
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
            $('.detail-promo-para .btn-lg').removeAttr("disabled");
        }, 700);
    });
});

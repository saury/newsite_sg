define(function(require) {
    var $ = jQuery = require('$');
    var lightbox = require('../depends/bootstrap/popover.js');
    // function for setting the html template of the cart details
    function setCartContent(item, overflow) {
        //hide the "You have xx more items" when the num is 0
        if (overflow) var _overflowStr = '<div class="mini-cart-hint cf"><p class="fll">You have <em>' + overflow + '</em> more items</p><p class="flr">Total: <em>S$234.23</em></p></div>';
        else _overflowStr = '';
        var _item = '';
        $.each(item, function(i, data) {
            _item += '<li class="mini-cart-item pure-g"><div class="pure-u-1-6"><img src="' + data.cart_p_image + '" class="img-responsive"></div><div class="pure-u-7-12"><p>' + data.cart_p_name + '</p><span>' + data.cart_p_attr + '</span></div><div class="pure-u-1-4 text-right"><em>' + data.cart_p_exchange_price + '</em><a href="#" class="btn btn-warning hollow btn-xs cart_delete" cart_id="' + data.cart_id + '">Delete</a></div><li>';
        });

        //var _item = '<li class="mini-cart-item pure-g"><div class="pure-u-1-6"><img src="img/brands-thumb.jpg" class="img-responsive"></div><div class="pure-u-7-12"><p>Content content content</p><span>color: 1 Size: M</span></div><div class="pure-u-1-4 text-right"><em>S$234.56</em><a href="#" class="btn btn-warning hollow btn-xs">Delete</a></div><li>';
        // for (var i = 0; i < item.length; i++) {
        //     _item += "<li>"+item[i]+"</li>";
        // }

        //return the whole cart list string
        return '<ul class="list-unstyled mini-cart">' +
            _item +
            '</ul>' +
            _overflowStr +
            '<a class="btn btn-warning btn-sm flr" href="/shoppingcart/cart">Checking my cart</a>';
    };


    // bootstrap popover
    $('[data-toggle="popover"]').each(function() {
        var ele = $(this);
        var tiktak = function() {};
        //        console.log(item);
        //        console.log(shopcart_no);
        //var item = ["aaa", "bbb", "ccc", "ddd", "eee", "fff"]; //商品内容
        var overflow = shopcart_no > 5 ? (shopcart_no - 5) : 0; //超出商品显示限制条数
        ele.on("mouseenter", function() {
            ele.popover({
                trigger: 'manual',
                placement: 'bottom',
                html: 'true',
                content: setCartContent(item, overflow)
            });
            clearTimeout(tiktak);
            ele.popover("show");
            ele.siblings(".popover").on("mouseleave", function() {
                //ele.popover('hide');
                ele.popover('destroy');
            });
        }).on("mouseleave", function() {
            //item = ["aaa", "bbb", "ccc", "ddd", "eee"];
            overflow = shopcart_no > 5 ? (shopcart_no - 5) : 0;
            tiktak = setTimeout(function() {
                if (!$(".popover:hover").length) {
                    //ele.popover("hide");
                    ele.popover('destroy');
                }
            }, 500);
        });
    });
});

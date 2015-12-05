define(function(require) {
    var $ = jQuery = require('$');
    var jcarsl = require('../depends/jquery.jcarousel.min.js');
    var gallary = require('../depends/gallary-carousels.js');

    //item detail gallary config and lazy load
    $('.carousel-stage').jcarousel({
        // Configuration goes here
    }).on('jcarousel:targetin', 'li', function(event, carousel) {
        //Triggered when the item becomes the targeted item.
        // lazyload
        var ele = $(this).find("img");
        var src_cur = ele.attr("ssrc");
        ele.attr("src", src_cur);
    });
});

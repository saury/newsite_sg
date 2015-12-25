define(function(require) {
    var $ = jQuery = require('$');
    var consAndFunc = require('./consAndFunc.js');
    // var stickyCheck = require('./stickyCheck.js');
    var affixJs = require('../depends/bootstrap/affix.js');

    //TODO: the affix should be called everytime dom changes
    $('[data-affix="overflow"]').each(function() {
        var ele = $(this);
        var offsetTop = ele.offset().top + ele.height() - $(window).height(); // - parseInt(ele.css("margin-top").split("px")[0]);//element's marginTop
        //affix top = offset to top + own height - window's height
        ele.affix("destroy"); //destroy the affix function before
        if (offsetTop < 0) return false; //no affix while it is not overflow
        ele.affix({
            offset: {
                top: function() {
                    return offsetTop; // distance to the top
                }
            }
        });
    });

    //left menu affix in account page
    $('[data-affix="aside"]').each(function() {
        var ele = $(this);
        ele.affix({
            offset: {
                top: ele.offset().top - consAndFunc.navOffset - 18, //no accuracy
                bottom: function() {
                    return (this.bottom = $('footer').outerHeight(!0) + 24) //no accuracy
                }
            }
        });
    });

});

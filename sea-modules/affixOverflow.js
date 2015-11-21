define(function(require) {
    var affixJs = require('./depends/bootstrap/affix.js');
    //general affix overflow
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
});

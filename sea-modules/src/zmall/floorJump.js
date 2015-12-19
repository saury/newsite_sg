define(function(require) {
    var $ = jQuery = require('$');
    var jumpFunc = require('./consAndFunc.js');
    //floor jump
    //glyphicon go down
    $(".indexMain-floor-elevator .glyphicon-chevron-down").click(function() {
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
    $(".indexMain-floor-elevator .glyphicon-chevron-up").click(function() {
        var ele = $(".indexMain-floor-elevator .glyphicon-chevron-up");
        var index = ele.index(this);
        var dom = $("#floor_" + (index));
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
            return false; //prevent default anchor jumping
        })
    });
});

define(function(require) {
	var $ = jQuery = require('$');
    var collapseJs = require('./depends/bootstrap/collapse.js');

    //left menu accordion
    $('.left-menu .collapse').on('show.bs.collapse', function() {
        var prntEle = $(this).parent();
        prntEle.find(".glyphicon-chevron-down").addClass("rotate");
        prntEle.siblings().children('.collapse').collapse('hide');
    }).on('hide.bs.collapse', function() {
        $(this).parent().find(".glyphicon-chevron-down").removeClass("rotate");
    });

});

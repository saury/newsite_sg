define(function(require, exports, module) {
var $ = jQuery = require('$');
    var modal = require('../depends/bootstrap/modal.js');
    var tab = require('../depends/bootstrap/tab.js');

    //active the tab inside the modal
    $('[data-target^="#modal_"]').each(function() {
        var ele = $(this);
        var modal_target = ele.attr("data-target"); //get the whole modal target
        var opt = ele.attr("data-active"); //get the tab option
        var single = ele.attr("modal-single"); //check if single tab needed
        ele.on("click", function() {
            //trigger the tab wanted
            var _ele = $(modal_target + " .nav-tabs li a[href='#" + opt + "']");
            _ele.trigger("click");
            //hide the other tabs if needed 
            if (single) {
                var p_ele = _ele.parent();
                p_ele.attr("class", "pure-u-1-1 active"); //adjust the tab's width
                p_ele.siblings().remove(); //hide tabs
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
            };
        });
    });

    // filter modal
    $('[data-target^="#filter"]').each(function() {
        var ele = $(this);
        ele.on("click", function() {
            ele.parent().parent().css('visibility','hidden'); //hide the default filter panel
        });
    });
    // revert the default filter panel
    $('.prod-filter-detail').on('shown.bs.modal', function () {
      $('body').removeClass('modal-open').css('padding-right','0');
      $('header').css('padding-right','0')
    }).on('hide.bs.modal', function () {
      $(this).siblings().css('visibility','');
    });
});

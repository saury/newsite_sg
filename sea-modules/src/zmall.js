define(function(require, exports, module) {
    var $ = jQuery = require('$');

    // bootstrap transition
    var transition = require('./depends/bootstrap/transition.js');

    // bootstrap dropdown
    var dDown = require('./depends/bootstrap/dropdown.js');
    $('.dropdown-toggle').dropdown();

    // bootstrap carousel
    var indexCarousel = require('./depends/bootstrap/carousel.js');

    // bootstrap button 
    var button = require('./depends/bootstrap/button.js');
    $('[data-toggle="buttons"]').button();

    // bootstrap select and cascading
    var bselectCascade = require('./zmall/selectCascade.js');
    // mock up data
    var select_cnt = {
        "Return": ["Size does not comply with", "Damaged", "Poor quality"],
        "Missing": ["Did not receive merchandise（More than 10 days）"]
    };
    // call cascading function
    bselectCascade.selectCascade("cascade1",select_cnt);//(target:"cascade1", data:select_cnt)
    //hide the img upload dom when the "Missing" is choosen
    $('[select-cascade="cascade1"]').eq(0).on("change",function(){
        if($(this).val()=="Missing"){
            $("." + $(this).attr("select-hide")).addClass("sr-only");
        }
        else{
            $("." + $(this).attr("select-hide")).removeClass("sr-only");
        }
    });

    // validator for bootstrap
    var validator = require('./depends/bootstrap/validator.js');

    //import the general constants and functions
    var consAndFunc = require('./zmall/consAndFunc.js');
    consAndFunc.zmallFunc(); //general function call

    //data href config
    var dataHref = require('./zmall/dataHref.js');

    //get check box toggle
    var cboxTgl = require('./zmall/checkbox_toggle.js');

    //floor anchor jumping
    var floorJump = require('./zmall/floorJump.js');

    //scrollspy for brands page
    var bNav_scrollspy = require('./zmall/bNav_scrollspy.js');

    // date picker config
    var datePicker = require('./zmall/datepicker.js');

    // modal and tab config
    var modalTab = require('./zmall/activeModalTab.js');

    // affix call when it's overflow from the window
    var affixOflow = require('./zmall/affixOverflow.js');

    // delegate calls to light box 
    var litebox = require('./zmall/lightBox.js');

    // left menu accordion for account page
    var leftMenu = require('./zmall/menuAccordion.js');

    //item detail gallary config and lazy load
    var itemGallery = require('./zmall/itemGallery.js');

    //tool tips
    var toolTip = require('./zmall/toolTips.js');

    //fly to cart
    var toolTip = require('./zmall/cartFly.js');

    //mini cart
    var miniCart = require('./zmall/miniCart.js');

});

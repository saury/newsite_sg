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
    var indexCarousel = require('./depends/bootstrap/button.js');
    $('[data-toggle="buttons"]').button();

    // bootstrap select 
    var indexCarousel = require('./depends/bootstrap/bootstrap-select.js');

    // validator for bootstrap
    var indexCarousel = require('./depends/bootstrap/validator.js');

    //import the general constants and functions
    var consAndFunc = require('./consAndFunc.js');
    consAndFunc.zmallFunc(); //general function call

    //data href config
    var dataHref = require('./dataHref.js');

    //get check box toggle
    var cboxTgl = require('./checkbox_toggle.js');

    //floor anchor jumping
    var floorJump = require('./floorJump.js');

    //scrollspy for brands page
    var bNav_scrollspy = require('./bNav_scrollspy.js');

    // date picker config
    var datePicker = require('./datepicker.js');

    // modal and tab config
    var modalTab = require('./activeModalTab.js');

    // affix call when it's overflow from the window
    var affixOflow = require('./affixOverflow.js');

    // delegate calls to light box 
    var litebox = require('./lightBox.js');

    // left menu accordion for account page
    var leftMenu = require('./menuAccordion.js');

    //item detail gallary config and lazy load
    var itemGallery = require('./itemGallery.js');

    //tool tips
    var toolTip = require('./toolTips.js');

    //mini cart
    var miniCart = require('./miniCart.js');

});

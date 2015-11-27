define(function(require) {
    var $ = jQuery = require('$');
    var tooltips = require('./depends/bootstrap/tooltip.js');
    var tooltips = require('./depends/bootstrap/modal.js');

    //call tooltips for chat part in rights modal
    $('#modal_right').on('shown.bs.modal', function() {
        $('[data-toggle="chatTip"]').tooltip({
            trigger: 'mamual',
            html: 'true',
            autoPosition: 'true',
            template: '<div class="media-body tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        }).tooltip('show');
    })

});

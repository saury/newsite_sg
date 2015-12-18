define(function(require) {
    var $ = jQuery = require('$');
    var datePicker = require('../depends/bootstrap/bootstrap-datetimepicker.min.js');
    // date picker
    $('[data-active*="date_picker"]').each(function() {
        var ele = $(this);
        var date_type = ele.attr("data-active").split("_").pop(); //get the last child of the array
        switch (date_type) {
            case "birth": //birthday date picker: only date and start from years
                ele.datetimepicker({
                    viewMode: 'years', //show the year 1st
                    // defaultDate: "1988-01-01",
                    format: 'YYYY-MM-DD',
                    pickTime: false
                });
                break;
            default:
                ele.datetimepicker({
                    viewMode: 'days',
                    showToday: true,
                    format: 'YYYY-MM-DD HH:mm',
                });
                break;
        }
    });
});

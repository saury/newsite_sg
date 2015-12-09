define(function(require, exports, module) {
    //select cascading based on bootstrap-select
    var $ = jQuery = require('$');
    var bSelect = require('../depends/bootstrap/bootstrap-select.js');

    exports.selectCascade = function(target, cnt) {
        var select = $('[select-cascade="' + target + '"]'); //targets
        var p_sel = select.eq(0); // 1st select
        var c_sel = select.eq(1); // 2st select
        var p_opt_arr = [];
        var c_opt = p_opt = '<option value="">Please select...</option>'; // default options
        for (var i in cnt) {
            p_opt_arr.push(i); // push the key to the options array
        }
        p_opt_arr.forEach(function(item) {
            p_opt += "<option value='" + item + "'>" + item + "</option>"; //loop and pack the options
        });

        //init the selects
        p_sel.empty().append(p_opt);
        c_sel.empty().append(c_opt);
        c_sel.prop('disabled', true);
        select.selectpicker('refresh');

        //cascading work when value changes
        p_sel.on('change', function() {
            for (var j in cnt) {
                // change according to the key
                if ($(this).val() == j) {
                    c_sel.prop('disabled', false); //make the 2nd select selectable
                    c_opt = '<option value="">Please select...</option>'; //init the option again
                    cnt[j].forEach(function(item) {
                        c_opt += "<option value='" + item + "'>" + item + "</option>"; //loop and pack the options
                    });
                    c_sel.empty().append(c_opt);
                    c_sel.selectpicker('refresh');
                }
                // recover the 2nd select to unselectable if the first's got no value
                else if ($(this).val() == '') {
                    c_sel.empty().append(c_opt);
                    c_sel.prop('disabled', true); //disable the select
                    c_sel.selectpicker('refresh');
                }
            }
        });

    };
});

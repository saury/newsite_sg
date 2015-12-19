define(function(require) {
	var $ = jQuery = require('$');
    //checkbox toggle
    $(".zm-checkbox input").change(function() {
        var ele = $(this);
        if (this.checked) {
            ele.parent().children("i").css("display", "block");
        } else {
            ele.parent().children("i").css("display", "none");
        }
    });
});

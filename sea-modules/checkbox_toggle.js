define(function() {
    //checkbox toggle
    $(".zm-checkbox input").change(function() {
        var ele = $(this);
        if (this.checked) {
            ele.parent().children("i").css("display", "inline");
        } else {
            ele.parent().children("i").css("display", "none");
        }
    });
});

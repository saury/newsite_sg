define(function(require) {
	var $ = jQuery = require('$');
    //init the data href
    $(document).on("click", "[data-href]", function() {
        var ele = $(this);
        var linkHref = ele.attr("data-href");
        var newWindow = ele.attr("data-newWin");
        if (linkHref && newWindow) window.open(linkHref); //open in new window;
        else if (linkHref) window.location.href = linkHref; //open in self window;
        return false;
    });
});

define(function(require) {
	var $ = jQuery = require('$');
    var lightbox = require('./depends/bootstrap/ekko-lightbox.js');
    // lightbox for item detail
    // delegate calls to data-toggle="lightbox"
    $(document).delegate('*[data-toggle="lightbox"]', 'click', function(event) {
        event.preventDefault();
        $(this).ekkoLightbox();
    });
});

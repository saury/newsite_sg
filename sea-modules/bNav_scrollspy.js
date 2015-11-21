define(function(require) {
    var consAndFunc = require('./consAndFunc.js');
    var scrollspy = require('./depends/bootstrap/scrollspy.js');
    //call scrollspy
    $('.zmBrandsPage').scrollspy({
        target: '#brandNav',
        offset: consAndFunc.navOffset + 1
    });
});
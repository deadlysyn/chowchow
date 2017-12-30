/*
 * middleware
 */

var middleware = {};

middleware.logRequest = function(req, res, next) {
    var date = new Date();
    console.log(date + ' ' + req.headers.host + ' ' + req.method + ' ' + req.url);
    return next();
}

module.exports = middleware;

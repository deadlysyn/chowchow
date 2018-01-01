/*
 * middleware
 */

var middleware = {};

middleware.logRequest = function(req, res, next) {
    var date = new Date();
    console.log(date + ' ' + req.headers.host + ' ' + req.method + ' ' + req.url);
    return next();
}

middleware.randomFood = function(latitude, longitude, callback) {
    // var food = {
    //     "latitude": latitude,
    //     "longitude": longitude
    // };
    food = searchYelp(latitude, longitude);
    callback(null, food);
}

function searchYelp(latitude, longitude) {
    var food = {
        "latitude": latitude,
        "longitude": longitude
    };
    return food
}

module.exports = middleware;

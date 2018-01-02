/*
 * middleware
 */

var request = require('request');

var middleware = {};

middleware.logRequest = function(req, res, next) {
    var date = new Date();
    console.log(date + ' ' + req.ip + ' ' + req.method + ' ' + req.headers.host + ' ' + req.url);
    return next();
}

middleware.random = function(latitude, longitude, callback) {
    food = searchYelp(latitude, longitude);
    callback(null, food);
}

function searchYelp(latitude, longitude) {
    var baseURL = 'https://api.yelp.com/v3/businesses/search?categories=restaurants&radius=2000';
    var url = baseURL + '&latitude=' + latitude + '&longitude=' + longitude;
    get(url, function(body) {
        console.log(body);
        return body
    });
}

function get(url, callback) {
    console.log('DEBUG: fetching ' + url);
    request(url, function(err, res, body) {
        if (err) {
            console.log('ERROR: dumping payload...');
            console.log(err);
        } else if (res.statusCode == 200) {
            callback(JSON.parse(body));
        }
    });
}

module.exports = middleware;

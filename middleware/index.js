/*
 * middleware
 */

const https = require('https')

const APIHOST = 'api.yelp.com'
const APIPREFIX = '/v3/businesses/search'
const APIURL = 'https://' + APIHOST + APIPREFIX
const APILIMIT = 5
const SEARCHTERM = 'restaurants'
const APIKEY = process.env.API_KEY

var middleware = {}

middleware.logRequest = function(req, res, next) {
    var date = new Date()
    console.log(date + ' ' + req.ip + ' ' + req.method + ' ' + req.headers.host + ' ' + req.url + ' (' + res.statusCode + ')')
    return next()
}

middleware.parseRequest = function(req, res, next) {
    if (req.body.latitude && req.body.longitude) {
        // build up yelp api query string...
        let q = '?term=' + SEARCHTERM + '&latitude=' + req.body.latitude + '&longitude=' + req.body.longitude + '&limit=' + APILIMIT + '&open_now=true' + '&sort_by=rating'

        // how much you're willing to spend
        // 1 == $; 2 == $$; 3 == $$$; 4 == $$$$
        if (req.body.pricey === 'on') {
            q += '&price=1,2,3,4'
        } else {
            q += '&price=1,2'
        }

        // walk or (close) drive
        if (req.body.drive === 'on') {
            // 8000 meters ~= 5 miles
            q += '&radius=8000'
        } else {
            // 500 meters ~= 5 blocks
            q += '&radius=500'
        }

        // picky eaters get fewer choices
        if (req.body.picky === 'on') {
            q += '&categories=tradamerican,newamerican,burgers,breakfast_brunch,chinese,diners,italian,mexican,pizza,sandwiches,steak'
        }

        searchYelp(q, function(results) {
            let choices = results.businesses.length
            if (choices > 0) {
                // stash random result in session
                let randChoice = Math.floor(Math.random() * choices)
                req.session.choice = results.businesses[randChoice]
                // save remaining results for list view
                req.session.results = results.businesses.filter(biz => req.session.choice.id != biz.id)
                return next()
            } else {
                res.redirect('/')
            }
        })
    } else {
        res.redirect('/nolocation')
    }
}

function searchYelp(queryString, callback) {
    let options = {
        headers: {'Authorization': 'Bearer ' + APIKEY},
        hostname: APIHOST,
        path: APIPREFIX + queryString,
        port: 443
    }
    https.get(options, function(res) {
        res.setEncoding("utf8")

        let body = ""
        res.on("data", data => {
            body += data
        })

        res.on("end", () => {
            callback(JSON.parse(body))
        })
    })
}

module.exports = middleware

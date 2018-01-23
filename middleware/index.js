/*
 * middleware
 */

const https         = require('https'),
      APIHOST       = 'api.yelp.com',
      APIPREFIX     = '/v3/businesses/search',
      APIURL        = 'https://' + APIHOST + APIPREFIX,
      APILIMIT      = 5,
      SEARCHTERM    = 'restaurants',
      APIKEY        = process.env.API_KEY

var middleware = {}

middleware.logRequest = function(req, res, next) {
    let date = new Date()
    console.log(date + ' ' + req.ip + ' ' + req.method + ' ' + req.headers.host + ' ' + req.url + ' (' + res.statusCode + ')')
    return next()
}

middleware.parseRequest = function(req, res, next) {
    if (req.body.latitude && req.body.longitude) {
        // build up yelp api query string...
        let q = `?term=${SEARCHTERM}&latitude=${req.body.latitude}&longitude=${req.body.longitude}&limit=${APILIMIT}&open_now=true&sort_by=rating`

        // how much you're willing to spend
        switch (req.body.price) {
            case '$':
                q += '&price=1'
                break
            case '$$':
                q += '&price=1,2'
                break
            case '$$$':
                q += '&price=1,2,3'
                break
            case '$$$$':
                q += '&price=1,2,3,4'
        }

        if (req.body.drive == 'true') {
            // 8000 meters ~= 5 miles
            q += '&radius=8000'
        } else {
            // 500 meters ~= 5 blocks
            q += '&radius=500'
        }

        searchYelp(q, function(results) {
            if (results.businesses) {
                // grab random result
                let randChoice = Math.floor(Math.random() * results.businesses.length)
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

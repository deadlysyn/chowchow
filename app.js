const express   = require('express'),
      app       = express(),
      bp        = require('body-parser'),
      session   = require('express-session'),
      m         = require('./middleware')

// environment config
var ip          = process.env.IP || '127.0.0.1',
    port        = parseInt(process.env.PORT, 10) || 3000,
    SECRET      = process.env.SECRET || 'some random long string we should read from the environment'

app.set('view engine', 'ejs')
app.use(bp.urlencoded({extended: true}))
app.use(express.static(__dirname + '/public'))

// template helpers

// truncate long strings and only add elipsis on truncation
app.locals.printer = function(str, len) {
    len = len > 0 ? len : 15
    if (str.length > len) {
        str = str.substring(0,len).trim() + '...'
    }
    return str
}

// convert rating number to svg stars
app.locals.stars = function(num) {
    let stars = ''

    for (var i = 0; i < num-1; i++) {
        stars += '<i class="fas fa-star fa-lg" style="color: #FFD700"></i>'
    }

    if (num%1 != 0) {
        stars += '<i class="fas fa-star-half fa-lg" style="color: #FFD700"></i>'
    }
    
    return stars
}

// routes

app.use(session({
  secret: SECRET,
  resave: false,
  saveUninitialized: true
}))

app.use(function (req, res, next) {
    if (!req.session.results) {
        req.session.results = []
        req.session.choice = {}
    }
    next()
})

app.get('/', m.logRequest, function(req, res, next) {
    res.render('index')
})

app.post('/random', m.logRequest, m.parseRequest, function(req, res, next) {
    res.redirect('/random')
})

app.get('/random', m.logRequest, function(req, res, next) {
    if (req.session.choice) {
        res.render('random', {biz: req.session.choice})
    } else {
        res.redirect('/')
    }
})

app.get('/list', m.logRequest, function(req, res, next) {
    if (req.session.results.length > 0) {
        res.render('list', {results: req.session.results})
    } else {
        res.redirect('/')
    }
})

app.all('*', m.logRequest, function(req, res, next) {
    res.status(404).render('catchall')
})

app.listen(port, ip, function() {
    console.log('Server listening on ' + ip + ':' + port + '...')
})

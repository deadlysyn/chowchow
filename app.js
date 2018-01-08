const express   = require('express'),
      app       = express(),
      bp        = require('body-parser'),
      session   = require('express-session'),
      m         = require('./middleware');

// environment config
var ip          = process.env.IP || '127.0.0.1',
    port        = parseInt(process.env.PORT, 10) || 3000;

app.set('view engine', 'ejs');
app.use(bp.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

app.use(session({
  secret: 'some random long string we should read from the environment',
  resave: false,
  saveUninitialized: true
}));

app.use(function (req, res, next) {
    if (!req.session.results) {
        req.session.results = [];
        req.session.choice = {};
    }
    next();
});

app.get('/', m.logRequest, function(req, res, next) {
    res.render('index');
});

app.post('/random', m.logRequest, m.parseRequest, function(req, res, next) {
    res.redirect('/random');
});

app.get('/random', m.logRequest, function(req, res, next) {
    res.render('random', {biz: req.session.choice});
});

app.get('/list', m.logRequest, function(req, res, next) {
    res.render('list', {results: req.session.results});
});

app.all('*', m.logRequest, function(req, res, next) {
    res.status(404).render('catchall');
});

app.listen(port, ip, function() {
    console.log('Server listening on ' + ip + ':' + port + '...');
});

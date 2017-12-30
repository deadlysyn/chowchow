var express     = require('express'),
    app         = express(),
    request     = require('request'),
    bp          = require('body-parser'),
    middleware  = require('./middleware');

// environment config
var ip          = process.env.IP || '127.0.0.1',
    port        = parseInt(process.env.PORT, 10) || 3000;

app.set('view engine', 'ejs');
app.use(bp.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

app.get('/', middleware.logRequest, function(req, res) {
    res.render('index');
});

app.get('/foods/random', middleware.logRequest, function(req, res) {
    res.send('random');
});

app.get('/foods/list', middleware.logRequest, function(req, res) {
    res.render('list');
});

app.get('*', middleware.logRequest, function(req, res) {
    res.status(404).render('catchall');
});

app.listen(port, ip, function() {
    console.log('Server listening on ' + ip + ':' + port + '...');
});

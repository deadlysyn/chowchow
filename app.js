var express     = require('express'),
    app         = express(),
    request     = require('request'),
    bp          = require('body-parser');

// environment config
var ip          = process.env.IP || '127.0.0.1',
    port        = parseInt(process.env.PORT, 10) || 3000;

app.set('view engine', 'ejs');
app.use(bp.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    var date = new Date();
    console.log(date + ' ' + req.headers.host + ' ' + req.method + ' ' + req.url);
    res.render('index');
});

app.get('/foods/random', function(req, res) {
    var date = new Date();
    console.log(date + ' ' + req.headers.host + ' ' + req.method + ' ' + req.url);
    res.send('random');
});

app.get('/foods/list', function(req, res) {
    var date = new Date();
    console.log(date + ' ' + req.headers.host + ' ' + req.method + ' ' + req.url);
    res.render('list');
});

app.get('*', function(req, res) {
    res.render('catchall');
});

app.listen(port, ip, function() {
    console.log('Server listening on ' + ip + ':' + port + '...');
});

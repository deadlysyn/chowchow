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

app.get('/food', middleware.logRequest, function(req, res) {
    if (Object.keys(req.query).length === 0) {
        res.redirect('/');
    } else {
        if (res.query.random == true) {
            middleware.random(req.params.latitude, req.params.longitude, function(err, food) {
                if (err != null) {
                    console.log(err);
                } else {
                    res.render('random', {food: food});
                }
            });
        } else {
            middleware.list(req.params.latitude, req.params.longitude, function(err, food) {
                if (err != null) {
                    console.log(err);
                } else {
                    res.render('random', {food: food});
                }
            });
        }
    }
});

// app.get('/random/:latitude/:longitude', middleware.logRequest, function(req, res) {
//     middleware.randomFood(req.params.latitude, req.params.longitude, function(err, food) {
//         if (err != null) {
//             console.log(err);
//         } else {
//             res.render('random', {food: food});
//         }
//     });
// });

// app.get('/list/:latitude/:longitude', middleware.logRequest, function(req, res) {
//     res.render('list');
// });

app.get('*', middleware.logRequest, function(req, res) {
    res.status(404).render('catchall');
});

app.listen(port, ip, function() {
    console.log('Server listening on ' + ip + ':' + port + '...');
});

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars');
var article = require('./routes/article');

module.exports = function (db) {
    var app = express();
    app.set('port', 3000);
    app.set('views', path.join(__dirname, 'views'));
    app.engine('handlebars', handlebars({defaultLayout: 'main'}));
    app.set('view engine', 'handlebars');

    app.use(express.logger('dev'));
    app.use(express.favicon());
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(express.bodyParser());
    if ('development' == app.get('env')) {
        // development only
        app.use(express.errorHandler());
    }

    // routes
    app.get('/', function (req, res) {
        res.render('index');
    });

    app.get('/articles', article.all(db));

    app.get('/article/:id', article.get(db));
    app.put('/article', article.put(db));
    app.post('/article/:id', article.post(db));


    http.createServer(app).listen(app.get('port'), function () {
        console.log("Express setup, HTTP server listening on port " + app.get('port'));
    });
};

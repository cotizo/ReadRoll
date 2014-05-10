var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars');

module.exports = function (db) {
    var app = express();
    app.set('port', 3000);
    app.set('views', path.join(__dirname, 'views'));
    app.engine('handlebars', handlebars({defaultLayout: 'main'}));
    app.set('view engine', 'handlebars');

    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.favicon());
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
    if ('development' == app.get('env')) {
        // development only
        app.use(express.errorHandler());
    }

    // routes
    app.get('/', function (req, res) {
        res.render('index');
    });

    http.createServer(app).listen(app.get('port'), function () {
        console.log("Express setup, HTTP server listening on port " + app.get('port'));
    });
};

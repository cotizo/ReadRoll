var mongoose = require('mongoose');
var config = require('./config.json');
var rrExpress = require('./rr-express');

mongoose.connect(config.mongo.host);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function () {
//    rrExpress(db);
});

rrExpress(db);
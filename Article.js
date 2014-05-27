/**
 * Created by MihaiCotizo on 5/10/2014.
 */

var mongoose = require('mongoose');

var articleSchema = mongoose.Schema({
    id: String,
    title: String,
    url: String,
    content: String,
    tags: [String],
    date: Date
});

module.exports = mongoose.model('article', articleSchema);
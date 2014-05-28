/**
 * Created by MihaiCotizo on 5/10/2014.
 */

var Article = require('../Article');
var marked = require('marked');
marked.setOptions({
    sanitize: true
});

function home(db) {
    return function (req, res) {
        Article.find().sort('-date').exec(function (err, articles) {
            if (err) {
                console.error(err);
                res.send(404);
                return;
            }

            articles = articles.map(function (x) {
                x.content = marked(x.content);
                return x;
            });
            res.render('index', {articles: articles});
        });
    }
}

module.exports = {
    home: home
};
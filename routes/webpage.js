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
        var LIMIT = 10;
        var page = req.query.page ? req.query.page : 1;
        var toSkip = (page - 1) * LIMIT;
        Article.count(function (err, count) {
            if (err) { console.error(err); res.send(400); return; }
            Article.find().sort('-date').skip(toSkip).limit(LIMIT).exec(function (err, articles) {
                if (err) {
                    console.error(err);
                    res.send(404);
                    return;
                }

                articles = articles.map(function (x) {
                    x.content = marked(x.content);
                    return x;
                });
                var isFirst = page == 1;
                var prev = !isFirst ? page - 1 : "#";
                var isLast = toSkip + LIMIT >= count;
                var next = !isLast ? page + 1 : "#";
                res.render('index', {
                    articles: articles,
                    first: isFirst,
                    prev: prev,
                    last: isLast,
                    next: next});
            });
        });
    }
}

function article(db) {
    return function (req, res) {
        var id = req.params.id;
        Article.find({_id: id}, function (err, article) {
            if (err) { console.error(err); res.send(400); return; }
            if (article.length !== 1) { res.send(404); return; }
            res.render('article', {article: article[0]});
        })
    }
}

module.exports = {
    home: home,
    article: article
};
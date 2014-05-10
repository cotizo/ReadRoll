/**
 * Created by MihaiCotizo on 5/10/2014.
 */

var Article = require('../Article');

function articlesGet(db) {
    return function (req, res) {
        Article.find(function (err, entries) {
            if (err) {
                console.error(err);
                res.json(500, []);
            }

            res.json(entries);
        });
    }
}

function articleGet(db) {
    return function (req, res) {
        var id = req.params.id;
        Article.find({"_id": id}, function (err, articles) {
            if (err) {
                console.error(err);
                res.json(500, {});
                return;
            }
            if (Array.isArray(articles)) {
                if (articles.length > 1) {
                    console.error("invalid set of articles: " + articles);
                    res.json(400, {"error": "invalid set of articles"});
                    return;
                }
                if (articles.length == 0) {
                    res.json(404, {"error": "no article found"});
                    return;
                }

                res.json(articles[0]);
            } else if (typeof articles === "object") {
                res.json(articles);
            } else {
                console.error("invalid set of articles: " + articles);
                res.json(400, {"error": "invalid set of articles"});
            }
        });
    };
}

function articlePost(db) {
    return function (req, res) {
        res.send(501);
    };
}

function articlePut(db) {
    return function (req, res) {
        var title = req.body.title;
        var content = req.body.content;
        var url = req.body.url;
        var tags = req.body.tags;

        if (typeof title === "undefined") {
            title = "";
        } else if (title.length > 150) {
            res.send(400, {error: "title too long"});
            return ;
        }

        if (typeof content === "undefined") {
            content = "";
        } else if (content.length > 10240) {
            res.send(400, {error: "content too long"});
            return;
        }

        if (typeof url === "undefined") {
            url = "";
        }

        if (typeof tags === "undefined") {
            tags = [];
        }

        // TODO check if url is valid
        var article = new Article({
            title: title,
            content: content,
            url: url,
            tags: tags
        });
        article.save(function (err) {
            if (err) {
                res.send(503, {error: "could not save yor article"});
                return;
            }

            res.send(200);
        })
    };
}

module.exports = {
    "get": articleGet,
    "post": articlePost,
    "put": articlePut,
    "all": articlesGet
};
/**
 * Created by MihaiCotizo on 5/10/2014.
 */

var Article = require('../Article');

function home(db) {
    return function (req, res) {
        Article.find(function (err, articles) {
            if (err) {
                console.error(err);
                res.send(404);
                return;
            }

            res.render('index', {articles: articles});
        });
    }
}

module.exports = {
    home: home
};
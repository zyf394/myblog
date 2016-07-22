/**
 * Created by didi on 16/7/22.
 */
var Article = require('../common');

module.exports = function (req, res, next) {
    var reqBody = req.body;
    Article.edit(res, {
        id: reqBody.id,
        author: reqBody.author,
        title: reqBody.title,
        content: reqBody.content,
        status: reqBody.status
    });
};
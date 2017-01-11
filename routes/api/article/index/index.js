/**
 * Created by didi on 16/7/22.
 */
var Article = require('../common');

module.exports = function (req, res, next) {
    var reqBody = req.body;
    if (reqBody.id) {
        Article.findOneById(res, reqBody.id)
    } else if (reqBody.page) {
        Article.findByPage(res, reqBody)
    }else {
        Article.find(res);
    }
};
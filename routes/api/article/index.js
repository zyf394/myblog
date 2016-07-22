/**
 * Created by didi on 16/7/22.
 */
var Article = require('./common');
var add = require('./add');
var edit = require('./edit');
var del = require('./delete');
module.exports = function (router) {
    router.post('/api/article', function (req, res, next) {
        var reqBody = req.body;
        if (reqBody.id) {
            Article.findOneById(res, reqBody.id)
        } else if (reqBody.page) {
            Article.findByPage(res, reqBody.page, reqBody.pageSize)
        }else {
            Article.find(res);
        }
    });
    router.post('/api/article/add', add);
    router.post('/api/article/edit', edit);
    router.post('/api/article/del', del);
}
var express = require('express');
var router = express.Router();
var Article = require('./article');
/* GET home page. */
function apiRoutes() {
    router.get('/api', function (req, res, next) {
        res.end('api')
    });
    router.post('/api/article', function (req, res, next) {
        var reqBody = req.body;
        if(isEmptyObject(reqBody)){
            Article.find(res);
        }else if(isOneKeyObject(reqBody)){
            for(var key in reqBody){
                Article.findOneByKey(res, key, reqBody[key])
            }
        }else {
            Article.save(res, {
                id: reqBody.id,
                author: reqBody.author,
                title: reqBody.title,
                content: reqBody.content,
                status: reqBody.status
            });
        }

    });
    return router
}
function isEmptyObject(obj) {
    var key;
    for(key in obj)
        return !1;
    return !0
}
function isOneKeyObject(obj) {
    var key,
        count = 0;
    for(key in obj){
        count ++
    }
    return count === 1
}
module.exports = apiRoutes;
var express = require('express');
var router = express.Router();
var Article = require('./article');
var Upload = require('./upload');
/* GET home page. */
function apiRoutes() {
    router.get('/api', function (req, res, next) {
        res.end('api')
    });
    Article(router);
    Upload(router);

    return router
}
function isEmptyObject(obj) {
    var key;
    for (key in obj)
        return !1;
    return !0
}
function isOneKeyObject(obj) {
    var key,
        count = 0;
    for (key in obj) {
        count++
    }
    return count === 1
}
module.exports = apiRoutes;
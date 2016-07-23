var express = require('express');
var router = express.Router();
var Article = require('./article');
var Upload = require('./upload');

function apiRoutes() {
    router.get('/api', function (req, res, next) {
        res.end('api')
    });
    Article(router);
    Upload(router);

    return router
}

module.exports = apiRoutes;
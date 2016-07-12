var express = require('express');
var router = express.Router();

/* GET home page. */
function adminRoutes() {
    router.get('/admin', function(req, res, next) {
        res.end('admin')
    });
    
    return router
}

module.exports = adminRoutes;
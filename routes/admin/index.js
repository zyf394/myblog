var express = require('express');
var router = express.Router();
var path    = require('path');
var fs      = require('fs');
/* GET home page. */
function adminRoutes() {
    router.get('/admin', readAdminHTML);
    return router
}

function readAdminHTML(req, res, next) {
    var indexPath = path.resolve(__dirname, '../../view/dist/admin.html');
     fs.readFile(indexPath, function (err, data) {
         if(err) console.log(err)
         res.end(data)
     })
}
module.exports = adminRoutes;
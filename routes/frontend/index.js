/**
 * Created by didi on 16/7/5.
 */
var express = require('express');
var router = express.Router();
var profile = require('./profile'),
    users   = require('./users'),
    path    = require('path'),
    fs      = require('fs');

/* GET home page. */
function frontendRoutes() {
    router.get('/', readIndexHTML);
    router.get('/article/:id', readIndexHTML);
    router.get('/list', readIndexHTML);
    router.get('/about', readIndexHTML);
    router.get('*', readIndexHTML)
    return router
}

function readIndexHTML(req, res, next) {
    var indexPath = path.resolve(__dirname, '../../view/dist/index.html');
     fs.readFile(indexPath, function (err, data) {
         if(err) console.log(err)
         res.end(data)
     })
}
function read404(req, res, next) {
    res.end("Sorry, can't find any page");
}
module.exports = frontendRoutes;
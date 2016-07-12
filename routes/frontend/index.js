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
    router.get('/', function(req, res, next) {
        let indexPath = path.resolve(__dirname,'../../myblog/dist/index.html');
         fs.readFile(indexPath, function (err, data) {
             if(err) console.log(err)
             res.end(data)
         })
        // res.render('index', { title: 'Express' });
    });
    router.get('/users', users);
    router.get('/profile', profile);

    return router
}

module.exports = frontendRoutes;
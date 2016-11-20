/**
 * Created by didi on 16/7/22.
 */
var Article = require('../common');

module.exports = function (req, res, next) {
    var reqBody = req.body;
    console.log(reqBody)
    Article.findAllListByYears(res, reqBody);
};
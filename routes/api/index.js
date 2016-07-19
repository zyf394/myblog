var express = require('express');
var router = express.Router();
var Article = require('./article');
var Upload = require('./upload');
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
    router.post('/api/upload', function (req, res, next) {
        var reqBody = req.body;
        Upload.uploadImage(req, res, {})
    })
    router.get('/badbill/list/index', function (req, res, next) {
        var response = {
            "errno":0,
            "errmsg":"ok",
            "data":[
                {
                    "order_id":234123123,
                    "area_id":1,
                    "complete_time":"2016-07-14 10:46:20",
                    "driver_phone":"12312341234",
                    "passenger_phone":"15612341234",
                    "pay_money":2,
                    "sms":2
                }
            ]
        };

        res.send(response);
        res.end();
    });

    router.get('/badbill/detail/info', function (req, res, next) {
        var response = {
            "errno":0,
            "errmsg":"ok",
            "data":{
                "order_id":1224433,
                "area_id":1,
                "start_station":"回龙观地铁站",
                "end_station":"流星花园三区",
                "pay_money":2,
                "passenger_phone":"13612341234"
            }
        };

        res.send(response);
        res.end();
    });

    router.get('/badbill/detail/press_money', function (req, res, next) {
        var response = {
            "errno":0,
            "errmsg":"ok",
            "data":[
                {
                    "create_time":"2016-07-11 12:00:04",
                    "sms_num":"第1次催款记录",
                    "sms_content":"[滴滴小巴］亲爱的乘客，您在滴滴小巴还有一笔未支付订单，请您抽空完成支付吧，点击去支付>>。点击链接跳转至小巴待支付页面"
                }
            ]
        };

        res.send(response);
        res.end();
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
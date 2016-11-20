// 操作数据库的公共utils
var Article = require('./../db');

module.exports = {
    add: function (res, options) {
        var me = this;
        var article;
        Article.find({id: options.id}, function (err, docs) { // 先查db看是否已有文章
            if (err) {
                console.log(err)
            } else {
                Article.find({}, function (err, docs) {
                    var lastItemId = docs[docs.length - 1] ? docs[docs.length - 1].id : 0;
                    article = new Article({
                        id: lastItemId + 1,
                        author: options.author || 'shuiyi',
                        title: options.title || '',
                        content: options.content || '',
                        status: options.status || 1,
                        publishTime: options.publishTime || new Date()
                    });
                    article.save(function (err) {
                        if (err) {
                            console.log(err)
                        } else {
                            me.findOneById(res, lastItemId + 1)
                        }
                    });
                });
            }
        });
    },
    edit: function (res, options) {
        var me = this;
        var newData = {
            title: options.title,
            content: options.content,
            status: options.status
        };
        Article.update({id: options.id}, newData, function (err, docs) {
            if (err) {
                console.log(err)
            } else {
                me.findOneById(res, options.id)
            }
        })
    },
    del: function (res, options) {
        Article.remove({id: options.id}, function (err, docs) {
            if (err) {
                console.log(err)
            } else {
                var resData = {
                    remove_id: docs.id,
                    errmsg: '删除成功',
                    errno: 0
                }
                res.writeHead(200, {
                    'Content-Type': 'application/json;charset=UTF-8'
                });
                res.end(JSON.stringify(resData))
            }
        });
    },
    find: function (res, options) {
        var me = this;
        if (typeof options === 'undefined') options = {};

        Article.find(options).sort({'publishTime':-1}).exec(function (err, docs) {
            me.responseData(res, err, docs)
        })
    },
    findOneById: function (res, id) {
        var me = this;
        Article.find({id: id}, function (err, docs) {
            me.responseData(res, err, docs)
        })
    },
    findByPage: function (res, options) {
        var me = this,
            skipCount,
            page = options.page || 0,
            pageSize = options.pageSize || 10,
            query = {};

        for(var key in options){
            if (key !== 'page' && key !== 'pageSize'){
                query[key] = options[key]
            }
        }
        
        skipCount = (page - 1) * pageSize

        Article.find(query).sort({'publishTime':-1}).limit(pageSize).skip(skipCount).exec(function (err, docs) {
            me.responseData(res, err, docs)
        })
    },
    findAllListByYears: function (res, options) {
        var me = this,
            query = {};

        for(var key in options){
            query[key] = options[key]
        }

        Article.find(query).sort({'publishTime':-1}).exec(function (err, docs) {
            var newDocs = {};
            docs.forEach(function (doc, index) {
                console.log(index);
                var year = new Date(doc.publishTime).getFullYear() + "年";
                if (newDocs[year]) {
                    newDocs[year].push(doc);
                }else{
                    newDocs[year] = [];
                    newDocs[year].push(doc);
                }
            });
            res.writeHead(200, {
                'Content-Type': 'application/json;charset=UTF-8'
            });
            res.end(JSON.stringify(newDocs))
        })
    },
    responseData: function (res, err, docs) {
        if (err) {
            res.end(JSON.stringify(err))
        } else {
            var newDocs = docs.map((item, index) => {
                return {
                    id: item.id,
                    author: item.author,
                    title: item.title,
                    content: item.content,
                    status: item.status,
                    publishTime: item.publishTime
                }
            });
            res.writeHead(200, {
                'Content-Type': 'application/json;charset=UTF-8'
            });
            res.end(JSON.stringify(newDocs))
        }
    }
};
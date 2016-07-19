var Article = require('./db');

module.exports = {
    save: function (res, options) {
        var me = this;
        var article;
        var newData = {
            title: options.title,
            content: options.content,
            status: options.status
        };
        Article.find({id: options.id}, function (err, docs) { // 先查db看是否已有文章
            if (err) {
                console.log(err)
            } else {
                if (!docs.length) { // 如果没有则添加
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
                                me.find(res)
                            }
                        });
                    });
                } else { // 如果有则更新
                    Article.update({id: options.id}, newData, function (err, docs) {
                        if (err) {
                            console.log(err)
                        } else {
                            me.find(res)
                        }
                    })
                }

            }
        });
    },
    find: function (res, options) {
        var me = this;
        if(typeof options === 'undefined') options = {};
        
        Article.find(options, function (err, docs) {
            me.responseDate(res, err, docs)
        })
    },
    findOneByKey: function (res, key, value) {
        var me = this;
        var query = {};
        query[key] = value;
        Article.find(query, function (err, docs) {
            me.responseDate(res, err, docs)
        })
    },
    responseDate: function (res, err, docs) {
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
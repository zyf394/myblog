/**
 * Created by didi on 16/7/22.
 */
var index = require('./index/index')
var add = require('./add');
var edit = require('./edit');
var del = require('./delete');

module.exports = function (router) {
    router.post('/api/article/index', index);
    router.post('/api/article/add', add);
    router.post('/api/article/edit', edit);
    router.post('/api/article/del', del);
}

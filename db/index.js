var mongoose = require('mongoose');
var auth = require('./auth');
var uri = 'mongodb://' + auth.username + ':' + auth.password + '@localhost:27017/articles';
var connect = mongoose.connect(uri, { useNewUrlParser: true });

var ArticleSchema = new mongoose.Schema({
    id: Number,
    author: String,
    title: String,
    content: String,
    status: Number,
    publishTime: Date
});

mongoose.model('Article', ArticleSchema);

var Article = mongoose.model('Article');

module.exports = Article;

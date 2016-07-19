var mongoose = require('mongoose');
var uri = 'mongodb://localhost:27017';
mongoose.connect(uri);

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
/**
 * Created by didi on 16/7/11.
 */
var mongoose = require('mongoose');
var uri = 'mongodb://localhost:27017';
mongoose.connect(uri);

var BookSchema = new mongoose.Schema({
    name:String,
    author:String,
    publishTime:Date
});
mongoose.model('Book',BookSchema);

var Book = mongoose.model('Book');

var book = new Book({
    name: "MEN AT Play",
    author: "mii",
    publishTime: new Date()
});

book.save(function (err) {
    console.log('save status:',err ? 'failed': 'success');
});

Book.find({},function(err,docs){
    if(err) {
        console.log('err:',err);
        return;
    }else {
        console.log('result:',docs)
    }
})
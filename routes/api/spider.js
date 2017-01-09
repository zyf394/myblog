var express = require('express');
var url = require('url'); //解析操作url
var superagent = require('superagent'); //这三个外部依赖不要忘记npm install
var cheerio = require('cheerio');
var toMarkdown = require('to-markdown');
var EventProxy = require('eventproxy');
var targetUrl = 'http://www.cnblogs.com/shuiyi/default.html';
var EventEmitter = require('events').EventEmitter;
var event = new EventEmitter();
var Article = require('./db');


var pageNum = 1;
var articleNum =0;
var $pager;
var articleList = [];

function spiderAllList() {
    spiderOneList(pageNum)
}


function spiderOneList(num) {
    superagent.get(targetUrl + '?page=' + num)
        .end(function (err, res) {
            var $ = cheerio.load(res.text);
            var $articles = $('.postTitle2');
            $pager = $('.pager')[0]

            for (var key in $articles) {
                if ($articles[key].type === 'tag') {
                    var articleHref = $articles[key].attribs.href;
                    articleList.push(articleHref)
                    // spiderOneArticle(articleHref)
                }
            }
            if( $pager ){ // 第一页没有页码组件,从第二页开始可以取到最大页数

                var maxPage = $pager.children[0].data.match(/共(\d+)页/)[1];

                pageNum++;

                if(pageNum > maxPage){
                    // console.log(articleList)
                    spiderAllArticles()
                    return false;
                }else {
                    spiderOneList(pageNum)
                }

            }else {
                pageNum++;
                spiderOneList(pageNum)
            }
        });

}

function spiderAllArticles() {
    spiderOneArticle(2)
}

function spiderOneArticle(index) {
    var currentLink = articleList[index];
    console.log('spidering url:' + currentLink);
    currentLink && superagent.get(currentLink)
        .end(function (err, res) {
            var $ = cheerio.load(res.text);
            var articleBody = $('#cnblogs_post_body').html();
            var publishTime = $('#post-date').text();
            var title = $('#cb_post_title_url').text();
            var article;
            Article.find({}, function (err, docs) {
                var lastItemId = docs[docs.length - 1] ? docs[docs.length - 1].id : 0;
                article = new Article({
                    id: lastItemId + 1,
                    author: 'shuiyi',
                    title: title,
                    content: toMarkdown(articleBody, {
                        gfm: true,
                        converters: [{
                            filter: ['pre'],
                            replacement: function (innerHTML, node) {
                                var content = innerHTML.replace(/(<span\s+style="color:\s*#[0-9a-fA-F]{6};">)(.*?)(<\/span>)/g, '$2')
                                return '\n' + '<pre><code>' + ' ' + content + '</code></pre>' +'\n\n';
                            }
                        }]
                    }),
                    status: 1,
                    publishTime: new Date(publishTime)
                });
                article.save();
                console.log('db save success:【' + title + '】成功保存到数据库')
                spiderOneArticle(index + 1);

            });
        });
}

spiderAllList()
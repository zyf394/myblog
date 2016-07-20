<template>
  <div class="blog-content">
    <article class="content-box" v-for="item in articles">
      <h1 class="list-title">
        <a v-link="'/article/' + item.id">{{item.title || ''}}</a>
      </h1>
      <div class="wrap">
        <p class="article-summary" v-html="markedContent($index)"></p>
        <a v-if="item.id" v-link="'/article/' + item.id">&gt;&gt;</a>
        <p v-if="item.id" class="article-info">
          <i class="iconfont icon-01"></i>
          {{item.author}}
          <time><i class="iconfont icon-06"></i>{{item.publishTime | formatTime}}</time>
        </p>
      </div>
    </article>
  </div>
</template>
<script type="text/ecmascript-6">
  import showdown from 'showdown'

  export default{
    data () {
      return {
        articles: [{
          item: '加载中...',
          content: '加载中...'
        }]
      }
    },
    methods: {
      getArticles () {
        var me = this
        this.$http.post('/api/article', {}).then((response) => {
          var resData = response.data
          if (resData.length) {
            me.articles = resData
          }
        }, (err) => {
          console.log(err)
        }
        )
      },
      markedContent: function ($index) {
        var me = this
        var converter = new showdown.Converter({tables: true})
        var markedContent = me.articles[$index].content || ''
        return me.delHtmlTag(converter.makeHtml(markedContent))
      },
      delHtmlTag: function (str) { // 去掉所有的html标记
        return str.replace(/<[^>]+>/g, '')
      }
    },
    ready: function () {
      this.getArticles()
    }
  }
</script>
<style rel="stylesheet/less" type="text/css" lang="less" scoped>
  .blog-content {
    display: flex;
    flex-flow: column;
    width: 80%;
    max-width: 720px;
    margin: 0 auto;
    color: #2c3e50;
    text-align: left;

    .content-box{
      padding: 3rem 0;
      border-bottom: 1px solid #e5e5e5;
      .list-title{
        font-size: 1.2rem;
        margin-bottom: 0.5rem;
        text-overflow: ellipsis;
        white-space:nowrap;
        overflow: hidden;

        a{
          color: #666;
        }
      }
      .wrap{
        font-size: 1rem;
        line-height: 1.5;
        color: #666;

        .article-summary{
          max-height: 3rem;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .article-info{
          margin-top: 0.5rem;
          font-size: 0.5rem;
          color: #b5b5b5;

          i,time{
            font-size: 0.5rem;
            color: #b5b5b5;
            margin-right: 0.2rem;
          }
          i::before{
            color: #308ddf;
          }
        }
      }
    }

  }
</style>

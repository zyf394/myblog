<template>
  <div class="blog-content">
    <article class="content-box" v-for="item in articles">
      <h1 class="list-title">
        <a v-link="'/article/' + item.id">{{item.title || ''}}</a>
      </h1>
      <div class="wrap">
        <p class="article-summary" v-html="markedContent($index)"></p>
        <a class="article-arrow" v-if="item.id" v-link="'/article/' + item.id">&gt;&gt;</a>
        <p v-if="item.id" class="article-info">
          <i class="iconfont icon-01"></i>
          {{item.author}}
          <time><i class="iconfont icon-06"></i>{{item.publishTime | formatTime}}</time>
        </p>
      </div>
    </article>
    <load-more-component
      :loading="loading"
      :nomore="nomore"
      v-on:click="getArticles"></load-more-component>
  </div>
</template>
<script type="text/ecmascript-6">
  import showdown from 'showdown'
  import LoadMoreComponent from '../components/LoadMore'

  export default {
    components: {
      LoadMoreComponent
    },
    data () {
      return {
        page: 1,
        loading: false,
        nomore: false,
        articles: [{
          item: '加载中...',
          content: '加载中...'
        }]
      }
    },
    methods: {
      getArticles () {
        var me = this
        var postData = {
          page: me.page,
          pageSize: 5,
          status: 2
        }
        if (!me.nomore) {
          me.loading = true
          this.$http.post('/api/article/index', postData).then((response) => {
            var resData = response.data
            if (resData.length) {
              if (resData.length < 5) me.nomore = true
              if (me.page === 1) {
                me.articles = resData
              } else {
                me.articles = me.articles.concat(resData)
              }
              me.page++
            } else {
              me.nomore = true
            }
            me.loading = false
          }, (err) => {
            console.log(err)
          }
          )
        }
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

    .content-box {
      padding: 3rem 0;
      border-bottom: 1px solid #e5e5e5;
      .list-title {
        margin-bottom: 0.5rem;
        font-size: 1.2rem;
        font-weight: normal;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;

        a {
          color: #333;
          font-weight: normal;
        }
      }
      .wrap {
        line-height: 1.5;
        color: #666;

        .article-summary {
          font-size: 0.9rem;
          font-weight: 100;
          max-height: 2.7rem;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .article-info {
          margin-top: 0.5rem;
          font-size: 0.5rem;
          color: #b5b5b5;
          font-weight: 100;

          i, time {
            font-size: 0.5rem;
            color: #b5b5b5;
            margin-right: 0.2rem;
          }
          i::before {
            color: #308ddf;
          }
        }

        .article-arrow {
          font-weight: 100;
          font-family: "Helvetica Neue", Helvetica, 'Source Sans Pro', Arial, sans-serif;
          -webkit-font-smoothing: antialiased;
        }
      }
    }

  }
</style>

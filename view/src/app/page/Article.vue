<template>
  <main class="article-container">
    <p v-show="!hasArticle">未找到该文章</p>
    <div v-show="hasArticle" class="wrap">
      <header>
        <h1 class="article-title">{{article.title}}</h1>
        <p class="article-info">
          <i class="iconfont icon-01"></i>{{article.author}}
          <time class="iconfont icon-06"></time>{{article.publishTime | formatTime}}
        </p>
      </header>
      <article class="markdown-body" v-html="markedContent()"></article>
    </div>
  </main>
</template>
<script type="text/ecmascript-6">
  import {markdown} from 'markdown'

  export default{
    data () {
      return {
        article: {
          title: '',
          content: '',
          author: '',
          publishTime: ''
        },
        hasArticle: true
      }
    },
    methods: {
      getArticles (id) {
        var me = this
        this.$http.post('/api/article', {id: id}).then((response) => {
          var resData = JSON.parse(response.data)
          if (resData.length) {
            me.article = JSON.parse(response.data)[0]
          } else {
            this.hasArticle = false
          }
        }, (err) => {
          console.log(err)
        }
        )
      },
      markedContent: function () {
        var me = this
        var markedContent = me.article.content || ''
        return markdown.toHTML(markedContent)
      }
    },
    ready: function () {
      let me = this
      let id = me.$route.params.id
      console.log(id)
      id && me.getArticles(Number(id))
    }
  }
</script>
<style rel="stylesheet/less" type="text/css" lang="less" scoped>
  @import "../../../node_modules/github-markdown-css/github-markdown.css";

  .article-container{
    padding: 1rem;
    width: 80%;
    max-width: 710px;
    margin: 4rem auto;

    .wrap{
      margin-top: 2rem;

      header{
        margin-bottom: 2rem;

        .article-title{
          font-size: 36px;
          text-align: center;
          margin-bottom: 0.5rem;
          word-wrap: break-word;
        }
        .article-info{
          font-size: 14px;
          color: #b5b5b5;

          i{
            color: #308ddf;
            margin:0 0.5rem;
          }
          time{
            color: #308ddf;
            margin:0 0.5rem;
          }
        }
      }

      article{
        padding: 0.5rem 0.2rem;
      }

    }
  }
</style>

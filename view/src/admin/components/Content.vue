<template>
  <main class="content">
    <section class="content-container">
      <header>
        <input type="text" placeholder="输入标题"
               v-model="article.title"
               v-on:input="inputTitle">
        <button class="content-save" v-on:click="saveArticle">保存</button>
        <button class="content-publish" v-on:click="saveArticle('publish')">发布</button>
        <button class="content-delete" v-on:click="delArticle">删除</button>

      </header>
      <section class="content-area">
        <section class="content-edit">
          <textarea placeholder="输入文章内容"
                    v-on:input="inputContent">{{article.content}}</textarea>
          <div class="upload-btn">
            <input
              id="upload"
              type="file"
              multiple="multiple"
              accept="image/png,image/gif,image/jpg,image/jpeg,image/img"
              name="file"
              v-on:change="fileUpload"/>
          </div>
        </section>
        <section class="content-preview">
          <div class="wrap">
            <div class="markdown-body" v-html="markedContent()"></div>
          </div>
        </section>
      </section>
    </section>
  </main>
</template>
<script type="text/ecmascript-6">
  import showdown from 'showdown'
  import hljs from 'highlight.js'

  export default{
    data () {
      return {
        article: {
          id: 0,
          title: '',
          content: '',
          status: 1
        }
      }
    },
    watch: {
      'article.content': function (val, oldVal) {
        document.querySelectorAll('pre code').forEach(block => {
          hljs.highlightBlock(block)
        })
      }
    },
    methods: {
      inputTitle: function (event) {
        this.article.title = event.target.value
      },
      inputContent: function (event) {
        this.article.content = event.target.value
      },
      saveArticle: function (type) {
        var postData = {
          id: this.$route.params.id || 0,
          author: 'shuiyi',
          title: this.article.title,
          content: this.article.content,
          status: type === 'publish' ? 2 : 1
        }
        if (postData.id === 0) {
          this.addArticle(postData)
        } else {
          this.editArticle(postData)
        }
      },
      addArticle (postData) {
        var me = this
        this.$http.post('/api/article/add', postData).then((response) => {
          var resData = response.data
          var article = resData[resData.length - 1]
          me.article = {
            id: article.id,
            title: article.title,
            content: article.content,
            status: article.status
          }
          !me.$route.params.id && window.router.go('/edit/' + article.id) // 添加文章后跳转到编辑文章页
        }, (err) => {
          console.log(err)
        })
      },
      editArticle (postData) {
        var me = this
        this.$http.post('/api/article/edit', postData).then((response) => {
          var resData = response.data
          var article = resData[0]
          me.article = {
            id: article.id,
            title: article.title,
            content: article.content,
            status: article.status
          }
        }, (err) => {
          console.log(err)
        })
      },
      delArticle () {
        var me = this
        var postData = {
          id: me.article.id
        }
        this.$http.post('/api/article/del', postData).then((response) => {
          var resData = response.data
          if (resData.errno === 0) {
            window.router.go('/articles')
          }
        }, (err) => {
          console.log(err)
        })
      },
      getArticles: function (id) {
        var me = this
        this.$http.post('/api/article/index', {id: id}).then((response) => {
          var article = response.data[0]
          me.article = {
            id: article.id,
            title: article.title,
            content: article.content
          }
        }, (err) => {
          console.log(err)
        }
        )
      },
      markedContent: function () {
        var me = this
        var converter = new showdown.Converter({tables: true})
        var markedContent = me.article.content || ''
        return converter.makeHtml(markedContent)
      },
      fileUpload (event) {
        var me = this
        var upload = document.getElementById('upload')
        var files = upload.files
        var formData = new window.FormData()
        for (var file of files) {
          formData.append('file', file)
        }
        if (files[0]) {
          this.$http.post('/api/upload', formData).then((response) => {
            var resData = response.data
            var imageData = resData[0].data
            var imageName = imageData.name
            var imageUrl = imageData.url
            me.article.content += `\r\n![${imageName}](${imageUrl})`
          }, (err) => {
            console.log(err)
          })
        }
      }
    },
    ready: function () {
      let me = this
      let id = me.$route.params.id
      id && me.getArticles(Number(id))

      this.$watch('$route.params.id', function (newVal, oldVal) {
        if (newVal) {
          me.getArticles(Number(newVal))
        } else {
          me.article = {
            id: 0,
            title: '',
            content: '',
            status: 1
          }
        }
      })
    }
  }
</script>
<style rel="stylesheet/less" type="text/css" lang="less" scoped>
  @import "../../../node_modules/github-markdown-css/github-markdown.css";

  .content {
    display: flex;
    flex-direction: column;
    width: 100%;
    flex-grow: 1;

    .content-container {
      display: flex;
      flex-grow: 1;
      flex-direction: column;

      header {
        flex-grow: 0;
        min-height: 65px;
        padding: 0 20px;
        border-bottom: 1px solid #e5e5e5;
        overflow: hidden;

        input {
          display: block;
          width: 800px;
          font-size: 32px;
          line-height: 65px;
          border: 0;
          outline: transparent;
        }
        button {
          position: absolute;
          top: 16px;
          padding: 5px 15px;
          background: #5ba4e5;
          color: #fff;
          border: 1px solid #308ddf;
          border-radius: 4px;

          &:hover {
            border-color: #1e73be;
            background: #308ddf;
          }
          &:focus {
            outline: none;
          }

          &.content-save {
            right: 180px;
          }
          &.content-publish {
            right: 110px;
          }
          &.content-delete {
            right: 40px;
          }
        }
      }

      .content-area {
        display: flex;
        flex-grow: 1;

        .content-edit {
          display: flex;
          flex-direction: column;
          flex-grow: 1;
          width: 50%;
          border-right: 1px solid #e5e5e5;
          textarea {
            flex-grow: 1;
            width: 100%;
            height: 100%;
            padding: 20px;
            border: 0;
            outline: transparent;
          }

        }
        .content-preview {
          display: flex;
          flex-grow: 1;
          flex-direction: column;
          width: 50%;
          padding: 20px;
          .wrap {
            width: 100%;
            height: 100%;
            overflow-y: scroll;

            h2 {
              font-size: 40px;
              margin-bottom: 15px;
            }

            p {
              font-size: 18px;
              line-height: 1.5;
            }

          }
        }
      }
    }

  }
</style>

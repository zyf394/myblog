<template>
  <main class="article-list-container">
    <section class="article-list">
      <ul>
        <li v-for="item in articles"
            v-bind:class="[item.id == $route.params.id ? 'current' : '']"
            v-on:click="addCurrentClass" >
          <a v-link="'/articles/' + item.id">
            <section>
              <h3 class="article-title">{{item.title}}</h3>
              <p class="article-author ">
                <i class="iconfont icon-01"></i>
                {{item.author}}
                <time><i class="iconfont icon-06"></i>{{item.publishTime}}</time>
              </p>
              <span v-bind:class="['article-status',item.status === 1 ? 'draft' : 'published']">
                {{item.status === 1 ? '草稿' : '发布'}}
              </span>
            </section>
          </a>
        </li>
      </ul>
    </section>
    <section class="article-content" v-if="$route.params.id">
      <div class="edit-btn iconfont icon-23" v-on:click="jumpToEdit($route.params.id)"></div>
      <div class="wrap">
        <div class="markdown-body" v-html="markedContent()"></div>
      </div>
    </section>

  </main>
</template>
<script type="text/ecmascript-6">
  import {markdown} from 'markdown'
  import hljs from 'highlight.js'

  export default{
    props: {
      articles: {
        type: Array,
        default: [{
          id: 0,
          title: '加载中...',
          content: '加载中...',
          publishTime: '2016-01-01'
        }]
      }
    },
    watch: {
      'articles': function (val, oldVal) {
        document.querySelectorAll('pre code').forEach(block => {
          hljs.highlightBlock(block)
        })
      }
    },
    methods: {
      jumpToEdit: function (id) {
        window.router.go('/edit/' + id)
      },
      addCurrentClass (event) {
        var currentTarget = event.currentTarget
        var currentItem = document.querySelector('.article-list .current')
        if (currentItem) currentItem.className = ''
        currentTarget.className = 'current'
      },
      markedContent: function () {
        var me = this
        var html = ''
        var markedContent
        if (me.articles[this.$route.params.id - 1]) {
          markedContent = me.articles[this.$route.params.id - 1].content || ''
        } else {
          markedContent = me.articles[0].content || ''
        }
        html += markdown.toHTML(markedContent)
        return html
      }
    }
  }
</script>
<style rel="stylesheet/less" type="text/css" lang="less" scoped>
  @import "../../../node_modules/github-markdown-css/github-markdown.css";

  .article-list-container {
    display: flex;
    flex-direction: row;
    flex-grow: 2;
    flex-basis: 800px;


      .article-list {
        flex-grow: 1;
        min-width: 50%;
        overflow-y: scroll;

        ul {
          width: 100%;

          li {
            &:hover{
              background: #fafafa;
            }

            a {
              display: block;
              padding: 20px;
              border-bottom: 1px solid #e5e5e5;
              color: #666;

              &.v-link-active {
                border-left: #5ba4e5 3px solid;
              }

              .article-title {
                font-size: 20px;
                min-height: 26px;
                margin-bottom: 6px;
              }
              .article-author {
                font-size: 12px;
                color: #ccc;
                margin-bottom: 6px;

                i {
                  &::before {
                    font-size: 12px;
                    color: #5cc0ff;
                    margin-right: 4px;

                  }
                }
              }
              .article-summary {
                font-size: 14px;
                line-height: 1.5;
                height: 42px;
                text-overflow: ellipsis;
                overflow: hidden;
                color: #ccc;
              }
              .article-status{
                color: #fff;
                padding: 0 5px;
                font-size: 12px;

                &.draft{
                  background: #b5b5b5;

                }
                &.published{
                  background: #5cc0ff;

                }
              }
            }

          }
        }

      }
      .article-content {
        flex-grow: 1;
        min-width: 50%;
        padding:15px;
        border-left: 1px solid #e5e5e5;
        overflow-y: scroll;

        .wrap {
          width: 100%;
          height: 100%;


          h2{
            font-size: 40px;
            margin-bottom: 15px;
          }

          p{
            font-size: 18px;
            line-height: 1.5;
          }

        }

        .edit-btn {
          position: absolute;
          right: 30px;
          top: 30px;
          cursor: pointer;
        }
      }


  }
</style>

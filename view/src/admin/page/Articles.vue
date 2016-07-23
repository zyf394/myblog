<template>
  <article-component :articles="articles"></article-component>
</template>
<script type="text/ecmascript-6">
  import ArticleComponent from '../components/ArticleList.vue'
  export default{
    data () {
      return {
        articles: [1]
      }
    },
    components: {
      ArticleComponent
    },
    methods: {
      getArticles: function () {
        var me = this
        this.$http.post('/api/article/index', {}).then((response) => {
          me.articles = response.data
        },
          (err) => {
            console.log(err)
          }
        )
      }
    },
    created: function () {
      this.getArticles()
    }
  }
</script>
<style rel="stylesheet/less" type="text/css" lang="less" scoped>

</style>

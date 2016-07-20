<template>
  <header class="blog-header">
    <h1>{{ msg }}</h1>
  </header>
</template>

<script>
  export default {
    data () {
      return {
        msg: 'Shuiyi\'s Blog'
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/less" type="text/css" lang="less" scoped>
  .blog-header {
    h1 {
      margin: 4rem auto 0;
      color: #308ddf;
      font-size: 40px;
      font-weight: 100;
      text-align: center;
      font-family: "Helvetica Neue", Helvetica, 'Source Sans Pro',  Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
    }
  }
</style>

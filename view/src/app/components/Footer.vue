<template>
  <footer class="blog-footer">
    <section class="copyright">水乙的博客 © 2016</section><section class="poweredby">Published by Shuiyi</section>
  </footer>
</template>
<style rel="stylesheet/less" type="text/css" lang="less" scoped>
  .blog-footer{
    width: 90%;
    margin: 4rem auto 1rem;
    padding-top:1rem;
    &::before{
      content: '';
      display: block;
      margin-bottom: 1rem;
      height: 1px;
      transform: scaleY(0.5);
      background: rgba(204,204,204,0.3);
    }
    section{
      display: inline-block;
      width: 50%;
      color: #ccc;
      font-size: 12px;

      &.copyright {
        text-align: left;
      }
      &.poweredby {
        text-align: right;
      }
    }
  }
</style>

<script>
  export default{
    data () {
      return {
        msg: 'hello vue'
      }
    }
  }
</script>

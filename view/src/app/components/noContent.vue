<template>
  <main>
    <div><i class="iconfont icon-51"></i></div>
    <h1>Sorry,there is no content here currently...</h1>
  </main>
</template>
<style scoped>
  main{
    min-height: 10rem;
    width: 90%;
    margin: 0 auto;
    padding: 2rem;
    text-align: center;
  }
  main > div > i{
    display: inline-block;
    margin: 2rem;
    width: 5rem;
    height: 5rem;
    color: #308ddf;
  }
  main > div > i::before{
    font-size: 5rem;
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

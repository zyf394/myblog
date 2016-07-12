<template>
  <div id="app">
    <menu-component></menu-component>
    <router-view></router-view>
    <footer-component></footer-component>
  </div>
</template>

<script>
  import MenuComponent from './components/Menu'
  import FooterComponent from './components/Footer'

  export default {
    components: {
      MenuComponent,
      FooterComponent
    }
  }
</script>

<style lang="less">
  @import "../../bower_components/HTML5-Reset/assets/css/reset.css";
  @import "../assets/iconfont.css";
  html {
    width: 100%;
    height: 100%;
  }

  body {
    width: 100%;
    height: 100%;
    font-family: "Helvetica Neue", Helvetica, 'Source Sans Pro',  Arial, sans-serif;
    font-weight: 100;
    -webkit-font-smoothing: antialiased;
  }

  #app {
    position: relative;
    width: 100%;
  }

   a {
    color: #308ddf;
    text-decoration: none;
  }

</style>

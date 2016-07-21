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
  import FastClick from 'fastclick'

  export default {
    components: {
      MenuComponent,
      FooterComponent
    },
    ready () {
      FastClick.attach(document.body, {})
    }
  }
</script>

<style lang="less">
  @import "../../bower_components/HTML5-Reset/assets/css/reset.css";
  @import "../../node_modules/highlight.js/styles/default.css";
  @import "../assets/iconfont.css";
  html {
    width: 100%;
    height: 100%;
  }

  body {
    width: 100%;
    height: 100%;
    font-weight: normal;
    font-family: 'HanHei SC', 'PingFang SC', 'Helvetica Neue Thin', 'Helvetica', 'STHeitiSC-Light', 'Arial', sans-serif;
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

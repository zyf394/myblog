<template>
  <div id="admin">
    <nav-component></nav-component>
    <router-view></router-view>
  </div>
</template>

<script>
  import NavComponent from './components/Nav'
  export default {
    components: {
      NavComponent
    },
    ready () {
      console.log('ready')
    }
  }
</script>

<style>
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
    font-family: "Helvetica Neue", Helvetica, 'Source Sans Pro',  Arial, sans-serif;
    font-weight: 100;
    -webkit-font-smoothing: antialiased;
  }

  #admin {
    position: relative;
    flex-direction: row;
    display: flex;
    width: 100%;
    height: 100%;
  }

   a {
    color: #5cc0ff;
    text-decoration: none;
  }
</style>

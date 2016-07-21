<template>
  <nav class="mobile-bar iconfont">
    <i v-on:click="showMenu">&#xe624;</i>
  </nav>
  <ul v-bind:class="['mobile-nav-list',menuOpen ? '' : 'expand']">
    <li v-for="item in menu" v-on:click="routeOut">
      <a v-link="{ path: item.href }" ><i class="{{'iconfont ' + item.icon}}"></i>{{item.name}}</a>
    </li>
  </ul>
  <nav class="menu" >
    <ul>
      <li v-for="item in menu">
        <a v-link="{ path: item.href }" ><i class="{{'iconfont ' + item.icon}}"></i>{{item.name}}</a>
      </li>
    </ul>
  </nav>
</template>

<script>
  var menu = [
    {
      name: 'Home',
      icon: 'icon-37',
      href: '/'
    },
    {
      name: 'Profile',
      icon: 'icon-60',
      href: '/profile'
    },
    {
      name: 'About',
      icon: 'icon-40',
      href: '/about'
    }
  ]

  export default {
    data () {
      return {
        menu: menu,
        menuClass: 'menu',
        menuOpen: false
      }
    },
    methods: {
      showMenu: function (event) {
        this.menuOpen = !this.menuOpen
      },
      routeOut: function () {
        this.menuOpen = false
      }
    },
    ready () {
      var me = this
      // var navList = document.querySelector('.mobile-nav-list')
      var navSwitchBtn = document.querySelector('.mobile-bar > i')
      document.addEventListener('click', function (event) {
        var target = event.target
        // var eventPath = event.path
        var isInNavList = true
        var isNavSwitchBtn = target === navSwitchBtn
        while (target.className.indexOf('mobile-nav-list') === -1) {
          target = target.parentNode
          isInNavList = false
          if (target === document) {
            break
          }
        }
        console.log(isInNavList)
        if (!isInNavList && !isNavSwitchBtn) {
          me.menuOpen = false
        }
      })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/less" type="text/css" lang="less" scoped>
  .mobile-bar,.mobile-nav-list{
    display: none;
  }
  .menu {
    padding: 0.5rem 6rem;
    width: 100%;
    box-shadow: 0 0 4px rgba(0,0,0,0.25);

    h3 {
      font-size:16px ;
      color: #fff;
    }
    ul {
      display: flex;
      flex-flow: row nowrap;
      justify-content:space-around;
      max-width: 720px;
      margin: 0 auto;

      li {
        display: inline-block;
        list-style: none;
        text-align: left;
        padding: 0.5rem 0;
        margin: 0 0.6em;
        a {
          color: #b8b8b8;
          font-size: 14px;
          font-weight: 100;

          i{
            padding-right: 0.5rem;
          }

          &::before{
            padding-right: 0.5rem;
          }
          &:hover,&:active {
            color: #000;
          }
        }
      }
    }
  }
  @media screen and (max-width: 720px){
    .mobile-bar{
      display: block;
      position: relative;
      height: 3rem;
      z-index: 2;
      padding: 0.5rem 1rem;
      width: 100%;
      box-shadow: 0 0 4px rgba(0,0,0,0.25);

      i{
        display: inline-block;
        padding: 0.5rem 0;
        font-style: normal;
        color: #b8b8b8;
      }
    }
    .mobile-nav-list{
      display: block;
      position: absolute;
      top: 3rem;
      flex-flow: column nowrap;
      z-index: 1;
      width: 50%;
      height: 100%;
      padding: 0 0.6rem 0.6rem;

      background: #fafafa;
      box-shadow: none;

      transform: translateX(0%);
      transition: all .3s ease;

      /* 必需 */
      &.expand {
        transform: translateX(-100%);
      }

      /* .expand-enter 定义进入的开始状态 */
      /* .expand-leave 定义离开的结束状态 */
      &.expand-enter, &.expand-leave {
        transform: translateX(-100%);
      }


      li{
        a{
          display: block;
          color: #ccc;
          padding: 0.8rem 0;

          i{
            margin-right: 0.5rem;
            color: #ccc;
          }
        }
        &::after{
          content: '';
          display: block;
          height: 1px;
          transform: scaleY(0.5);
          background: rgba(204,204,204,0.3);
        }
      }
    }

    .menu{
      display: none;
    }
  }
</style>

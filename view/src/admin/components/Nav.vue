<template>
  <nav class="nav-bar" >
    <header>
      <div class="user-detail">
        <h2 class="iconfont icon-01">水乙的博客</h2>
        <p>文章管理系统</p>
      </div>
    </header>
    <ul>
      <li v-for="item in navBarList"
          v-on:click="addCurrentClass($index)"
          v-bind:class="item.current ? 'current' : ''">
        <a v-link="{ path: item.href }" ><i class="{{'iconfont ' + item.icon}}"></i>{{item.name}}</a>
      </li>
    </ul>
  </nav>
</template>

<script>
  var navBarList = [
    {
      name: '新建',
      icon: 'icon-23',
      href: '/edit',
      current: false
    },
    {
      name: '文章列表',
      icon: 'icon-24',
      href: '/articles',
      current: false
    },
    {
      name: '其他',
      icon: 'icon-40',
      href: '/others',
      current: false
    }
  ]
  export default {
    data () {
      return {
        navBarList: navBarList,
        current: false
      }
    },
    methods: {
      addCurrentClass: function ($index) {
        this.navBarList.forEach(function (item, index) {
          item.current = (index === $index)
        })
      }
    }
  }
</script>

<style rel="stylesheet/less" type="text/css" lang="less" scoped>
  .nav-bar{
    min-width: 245px;
    background: #fafafa;
    border-right:1px solid #e5e5e5;
    flex-grow: 0;

    header{
      padding: 15px;
      .user-detail{
        display: inline-block;
        h2{
          font-size: 16px;
          line-height: 1.5;
          color: #666;

          &::before{
            padding-right: 6px;
          }
        }
        p{
          font-size: 12px;
          line-height: 1.5;
          color: #ccc;
        }
      }
    }
    ul{
      padding: 15px 30px 15px 0;

      li{
        padding: 6px 15px;
        cursor: pointer;
        a{
          display: block;
          color: #666;
          font-size: 14px;

          i{
            padding-right: 5px;
          }
        }

        &:hover{
          background: rgba(91,164,229,0.15);
          border-radius: 0 4px 4px 0;

        }
        &.current{
          background: #88beec;
          border-radius: 0 4px 4px 0;
          a{
            color: #fff;
          }
        }
      }
    }
  }
</style>

<template>
    <header-component></header-component>
    <content-component></content-component>
</template>
<script type="text/ecmascript-6">
  import HeaderComponent from '../components/Header'
  import ContentComponent from '../components/Content'
  import FooterComponent from '../components/Footer'
  export default{
    data () {
      return {
        msg: 'hello vue'
      }
    },
    components: {
      HeaderComponent,
      ContentComponent,
      FooterComponent
    }
  }
</script>

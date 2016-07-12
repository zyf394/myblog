<template>
  <content-component></content-component>
</template>
<script>
  import ContentComponent from '../components/Content.vue'
  export default{
    data () {
      return {
        msg: 'hello vue'
      }
    },
    components: {
      ContentComponent
    }
  }
</script>

<template>
  <no-content-component></no-content-component>
</template>
<script>
  import NoContentComponent from '../components/NoContent.vue'

  export default{
    data () {
      return {
        msg: 'hello vue'
      }
    },
    components: {
      NoContentComponent
    }
  }
</script>

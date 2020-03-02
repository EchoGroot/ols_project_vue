<template>
  <div>
    <son :imgSrc="msg"></son>
  </div>
</template>
<script>
import test from './test.vue'
export default {
  data () {
    return {
      msg: '这是父组件中的消息'
    }
  },
  components: {
    son: {
      template: test
    }
  }
}
</script>
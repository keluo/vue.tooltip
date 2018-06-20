<template>
<div>
  <br><br><br>
  <vue-tooltip :content='msg' effect='light' placement='right'>一段文字</vue-tooltip>
</div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      msg: 'hello你好'
    }
  },
  watch: {
  },
  methods: {
  }
}
</script>

<template>
<div>
  <br><br><br>
  <vue-tooltip :content='msg' :placement="bottom">11</vue-tooltip>
</div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      msg: 'hello'
    }
  },
  watch: {
  },
  methods: {
  }
}
</script>

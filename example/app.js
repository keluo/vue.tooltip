import Vue from 'vue'
import App from './App.vue'
import Tooltip from '../src'
Vue.use(Tooltip)
new Vue({
  render: h => h(App)
}).$mount('#app')
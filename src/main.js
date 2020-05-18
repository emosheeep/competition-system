import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/antd-ui'
import './plugins/vue-meta'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  mounted () {
    document.dispatchEvent(new Event('pre-render'))
  },
  render: h => h(App)
}).$mount('#app')

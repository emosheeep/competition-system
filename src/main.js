import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './plugins';
import * as API from '@/api';

Vue.config.productionTip = false;
Vue.prototype.$api = API;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');

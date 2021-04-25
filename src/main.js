import Vue from 'vue';
import App from './App.vue';
import router from '@/router';
import store from '@/store';
import * as API from '@/api';
import zhCn from 'ant-design-vue/lib/locale-provider/zh_CN';
import './permission'; // permission control
import '@/plugins';
import '@/tool';

Vue.config.productionTip = false;
Vue.prototype.$api = API;

const vm = new Vue({
  router,
  store,
  render: h => (
    <a-config-provider locale={zhCn}>
      <App/>
    </a-config-provider>
  ),
});

vm.$mount('#app');

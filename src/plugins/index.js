import Vue from 'vue';
import VueMeta from 'vue-meta';
import AntDesign from 'ant-design-vue';
import './form';

Vue.use(VueMeta);

if (process.env.NODE_ENV !== 'production') {
  require('ant-design-vue/dist/antd.min.css');
  require('animate.css');
  Vue.use(AntDesign);
}

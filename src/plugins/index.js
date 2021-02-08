import Vue from 'vue';
import VueMeta from 'vue-meta';
import AntDesign from 'ant-design-vue';
import ConfirmModal from './confirm';
import 'ant-design-vue/dist/antd.min.css';
import 'animate.css';
import './form';

Vue.use(VueMeta);
Vue.use(AntDesign);

Vue.prototype.$confirm = ConfirmModal;

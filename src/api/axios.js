import { message } from 'ant-design-vue';
import axios from 'axios';
import store from '../store';
import router from '../router';
import { LOGOUT } from '@/store/mutation-types';

const http = axios.create({
  baseURL: '/api',
});

// 请求携带token
http.interceptors.request.use(config => {
  if (!config.headers.authorization && store.state.token) {
    config.headers.authorization = store.state.token;
  }
  return config;
});

// 若因401而拒绝，则刷新token，若403则跳转登录
http.interceptors.response.use(({ data }) => {
  const { code } = data;
  if (code === 403) {
    message.destroy();
    store.commit(LOGOUT);
    router
      .replace({ name: 'login' })
      .catch(console.warn)
      .finally(() => {
        message.warn('身份凭证过期，请重新登录');
      });
  }
  if (code !== 200) throw data;
  return data;
}, e => {
  const { status } = e.response;
  console.log(status);
  if (!navigator.onLine) {
    message.error('网络未连接');
  }
  throw e;
});

export default http;

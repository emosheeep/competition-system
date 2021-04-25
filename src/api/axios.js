import { message } from 'ant-design-vue';
import axios from 'axios';
import store from '@/store';

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

http.interceptors.response.use(({ data }) => {
  const { code } = data;
  if (code === 200) return data;
  console.error(data);
  throw data;
}, e => {
  if (!navigator.onLine) {
    message.error('网络未连接');
  }
  throw e;
});

export default http;

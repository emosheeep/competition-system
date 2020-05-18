import axios from 'axios'
import store from '../store'
import router from '../router'

axios.defaults.baseURL = '/server'

// 请求携带token
axios.interceptors.request.use(config => {
  if (store.state.token) {
    config.headers.authorization = store.state.token
  }
  return config
})

// 若因401而拒绝，则跳转登录
axios.interceptors.response.use(null, error => {
  if (/401/.test(error.message)) {
    router.replace({ name: 'login' }).catch(e => e)
  }
  return Promise.reject(error)
})

export default axios

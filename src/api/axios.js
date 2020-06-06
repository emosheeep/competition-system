import { message } from 'ant-design-vue'
import axios from 'axios'
import store from '../store'
import router from '../router'
import handle401 from './handle401'

axios.defaults.baseURL = '/api'

// 请求携带token
axios.interceptors.request.use(config => {
  if (!config.headers.authorization && store.state.token) {
    config.headers.authorization = store.state.token
  }
  return config
})

// 若因401而拒绝，则刷新token，若403则跳转登录
axios.interceptors.response.use(null, error => {
  const { status, config } = error.response
  if (status === 401) {
    return handle401(config)
  } else if (status === 403) {
    router.replace({
      name: 'login'
    }).catch(console.warn).finally(() => {
      message.warn('身份凭证过期，请重新登录')
    })
  }
  return Promise.reject(error)
})

export default axios

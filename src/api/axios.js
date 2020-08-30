import { message } from 'ant-design-vue'
import axios from 'axios'
import store from '../store'
import router from '../router'
import handle401 from './handle401'
import { LOGOUT } from '@/store/types'

const http = axios.create({
  baseURL: '/api',
})

// 请求携带token
http.interceptors.request.use(config => {
  if (!config.headers.authorization && store.state.token) {
    config.headers.authorization = store.state.token
  }
  return config
})

// 若因401而拒绝，则刷新token，若403则跳转登录
http.interceptors.response.use(null, error => {
  if (!navigator.onLine) {
    message.error('网络错误')
    return Promise.reject(error)
  }
  const { status, config } = error.response
  if (status === 401) {
    return handle401(config)
  } else if (status === 403) {
    message.destroy()
    store.commit(LOGOUT)
    router.replace({
      name: 'login',
    }).catch(console.warn).finally(() => {
      message.warn('身份凭证过期，请重新登录')
    })
  } else if (status === 400) {
    message.warn('客户端请求格式错误')
  } else if (status === 500) {
    message.error('服务器错误！状态码 500', 3000)
  } else {
    message.error(error.message)
  }
  return Promise.reject(error)
})

export default http

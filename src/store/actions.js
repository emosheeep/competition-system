import { message } from 'ant-design-vue'
import { LOGIN } from './mutation-types'
import { login } from '../api'

export default {
  [LOGIN] ({ commit, state }, info) {
    return new Promise((resolve, reject) => {
      login(info).then(({ data: result }) => {
        if (result.code === 0) {
          message.success(result.msg)
          commit(LOGIN, result.data)
          resolve(result.data)
        } else {
          message.warn(result.msg)
          reject(new Error(result.msg))
        }
      }).catch(() => {
        if (!navigator.onLine) {
          message.error('网络错误')
          reject(new Error('网络错误'))
        } else {
          message.error('系统错误')
          reject(new Error('系统错误'))
        }
      })
    })
  }
}

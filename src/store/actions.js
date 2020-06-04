import { message } from 'ant-design-vue'
import { LOGIN, REFRESH_TOKEN } from './mutation-types'
import { login, refreshToken } from '../api'

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
  },
  [REFRESH_TOKEN] ({ commit, state }) {
    return new Promise((resolve, reject) => {
      refreshToken(state.refreshToken).then(({ data: newToken }) => {
        commit(REFRESH_TOKEN, newToken)
        resolve(newToken)
      }).catch(reject)
    })
  }
}

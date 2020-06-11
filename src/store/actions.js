import { message } from 'ant-design-vue'
import { LOGIN, REFRESH_TOKEN, UPDATE_PASSWORD, UPDATE_SELF } from './mutation-types'
import { login, refreshToken, updatePassword, updateUser } from '../api'

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
      }).catch(reject)
    })
  },
  [REFRESH_TOKEN] ({ commit, state }) {
    return new Promise((resolve, reject) => {
      refreshToken(state.refreshToken).then(({ data: newToken }) => {
        commit(REFRESH_TOKEN, newToken)
        resolve(newToken)
      }).catch(reject)
    })
  },
  [UPDATE_PASSWORD] ({ commit, state }, data) {
    const key = Date.now()
    const stop = message.loading({ content: '请稍后', key, duration: 0 })
    return new Promise((resolve, reject) => {
      updatePassword(data).then(res => {
        const { code, msg } = res.data
        if (code === 0) {
          message.success({ content: '修改成功', key })
          commit(UPDATE_PASSWORD, data)
          resolve(data)
        } else {
          message.warn({ content: msg, key })
          reject(msg)
        }
      }).catch(() => {
        stop()
        reject()
      })
    })
  },
  [UPDATE_SELF] ({ commit, state }, user) {
    const key = Date.now()
    const { identity } = state.user
    const stop = message.loading({ content: '请稍后', key, duration: 0 })
    return new Promise((resolve, reject) => {
      updateUser(identity, user).then(() => {
        message.success({ content: '修改成功', key })
        commit(UPDATE_SELF, user)
        resolve(user)
      }).catch(() => {
        stop()
        reject()
      })
    })
  }
}

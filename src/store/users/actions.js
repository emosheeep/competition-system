/**
 * 通过mutations间接更新state，这里的方法可以是异步的
 */
import { message } from 'ant-design-vue'
import { ADD_USER, DELETE_USER, SET_USER_LIST, UPDATE_USER } from '../mutation-types'
import { addUser, deleteUser, getUserList, updateUser } from '../../api'

export default {
  [SET_USER_LIST] ({ commit }, type) {
    return new Promise((resolve, reject) => {
      getUserList(type).then(({ data }) => {
        resolve(data)
        commit(SET_USER_LIST, data)
      }).catch(reject)
    })
  },
  [ADD_USER] ({ commit }, { type, users }) {
    const key = Date.now()
    const stopLoading = message.loading({
      key,
      content: '请稍后',
      duration: 0
    })
    return new Promise((resolve, reject) => {
      addUser(type, users).then(({ data }) => {
        if (data.code === 1) {
          reject(data.users)
          message.warn({ content: '用户已存在！', key })
        } else {
          resolve(data)
          commit(ADD_USER, { type, users })
          message.success({ content: '添加成功', key })
        }
      }).catch(() => {
        stopLoading()
        reject()
      })
    })
  },
  [UPDATE_USER] ({ commit }, { type, data: user }) {
    const stopLoading = message.loading('请稍后')
    return new Promise((resolve, reject) => {
      updateUser(type, user).then(({ data }) => {
        resolve(data)
        commit(UPDATE_USER, { type, user: data })
        message.success('修改成功')
      }).catch(reject).finally(stopLoading)
    })
  },
  [DELETE_USER] ({ commit }, { type, data }) {
    if (!Array.isArray(data) || data.length === 0) {
      return
    }
    const stopLoading = message.loading('请稍后')
    return new Promise((resolve, reject) => {
      deleteUser(type, data).then(() => {
        resolve(data)
        commit(DELETE_USER, { type, data })
        message.success('删除成功')
      }).catch(reject).finally(stopLoading)
    })
  }
}

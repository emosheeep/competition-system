/**
 * 通过mutations间接更新state，这里的方法可以是异步的
 */
import { message } from 'ant-design-vue'
import { ADD_USER, DELETE_USER, SET_USER_LIST, UPDATE_USER } from '../mutation-types'
import { addUser, deleteUser, getUserList, updateUser } from '../../plugins/api'

export default {
  [ADD_USER] ({ commit }, { type, users }) {
    const stopLoading = message.loading('请稍后')
    return new Promise((resolve, reject) => {
      addUser(type, users).then(({ data }) => {
        if (data.code === 1) {
          reject(data.users)
          message.warn('用户已存在！')
        } else {
          resolve(data)
          commit(ADD_USER, { type, users })
          message.success('添加成功')
        }
      }).catch(e => {
        reject(e)
        message.error('系统错误，请重试')
      }).finally(() => {
        stopLoading()
      })
    })
  },
  [SET_USER_LIST] ({ commit }) {
    return new Promise((resolve, reject) => {
      getUserList().then(({ data }) => {
        resolve(data)
        commit(SET_USER_LIST, data)
      }).catch(e => {
        reject(e)
        message.error('系统错误，请重试')
      })
    })
  },
  [DELETE_USER] ({ commit }, { type, account }) {
    const stopLoading = message.loading('请稍后')
    return new Promise((resolve, reject) => {
      deleteUser(type, account).then(({ data }) => {
        resolve(data)
        commit(DELETE_USER, { type, account })
        message.success('删除成功')
      }).catch(e => {
        reject(e)
        message.error('系统错误，请重试')
      }).finally(() => {
        stopLoading()
      })
    })
  },
  [UPDATE_USER] ({ commit }, { type, data: user }) {
    const stopLoading = message.loading('请稍后')
    return new Promise((resolve, reject) => {
      updateUser(type, user).then(({ data }) => {
        resolve(data)
        commit(UPDATE_USER, { type, user })
        message.success('修改成功')
      }).catch(e => {
        reject(e)
        message.error('系统错误，请重试')
      }).finally(() => {
        stopLoading()
      })
    })
  }
}

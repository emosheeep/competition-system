/**
 * 通过mutations间接更新state，这里的方法可以是异步的
 */
import {
  ADD_USER, DELETE_USER, GET_USER_LIST
} from '../mutation-types'
import { message } from 'ant-design-vue'
import { addUser, deleteUser, getUserList } from '../../plugins/api'

export default {
  [ADD_USER] ({ commit, state }, { type, users }) {
    const stopLoading = message.loading('请稍后')
    return new Promise((resolve, reject) => {
      addUser(type, users).then(({ data }) => {
        if (data.code === 1) {
          reject(new Error('用户已存在'))
          message.warn('用户已存在！')
        } else {
          resolve(data)
          commit(ADD_USER, { type, users })
        }
        message.success('添加成功')
      }).catch(e => {
        reject(e)
        message.error('系统错误')
      }).finally(() => {
        stopLoading()
      })
    })
  },
  [GET_USER_LIST] ({ commit }) {
    return new Promise((resolve, reject) => {
      getUserList().then(({ data }) => {
        resolve(data)
        commit(ADD_USER, { type: 'student', users: data.students })
        commit(ADD_USER, { type: 'teacher', users: data.teachers })
        commit(ADD_USER, { type: 'admin', users: data.admins })
      }).catch(e => {
        reject(e)
        message.error('系统错误')
      })
    })
  },
  [DELETE_USER] ({ commit, state }, { type, account }) {
    const stopLoading = message.loading('请稍后')
    return new Promise((resolve, reject) => {
      deleteUser(type, account).then(({ data }) => {
        resolve(data)
        switch (type) {
          case 'student':
            commit(DELETE_USER, { type: 'student', account })
            break
          case 'teacher':
            commit(DELETE_USER, { type: 'teacher', account })
            break
          default:
            commit(DELETE_USER, { type: 'admin', account })
        }
        message.success('删除成功')
      }).catch(e => {
        reject(e)
        message.error('系统错误')
      }).finally(() => {
        stopLoading()
      })
    })
  }
}

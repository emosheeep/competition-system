/**
 * 通过mutations间接更新state，这里的方法可以是异步的
 */
import {
  ADD_USER, GET_USER_LIST,
  SET_ADMIN_LIST, SET_STUDENT_LIST, SET_TEACHER_LIST
} from '../mutation-types'
import { message } from 'ant-design-vue'
import { addUser, getUserList } from '../../plugins/api'

export default {
  [ADD_USER] ({ commit, state }, { type, data: user }) {
    const { students, teachers, admins } = state
    const stopLoading = message.loading('请稍后')
    return new Promise((resolve, reject) => {
      addUser(type, user).then(({ data }) => {
        if (data.code === 1) {
          reject(new Error('用户已存在'))
          message.warn('用户已存在！')
        } else {
          resolve(data)
          switch (type) {
            case 'student':
              commit(
                SET_STUDENT_LIST,
                Array.isArray(user) ? students.concat(user) : [...students, user]
              )
              break
            case 'teacher':
              commit(
                SET_TEACHER_LIST,
                Array.isArray(user) ? teachers.concat(user) : [...teachers, user]
              )
              break
            default:
              commit(
                SET_ADMIN_LIST,
                Array.isArray(user) ? admins.concat(user) : [...admins, user]
              )
          }
        }
        stopLoading()
        message.success('添加成功')
      }).catch(e => {
        reject(e)
        message.error('系统错误')
      })
    })
  },
  [GET_USER_LIST] ({ commit }) {
    return new Promise((resolve, reject) => {
      getUserList().then(({ data }) => {
        resolve(data)
        commit(SET_STUDENT_LIST, data.students)
        commit(SET_TEACHER_LIST, data.teachers)
        commit(SET_ADMIN_LIST, data.admins)
      }).catch(e => {
        reject(e)
        message.error('系统错误')
      })
    })
  }
}

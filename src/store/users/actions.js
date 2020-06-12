/**
 * 通过mutations间接更新state，这里的方法可以是异步的
 */
import { message, Modal } from 'ant-design-vue'
import { ADD_USER, DELETE_USER, SET_USER_LIST, UPDATE_USER } from '../mutation-types'
import { addUser, deleteUser, getUserList, updateUser } from '../../api'
import DisplayFailedUser from '../../components/common/DisplayFailedUser'

export default {
  [SET_USER_LIST] ({ commit }, type) {
    return new Promise((resolve, reject) => {
      getUserList(type).then(({ data }) => {
        resolve(data)
        commit(SET_USER_LIST, data)
      }).catch(reject)
    })
  },
  [UPDATE_USER] ({ commit }, { type, data: user }) {
    return new Promise((resolve, reject) => {
      const stopLoading = message.loading('请稍后')
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
  },
  [ADD_USER] ({ commit }, { type, users }) {
    users = !Array.isArray(users) ? [users] : users
    const key = Date.now()
    const stopLoading = message.loading({
      key,
      content: '请稍后',
      duration: 0
    })
    return new Promise((resolve, reject) => {
      addUser(type, users).then(({ data }) => {
        const { code, data: fail, msg: content } = data
        if (code === 0) {
          message.success({ content, key })
          commit(ADD_USER, { type, users })
          return resolve(users)
        }
        // 添加失败
        message.warn({ content, key })
        commit(ADD_USER, {
          type,
          users: users.filter(item => {
            return !fail.includes(item.account) // 过滤添加成功的项
          })
        })
        // 将添加失败的用户展示出来
        if (users.length > 1) {
          displayFailedUser({ users, fail })
        }
        reject(new Error(content))
      }).catch(e => {
        stopLoading()
        reject(e)
      })
    })
  }
}

function displayFailedUser (props) {
  Modal.error({
    title: '添加失败',
    centered: true,
    icon: h => h(''),
    content: h => h(DisplayFailedUser, { props })
  })
}

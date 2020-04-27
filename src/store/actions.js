/**
 * 通过mutations间接更新state，这里的方法可以是异步的
 */
import * as type from './mutation-types'
import { message } from 'ant-design-vue'
import {
  login, addUser
} from '../plugins/api'

export default {
  // 读取待提交清单信息
  [type.LOGIN] ({ commit, state }, data) {
    return new Promise((resolve, reject) => {
      login(data).then(({ data: token }) => {
        commit(type.LOGIN, token)
        resolve(token)
      }).catch(reject)
    })
  },
  [type.ADD_USER] ({ commit, state }, { type, data }) {
    return new Promise((resolve, reject) => {
      addUser(type, data).then(({ data }) => {
        if (data.code === 1) {
          message.warn('用户已存在！')
          reject(new Error('用户已存在'))
        } else {
          message.success('添加成功')
          resolve(data)
        }
      }).catch(e => {
        reject(e)
        message.error('系统错误')
      })
    })
  }
}

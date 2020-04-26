/**
 * 通过mutations间接更新state，这里的方法可以是异步的
 */
import {
  login
} from '../plugins/api'
import * as type from './mutation-types'

export default {
  // 读取待提交清单信息
  [type.LOGIN] ({ commit, state }, data) {
    return new Promise((resolve, reject) => {
      login(data).then(({ data: token }) => {
        commit(type.LOGIN, token)
        resolve(token)
      }).catch(reject)
    })
  }
}

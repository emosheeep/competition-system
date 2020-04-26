/**
 * mutations直接修改数据对象state，注意这里的方法必须是同步方法
 */
import * as type from './mutation-types'

export default {
  // 设置用户信息
  [type.LOGIN] (state, token) {
    state.token = token
  }
}

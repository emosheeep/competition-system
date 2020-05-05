/**
 * 该模块管理员学生教师均需使用，故不作namespace限制，默认注册为全局模块
 */
import actions from './actions'
import mutations from './mutations'

export default {
  state: {
    races: []
  },
  mutations,
  actions
}

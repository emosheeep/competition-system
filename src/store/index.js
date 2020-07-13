import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import users from './modules/users'
import races from './modules/races'
import records from './modules/records'
import persistedState from '../plugins/persisted_state'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'
export default new Vuex.Store({
  strict: debug,
  state: {
    token: '', // 控制短期鉴权
    refreshToken: '', // 控制最长登陆时间
    user: {}
  },
  actions,
  mutations,
  getters,
  modules: {
    users,
    races,
    records
  },
  plugins: debug
    ? [createLogger(), persistedState]
    : [persistedState] // 调试插件，控制台打印具体信息
})

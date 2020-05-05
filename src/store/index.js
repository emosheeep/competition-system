import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import users from './users'
import races from './races'
import student from './student'
import record from './record'
import persistedState from '../plugins/persisted_state'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'
export default new Vuex.Store({
  strict: debug,
  state: {
    expires: '', // 过期时间为七天后
    token: '',
    user: null
  },
  actions,
  mutations,
  modules: {
    users,
    races,
    student,
    record
  },
  plugins: debug
    ? [createLogger(), persistedState]
    : [persistedState] // 调试插件，控制台打印具体信息
})

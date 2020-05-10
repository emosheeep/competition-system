import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import users from './users'
import races from './races'
import records from './records'
import student from './student'
import persistedState from '../plugins/persisted_state'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'
export default new Vuex.Store({
  strict: debug,
  state: {
    token: '',
    identity: '',
    user: null
  },
  actions,
  mutations,
  getters,
  modules: {
    users,
    races,
    student,
    records
  },
  plugins: debug
    ? [createLogger(), persistedState]
    : [persistedState] // 调试插件，控制台打印具体信息
})

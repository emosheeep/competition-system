import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import actions from './actions'
import users from './users'
import races from './races'
import persistedState from '../plugins/persisted_state'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'
export default new Vuex.Store({
  actions,
  state,
  mutations,
  modules: {
    users,
    races
  },
  strict: debug,
  plugins: debug ? [createLogger(), persistedState] : [persistedState] // 调试插件，控制台打印具体信息
})

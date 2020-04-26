/*
vuex最核心的管理对象store, 导出store对象
 */
import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import createPersistedState from 'vuex-persistedstate'
import createLogger from 'vuex/dist/logger'
// import Storage from './storage'

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'
const persistedState = createPersistedState({
  key: 'loginUser',
  storage: window.localStorage
})
export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters,
  strict: debug,
  plugins: debug ? [createLogger(), persistedState] : [persistedState] // 调试插件，控制台打印具体信息
})

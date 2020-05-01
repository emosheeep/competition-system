import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import state from './state'
import user from './user'
import persistedState from '../plugins/persisted_state'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'
export default new Vuex.Store({
  actions,
  state,
  modules: {
    user
  },
  strict: debug,
  plugins: debug ? [createLogger(), persistedState] : [persistedState] // 调试插件，控制台打印具体信息
})

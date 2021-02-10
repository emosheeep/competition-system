import Vue from 'vue';
import Vuex, { createLogger } from 'vuex';
import user from './modules/user';
import persistedState from '../plugins/persisted_state';

Vue.use(Vuex);
const debug = process.env.NODE_ENV !== 'production';
export default new Vuex.Store({
  strict: debug,
  state: {
    token: '', // 控制短期鉴权
    refreshToken: '', // 控制最长登陆时间
  },
  modules: {
    user,
  },
  plugins: debug
    ? [createLogger(), persistedState]
    : [persistedState], // 调试插件，控制台打印具体信息
});

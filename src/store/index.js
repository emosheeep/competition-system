import Vue from 'vue';
import Cookie from 'js-cookie';
import Vuex, { createLogger } from 'vuex';
import { getUserData } from '@/api';

Vue.use(Vuex);
const debug = process.env.NODE_ENV !== 'production';

const store = new Vuex.Store({
  strict: debug,
  plugins: debug ? [createLogger()] : [],
  state: {
    user: {},
  },
  getters: {
    permissions(state) {
      return state.user.permissions || [];
    },
  },
  actions: {
    initUser({ commit }) {
      return getUserData().then(data => {
        commit('setUserData', data.data);
        return data.data;
      });
    },
  },
  mutations: {
    logout() {
      Cookie.remove('uid');
    },
    setUserData(state, user) {
      state.user = user;
    },
  },
});

export default store;

/**
 * 判断当前用户是否具有对应的权限
 * @param {string} permission 类似于user:query这样的字符串
 * @returns {boolean}
 */
Vue.prototype.$has = function(permission) {
  return store.getters.permissions.some(v => v === permission);
};

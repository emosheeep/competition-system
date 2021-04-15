import Vue from 'vue';
import Vuex, { createLogger } from 'vuex';
import { message } from 'ant-design-vue';
import { getUserData } from '@/api';
import router from '@/router';

Vue.use(Vuex);
const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  strict: debug,
  plugins: debug ? [createLogger()] : [],
  state: {
    user: {},
  },
  actions: {
    initUser({ commit }) {
      return getUserData().then(data => {
        commit('setUserData', data.data);
      }).catch(e => {
        message.error(e.msg);
        router.replace('/login');
      });
    },
  },
  mutations: {
    setUserData(state, user) {
      state.user = user;
    },
  },
});

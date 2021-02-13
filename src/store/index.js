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
      return getUserData().then(({ data }) => {
        if (data.code !== 200) {
          message.error(data.msg);
          router.replace('/login');
          return;
        }
        commit('setUserData', data.data);
      });
    },
  },
  mutations: {
    setUserData(state, user) {
      state.user = user;
    },
  },
});

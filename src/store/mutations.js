import { LOGIN, LOGOUT, REFRESH_TOKEN, UPDATE_SELF } from './types';

export default {
  [LOGIN](state, { user, token, refreshToken }) {
    state.user = user;
    state.token = token;
    state.refreshToken = refreshToken;
  },
  [LOGOUT](state) {
    state.user = {};
    state.token = '';
    state.refreshToken = '';
  },
  [REFRESH_TOKEN](state, newToken) {
    state.token = newToken;
  },
  [UPDATE_SELF](state, user) {
    state.user = Object.assign(state.user, user);
  },
};

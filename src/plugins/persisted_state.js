import createPersistedState from 'vuex-persistedstate';

export default createPersistedState({
  key: 'UserInfo',
  storage: window.localStorage,
  reducer: function(state) {
    return {
      user: state.user,
      token: state.token,
      refreshToken: state.refreshToken,
    };
  },
});

import createPersistedState from 'vuex-persistedstate'

export default createPersistedState({
  key: 'loginUser',
  storage: window.localStorage,
  reducer: function (state) {
    return {
      user: state.user,
      token: state.token,
      refreshToken: state.refreshToken
    }
  }
})

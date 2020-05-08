import createPersistedState from 'vuex-persistedstate'

export default createPersistedState({
  key: 'loginUser',
  storage: window.localStorage,
  reducer: function (state) {
    return {
      expires: state.expires,
      token: state.token,
      user: state.user,
      races: state.races
    }
  }
})

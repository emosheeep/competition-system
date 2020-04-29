import createPersistedState from 'vuex-persistedstate'

export default createPersistedState({
  key: 'loginUser',
  storage: window.localStorage,
  reducer: function ({ expires, token }) {
    return {
      expires,
      token
    }
  }
})

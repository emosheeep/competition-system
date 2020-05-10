export default {
  isLogin (state) {
    if (!state.user || !state.token || !state.identity) {
      return false
    } else {
      return true
    }
  }
}

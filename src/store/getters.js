export default {
  isLogin (state) {
    return !!(
      state.token &&
      state.refreshToken &&
      state.user.account &&
      state.user.identity
    )
  }
}

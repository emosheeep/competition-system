export default {
  isLogin (state) {
    return !!(
      state.token &&
      state.user.account &&
      state.user.identity
    )
  }
}

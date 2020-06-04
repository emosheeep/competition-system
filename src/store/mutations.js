import { LOGIN, LOGOUT, REFRESH_TOKEN } from './mutation-types'

export default {
  [LOGIN] (state, { user, token, refreshToken }) {
    state.user = user
    state.token = token
    state.refreshToken = refreshToken
  },
  [LOGOUT] (state) {
    state.user = {}
    state.token = ''
    state.refreshToken = ''
  },
  [REFRESH_TOKEN] (state, newToken) {
    state.token = newToken
  }
}

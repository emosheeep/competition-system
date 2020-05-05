import { LOGIN, LOGOUT } from './mutation-types'

export default {
  [LOGIN] (state, { user, token }) {
    state.user = user
    state.token = token
  },
  [LOGOUT] (state) {
    state.user = null
    state.token = ''
    state.expires = ''
  }
}

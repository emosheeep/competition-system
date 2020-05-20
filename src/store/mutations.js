import { LOGIN, LOGOUT } from './mutation-types'

export default {
  [LOGIN] (state, { user, token, identity }) {
    state.identity = identity
    state.user = user
    state.token = token
  },
  [LOGOUT] (state) {
    state.user = {}
    state.token = ''
    state.identity = ''
  }
}

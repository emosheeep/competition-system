import { LOGIN } from './mutation-types'

export default {
  [LOGIN] (state, { user, token }) {
    state.user = user
    state.token = token
  }
}

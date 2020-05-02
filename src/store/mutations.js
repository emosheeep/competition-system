import { LOGIN } from './mutation-types'

export default {
  [LOGIN] (state, token) {
    state.token = token
  }
}

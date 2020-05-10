import { LOGIN } from './mutation-types'
import { login } from '../api'

export default {
  [LOGIN] ({ commit, state }, info) {
    return new Promise((resolve, reject) => {
      login(info).then(({ data }) => {
        commit(LOGIN, data)
        resolve(info)
      }).catch(reject)
    })
  }
}

import * as type from './mutation-types'
import { login } from '../plugins/api'

export default {
  [type.LOGIN] ({ commit, state }, data) {
    return new Promise((resolve, reject) => {
      login(data).then(({ data: token }) => {
        commit(type.LOGIN, token)
        resolve(token)
      }).catch(reject)
    })
  }
}

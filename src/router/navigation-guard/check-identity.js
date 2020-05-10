/**
 * 身份验证，防止不同身份的用户串门
 */
import store from '../../store'
import { LOGOUT } from '../../store/mutation-types'

export default function (to, from, next) {
  // 登录页面不做校验
  if (to.fullPath === '/') {
    return next()
  }
  const curIdentity = store.state.identity
  const { meta: { identity } } = to.matched.find(item => item.meta.identity)
  if (curIdentity !== identity) {
    store.commit(LOGOUT)
    next({ name: 'login' })
  } else {
    next()
  }
}

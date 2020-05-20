/**
 * 登陆状态验证，防止未登录就访问
 */
import store from '../../store'
import { LOGOUT } from '../../store/mutation-types'

export default function (to, from, next) {
  // 已登录状态跳向登陆页面，自动登出
  if (to.fullPath === '/' && store.getters.isLogin) {
    store.commit(LOGOUT)
    next()
  } else if (to.matched.some(item => item.meta.auth)) {
    if (store.getters.isLogin) {
      next()
    } else {
      next({ name: 'login' })
      store.commit(LOGOUT)
    }
  } else {
    next()
  }
}

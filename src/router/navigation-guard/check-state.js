/**
 * 登陆状态验证，防止未登录就访问
 */
import store from '../../store';
import { LOGOUT } from '@/store/mutation-types';

export default function(to, from, next) {
  if (to.path === '/404') {
    return next();
  }
  const { identity } = store.state.user;
  // 已登录状态跳向登陆页面，则重定向回当前用户对应的主页
  if (to.fullPath === '/' && store.getters.isLogin) {
    next({ name: identity });
  // 如果是需要鉴权的页面，判定是否登录，未登录则跳转登录
  } else if (to.matched.some(item => item.meta.auth)) {
    if (store.getters.isLogin) {
      next();
    } else {
      next({ name: 'login' });
      store.commit(LOGOUT);
    }
  } else {
    next();
  }
}

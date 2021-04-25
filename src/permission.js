import Cookie from 'js-cookie';
import store from '@/store';
import router from '@/router';
import { notification } from 'ant-design-vue';
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css';

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const loginPath = '/login';
const defaultRoutePath = '/race/list';
const whiteList = ['Login'];

router.beforeEach(async (to, from, next) => {
  NProgress.start(); // start progress bar

  const token = Cookie.get('uid');

  /* 未登录 */
  if (!token) {
    if (whiteList.includes(to.name)) {
      next();
    } else {
      next({
        path: loginPath,
        query: {
          redirect: to.fullPath,
        },
      });
    }
    return;
  }

  /* 已登录情况下访问登录界面 */
  if (to.path === loginPath) {
    next(defaultRoutePath);
    return;
  }

  /* 已获取用户信息 */
  if (store.getters.permissions?.length) {
    next();
    NProgress.done();
    return;
  }

  /* 未获取用户信息 */
  try {
    await store.dispatch('initUser');
  } catch (e) {
    store.commit('logout');
    next({ path: loginPath, query: { redirect: to.fullPath } });
    notification.error({
      message: '错误',
      description: '请求用户信息失败，请重试',
    });
    NProgress.done();
    return;
  }

  /* 成功获取用户信息 */
  // 检查路由权限
  if (!checkAccess(to)) {
    next({ path: defaultRoutePath, replace: true });
    NProgress.done();
    return;
  }
  const redirect = decodeURIComponent(from.query.redirect || to.path);
  // 路径相同直接替换history
  if (redirect === to.path) {
    next({ ...to, replace: true });
  } else {
    next(redirect);
  }
  NProgress.done();
});

router.afterEach(() => {
  NProgress.done(); // finish progress bar
});

/**
 * 判断当前路由是否可以进入
 * @param {} route
 * @param {Array} permission
 * @returns {boolean}
 */
function checkAccess(route) {
  const set = new Set(store.getters.permissions);
  const { matched } = route;
  return matched.some(v => set.has(v.meta.auth));
}

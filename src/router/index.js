import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: () => import('@/pages/index'),
    redirect: '/race',
    children: [
      {
        path: 'race',
        component: () => import('@/pages/Race'),
        meta: {
          title: '赛事',
          auth: 'race:query',
        },
      },
      {
        path: 'record',
        component: () => import('@/pages/Record'),
        meta: {
          title: '参赛记录',
          auth: 'record:query',
        },
      },
      {
        path: 'student',
        component: () => import('@/pages/Student'),
        meta: {
          title: '学生列表',
          auth: 'user:query',
        },
      },
      {
        path: 'teacher',
        component: () => import('@/pages/Teacher'),
        meta: {
          title: '教师列表',
          auth: 'user:query',
        },
      },
      {
        path: 'role_list',
        component: () => import('@/pages/RoleList'),
        meta: {
          title: '角色列表',
          auth: 'role:query',
        },
      },
      {
        path: 'permission_list',
        component: () => import('@/pages/PermissionList'),
        meta: {
          title: '权限列表',
          auth: 'permission:query',
        },
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "Login" */'@/pages/Login'),
  },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "404" */'@/components/common/404'),
  },
  {
    path: '*',
    redirect: '/404',
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;

import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: () => import('@/pages/index'),
    children: [
      {
        path: 'race',
        name: '赛事',
        component: () => import(/* webpackChunkName: "Race" */'@/pages/Race'),
      },
      {
        path: 'record',
        name: '参赛记录',
        component: () => import(/* webpackChunkName: "Record" */ '@/pages/Record'),
      },
      {
        path: 'student',
        name: '学生列表',
        component: () => import(/* webpackChunkName: "User" */ '@/pages/Student'),
      },
      {
        path: 'teacher',
        name: '教师列表',
        component: () => import(/* webpackChunkName: "User" */ '@/pages/Teacher'),
      },
      {
        path: 'role_list',
        name: '角色列表',
        component: () => import(/* webpackChunkName: "User" */ '@/pages/RoleList'),
      },
      {
        path: 'permission_list',
        name: '权限列表',
        component: () => import(/* webpackChunkName: "User" */ '@/pages/PermissionList'),
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    meta: { noAuth: true },
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

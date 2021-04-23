import Vue from 'vue';
import VueRouter from 'vue-router';
import GlobalLayout from '@/layouts/GlobalLayout';

Vue.use(VueRouter);

const RouteView = {
  name: 'RouteView',
  render: h => h('router-view'),
};

export const routes = [
  {
    path: '/',
    name: 'Home',
    meta: { title: '主页' },
    redirect: '/race/list',
    component: GlobalLayout,
    children: [
      {
        path: '/race',
        name: 'Race',
        redirect: '/race/list',
        component: RouteView,
        meta: { title: '赛事管理', icon: 'appstore', auth: 'race:query' },
        children: [
          {
            path: '/race/list',
            name: 'RaceList',
            component: () => import('@/pages/race/Race'),
            meta: { title: '赛事列表', auth: 'race:query' },
          },
          {
            path: '/race/record',
            name: 'Record',
            component: () => import('@/pages/race/Record'),
            meta: { title: '参赛记录', auth: 'record:query' },
          },
        ],
      },
      {
        path: '/user',
        redirect: '/user/student',
        name: 'User',
        component: RouteView,
        meta: { title: '用户管理', icon: 'user', auth: 'user:query' },
        children: [
          {
            path: '/user/student',
            name: 'Student',
            component: () => import('@/pages/user/Student'),
            meta: { title: '学生列表', auth: 'user:query' },
          },
          {
            path: '/user/teacher',
            name: 'Teacher',
            component: () => import('@/pages/user/Teacher'),
            meta: { title: '教师列表', auth: 'user:query' },
          },
        ],
      },
      {
        path: '/role',
        redirect: '/role/list',
        name: 'Role',
        component: RouteView,
        meta: { title: '权限管理', icon: 'key' },
        children: [
          {
            path: '/role/list',
            name: 'RoleList',
            component: () => import('@/pages/role/RoleList'),
            meta: { title: '角色列表', auth: 'role:query' },
          },
          {
            path: '/role/permission',
            name: 'Permission',
            component: () => import('@/pages/role/PermissionList'),
            meta: { title: '权限列表', auth: 'permission:query' },
          },
        ],
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/Login'),
  },
  {
    path: '/404',
    component: () => import('@/components/common/404'),
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

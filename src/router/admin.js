import store from '../store'

export default [
  {
    path: '/admin',
    name: 'admin',
    component: () => import(
      /* webpackChunkName: "Admin" */
      '../pages/Admin'
    ),
    redirect: '/admin/race',
    meta: {
      auth: true,
      identity: 'admin',
    },
    children: [
      {
        path: 'race',
        name: '赛事',
        component: () => import(
          /* webpackChunkName: "Admin" */
          '../pages/admin/AdminShowRace'
        ),
      },
      {
        path: 'record',
        name: '参赛记录',
        component: () => import(
          /* webpackChunkName: "AdminShowRecord" */
          '../pages/admin/AdminShowRecord'
        ),
        props: route => ({ type: 'admin' }),
      },
      {
        path: 'user',
        name: '学生教师',
        component: () => import(
          /* webpackChunkName: "AdminShowUser" */
          '../pages/admin/AdminShowUser'
        ),
      },
      {
        path: 'root',
        name: '管理员',
        component: () => import(
          /* webpackChunkName: "RootShowAdmin" */
          '../pages/admin/RootShowAdmin'
        ),
        beforeEnter (to, from, next) {
          const { power } = store.state.user
          if (power === 'root') {
            next()
          } else {
            next({ path: '/404' })
          }
        },
      },
      {
        path: 'self',
        name: '账号信息',
        component: () => import(
          /* webpackChunkName: "AdminUpdateSelfInfo" */
          '../pages/admin/AdminUpdateSelfInfo'
        ),
      },
    ],
  },
]

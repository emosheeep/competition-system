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
      identity: 'admin'
    },
    children: [
      {
        path: 'race',
        component: () => import(
          /* webpackChunkName: "Admin" */
          '../pages/admin/AdminShowRace'
        )
      },
      {
        path: 'user',
        component: () => import(
          /* webpackChunkName: "AdminShowUser" */
          '../pages/admin/AdminShowUser'
        )
      },
      {
        path: 'root',
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
        }
      },
      {
        path: 'record',
        component: () => import(
          /* webpackChunkName: "AdminShowRecord" */
          '../pages/admin/AdminShowRecord'
        ),
        props: route => ({ type: 'admin' })
      },
      {
        path: 'detail',
        component: () => import(
          /* webpackChunkName: "RaceDetailWithRecords" */
          '../components/race/RaceDetailWithRecords'
        ),
        props: route => ({ id: route.query.id, type: 'admin' })
      },
      {
        path: 'self',
        component: () => import(
          /* webpackChunkName: "AdminUpdateSelfInfo" */
          '../pages/admin/AdminUpdateSelfInfo'
        )
      }
    ]
  }
]

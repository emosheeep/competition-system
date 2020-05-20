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
          '../components/admin/AdminShowRace'
        )
      },
      {
        path: 'user',
        component: () => import(
          /* webpackChunkName: "User" */
          '../components/user/User'
        )
      },
      {
        path: 'record',
        component: () => import(
          /* webpackChunkName: "AdminShowRecord" */
          '../components/admin/AdminShowRecord'
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
      }
    ]
  }
]

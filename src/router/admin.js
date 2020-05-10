export default [
  {
    path: '/admin',
    name: 'admin',
    component: () => import(/* webpackChunkName: "Admin" */'../pages/Admin'),
    redirect: '/admin/race',
    meta: {
      auth: true,
      identity: 'admin'
    },
    children: [
      {
        path: 'race',
        component: () => import(/* webpackChunkName: "Race" */'../components/race/Race')
      },
      {
        path: 'user',
        component: () => import(/* webpackChunkName: "User" */'../components/user/User')
      },
      {
        path: ':id',
        component: () => import(/* webpackChunkName: "Detail" */'../components/admin/Detail'),
        props: route => ({ id: route.params.id, type: 'admin' })
      }
    ]
  }
]

export default [
  {
    path: '/admin',
    name: 'admin',
    component: () => import(/* webpackChunkName: "Admin" */'../pages/Admin'),
    children: [
      {
        path: 'race',
        component: () => import(/* webpackChunkName: "Race" */'../components/admin/Race')
      },
      {
        path: 'user',
        component: () => import(/* webpackChunkName: "User" */'../components/admin/User')
      },
      {
        path: ':id',
        component: () => import(/* webpackChunkName: "Detail" */'../components/admin/Detail'),
        props: route => ({ id: route.params.id, type: 'admin' })
      }
    ]
  }
]

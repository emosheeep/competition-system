export default [
  {
    path: '/teacher',
    name: 'teacher',
    component: () => import(/* webpackChunkName: "Teacher" */'../pages/Teacher'),
    children: [
      {
        path: 'race',
        component: () => import(/* webpackChunkName: "Teacher" */'../components/teacher/index')
      },
      {
        path: 'record',
        component: () => import(/* webpackChunkName: "ShowRecord" */'../components/record/ShowRecord'),
        props: route => ({ type: 'teacher' })
      },
      {
        path: ':id',
        component: () => import(/* webpackChunkName: "Detail" */'../components/admin/Detail'),
        props: route => ({ id: route.params.id })
      }
    ]
  }
]

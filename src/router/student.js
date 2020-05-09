export default [
  {
    path: '/student',
    name: 'student',
    component: () => import(/* webpackChunkName: "Student" */'../pages/Student'),
    children: [
      {
        path: 'race',
        component: () => import(/* webpackChunkName: "Student" */'../components/student/index')
      },
      {
        path: 'record',
        component: () => import(/* webpackChunkName: "ShowRecord" */'../components/record/ShowRecord'),
        props: route => ({ type: 'student' })
      }
    ]
  }
]

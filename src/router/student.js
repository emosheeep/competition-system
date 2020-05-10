export default [
  {
    path: '/student',
    name: 'student',
    component: () => import(/* webpackChunkName: "Student" */'../pages/Student'),
    redirect: '/student/race',
    meta: {
      auth: true,
      identity: 'student'
    },
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

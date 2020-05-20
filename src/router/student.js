export default [
  {
    path: '/student',
    name: 'student',
    component: () => import(
      /* webpackChunkName: "Student" */
      '../pages/Student'
    ),
    redirect: '/student/race',
    meta: {
      auth: true,
      identity: 'student'
    },
    children: [
      {
        path: 'race',
        component: () => import(
          /* webpackChunkName: "Student" */
          '../components/student/StudentShowRace'
        )
      },
      {
        path: 'record',
        component: () => import(
          /* webpackChunkName: "StudentShowRecord" */
          '../components/student/StudentShowRecord'
        )
      }
    ]
  }
]

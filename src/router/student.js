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
          '../pages/student/StudentShowRace'
        )
      },
      {
        path: 'record',
        component: () => import(
          /* webpackChunkName: "StudentShowRecord" */
          '../pages/student/StudentShowRecord'
        )
      },
      {
        path: 'self',
        component: () => import(
          /* webpackChunkName: "StudentUpdateSelfInfo" */
          '../pages/student/StudentUpdateSelfInfo'
        )
      }
    ]
  }
]

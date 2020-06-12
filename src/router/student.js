export default [
  {
    path: '/student',
    name: 'student',
    component: () => import(
      /* webpackChunkName: "Student" */
      '../pages/Student'
    ),
    redirect: '/student/teacher',
    meta: {
      auth: true,
      identity: 'student'
    },
    children: [
      {
        path: 'teacher',
        component: () => import(
          /* webpackChunkName: "StudentShowTeacher" */
          '../pages/student/StudentShowTeacher'
        )
      },
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

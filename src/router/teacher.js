export default [
  {
    path: '/teacher',
    name: 'teacher',
    component: () => import(
      /* webpackChunkName: "Teacher" */
      '../pages/Teacher'
    ),
    redirect: '/teacher/race',
    meta: {
      auth: true,
      identity: 'teacher'
    },
    children: [
      {
        path: 'race',
        component: () => import(
          /* webpackChunkName: "Teacher" */
          '../components/teacher/TeacherShowRace'
        )
      },
      {
        path: 'record',
        component: () => import(
          /* webpackChunkName: "TeacherShowRecord" */
          '../components/teacher/TeacherShowRecord'
        )
      },
      {
        path: 'detail',
        component: () => import(
          /* webpackChunkName: "RaceDetailWithRecords" */
          '../components/race/RaceDetailWithRecords'
        ),
        props: route => ({ id: route.query.id, type: 'teacher' })
      }
    ]
  }
]

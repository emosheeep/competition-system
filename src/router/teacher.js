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
      identity: 'teacher',
    },
    children: [
      {
        path: 'race',
        name: '竞赛信息',
        component: () => import(
          /* webpackChunkName: "Teacher" */
          '../pages/teacher/TeacherShowRace'
        ),
      },
      {
        path: 'record',
        name: '学生参赛记录',
        component: () => import(
          /* webpackChunkName: "TeacherShowRecord" */
          '../pages/teacher/TeacherShowRecord'
        ),
      },
      {
        path: 'self',
        name: '个人信息',
        component: () => import(
          /* webpackChunkName: "TeacherUpdateSelfInfo" */
          '../pages/teacher/TeacherUpdateSelfInfo'
        ),
      },
    ],
  },
];

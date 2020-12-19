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
      identity: 'student',
    },
    children: [
      {
        path: 'teacher',
        name: '教师信息',
        component: () => import(
          /* webpackChunkName: "StudentShowTeacher" */
          '../pages/student/StudentShowTeacher'
        ),
      },
      {
        path: 'race',
        name: '竞赛列表',
        component: () => import(
          /* webpackChunkName: "Student" */
          '../pages/student/StudentShowRace'
        ),
      },
      {
        path: 'record',
        name: '我的参赛记录',
        component: () => import(
          /* webpackChunkName: "StudentShowRecord" */
          '../pages/student/StudentShowRecord'
        ),
      },
      {
        path: 'self',
        name: '我的个人信息',
        component: () => import(
          /* webpackChunkName: "StudentUpdateSelfInfo" */
          '../pages/student/StudentUpdateSelfInfo'
        ),
      },
    ],
  },
];

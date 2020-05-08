import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import(/* webpackChunkName: "Login" */'../pages/Login')
  },
  {
    path: '/teacher',
    name: 'teacher',
    component: () => import(/* webpackChunkName: "Teacher" */'../pages/Teacher')
  },
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
        component: () => import(/* webpackChunkName: "Student" */'../components/student/ShowRecord')
      }
    ]
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import(/* webpackChunkName: "Admin" */'../pages/Admin'),
    children: [
      {
        path: 'race',
        component: () => import(/* webpackChunkName: "Admin" */'../components/admin/Race')
      },
      {
        path: 'user',
        component: () => import(/* webpackChunkName: "Admin" */'../components/admin/User')
      },
      {
        path: ':id',
        component: () => import(/* webpackChunkName: "Admin" */'../components/admin/Record'),
        props: route => ({ id: route.params.id })
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

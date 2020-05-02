import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../pages/Login'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/teacher',
    name: 'teacher',
    component: () => import(/* webpackChunkName: "Teacher" */'../pages/Teacher')
  },
  {
    path: '/student',
    name: 'student',
    component: () => import(/* webpackChunkName: "Student" */'../pages/Student')
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import(/* webpackChunkName: "Admin" */'../pages/Admin'),
    children: [
      {
        path: 'race',
        name: 'race',
        component: () => import(/* webpackChunkName: "Admin" */'../components/admin/Race')
      },
      {
        path: 'user',
        name: 'user',
        component: () => import(/* webpackChunkName: "Admin" */'../components/admin/User')
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

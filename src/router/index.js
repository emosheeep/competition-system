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
    component: () => import('../pages/Teacher')
  },
  {
    path: '/student',
    name: 'student',
    component: () => import('../pages/Student')
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../pages/Admin'),
    children: [
      {
        path: 'race',
        name: 'race',
        component: () => import('../components/admin/Race')
      },
      {
        path: 'user',
        name: 'user',
        component: () => import('../components/admin/User')
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

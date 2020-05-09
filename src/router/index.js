import Vue from 'vue'
import VueRouter from 'vue-router'
import teacher from './teacher'
import admin from './admin'
import student from './student'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import(/* webpackChunkName: "Login" */'../pages/Login')
  },
  ...teacher,
  ...student,
  ...admin
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

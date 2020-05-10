import Vue from 'vue'
import VueRouter from 'vue-router'
import teacher from './teacher'
import admin from './admin'
import student from './student'
import CheckState from './navigation-guard/check-state'
import CheckIdentity from './navigation-guard/check-identity'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    meta: { auth: false },
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

router.beforeEach(CheckState)
router.beforeEach(CheckIdentity)

export default router

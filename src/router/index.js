import Vue from 'vue'
import VueRouter from 'vue-router'
import Benchmarks from '../views/Benchmarks.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Benchmarks',
    component: Benchmarks
  },
  {
    path: '/submit',
    name: 'Submit',
    component: () => import(/* webpackChunkName: "submit" */ '../views/Submit.vue')
  },
  {
    path: '/calculator',
    name: 'Calculator',
    component: () => import(/* webpackChunkName: "calculator" */ '../views/Calculator.vue')
  },
  {
    path: '/admin/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/admin/Login.vue')
  },
  {
    path: '/admin/unconfirmed-benchmarks',
    name: 'Admin Panel',
    component: () => import(/* webpackChunkName: "admin" */ '../views/admin/UBenchmarks.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

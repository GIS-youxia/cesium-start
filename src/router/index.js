import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/quickStart',
    name: 'QuickStart',
    component: () => import('@/views/base/quickStart'),
  },
  {
    path: '/widget',
    name: 'Widget',
    component: () => import('@/views/base/widget'),
  },
  {
    path: '/viewer',
    name: 'Viewer',
    component: () => import('@/views/base/viewer'),
  },
  {
    path: '/addModelByEntity',
    name: 'Model',
    component: () => import('@/views/base/model/byEntities'),
  },
  {
    path: '/addModelByPrimitives',
    name: 'addModelByPrimitives',
    component: () => import('@/views/base/model/byPrimitives'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router

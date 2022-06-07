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
    path: '/3dmodel',
    name: 'Model',
    component: () => import('@/views/base/model/glb/index.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router

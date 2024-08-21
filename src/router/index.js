import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/ex1',
      name: 'ex1',
      component: () => import('../views/Ex1View.vue')
    },
    {
      path: '/ex2',
      name: 'ex2',
      component: () => import('../views/Ex2View.vue')
    },
    {
      path: '/ex3',
      name: 'ex3',
      component: () => import('../views/Ex3View.vue')
    }
  ]
})

export default router

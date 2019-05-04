import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/views/Dashboard.vue'
import Board from '@/views/Board.vue'

Vue.use(Router)

const router = new Router({
  // mode: 'history',
  routes: [{
      path: '/',
      name: 'home',
      redirect: '/dashboard'
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/boards/:id',
      name: 'board',
      component: Board
    }
  ]
})


export default router
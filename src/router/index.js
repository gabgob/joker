import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'select-players',
    component: function () {
      return import(/* webpackChunkName: "HomeView" */ '../views/HomeView.vue')
    }
  },
  {
    path: '/game/:gameId',
    name: 'game',
    component: function () {
      return import(/* webpackChunkName: "GameView" */ '../views/GameView.vue')
    }
  },
  {
    path: '/statistik',
    name: 'statistik',
    component: function () {
      return import(/* webpackChunkName: "StatisticView" */ '../views/StatisticView.vue')
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  base: '/',
  routes
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import colorCheck from "../views/colorCheck.vue";
import colorRecommond from "../views/colorRecommond.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: colorCheck
    },
    {
      path: '/colorRecommond',
      name: 'colorRecommond',
      component: colorRecommond
    },

  ]
})

export default router

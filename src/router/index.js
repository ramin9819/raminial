import { createRouter, createWebHashHistory } from 'vue-router'

import PostsList from '../views/PostsList'

const routes = [
  {path:'/' , component:PostsList}
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

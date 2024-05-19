import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomeView.vue'
import Team from '../views/TeamView.vue'
import TeamDetail from '../views/TeamDetailView.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/team', component: Team },
  { path: '/team/:id', component: TeamDetail }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

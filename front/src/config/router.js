import Vue from 'vue'
import VueRouter from 'vue-router'

import AppHome from '../components/home/app-home.vue'
import AdminPages from '../components/admin/admin-pages.vue'
import ArticlesByCategory from '../components/article/articles-by-category.vue'
import ArticleById from '../components/article/article-by-id.vue'
import AuthArea from '../components/auth/auth-area.vue'
import { userKey } from '@/global'



Vue.use(VueRouter)

const routes = [
  {
    name: "home",
    path: "/",
    component: AppHome
  },
  {
    name: "adminPages",
    path: "/admin",
    component: AdminPages,
    meta: { requiresAdmin: true }
  },
  {
    name: 'articlesByCategory',
    path: '/categories/:id/articles',
    component: ArticlesByCategory
  },
  {
    name: 'articleById',
    path: '/articles/:id',
    component: ArticleById
  },
  {
    name: 'auth',
    path: '/auth',
    component: AuthArea
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  const json = localStorage.getItem(userKey)

  if (to.matched.some(record => record.meta.requiresAdmin)) {
    const user = JSON.parse(json)
    user && user.admin === 'true' ? next() : next({ path: '/' })
  } else {
    next()
  }
})

export default router

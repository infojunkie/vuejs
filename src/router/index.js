import { createRouter, createWebHistory } from 'vue-router'
import AllPages from '../views/AllPages.vue'
import BlogDetail from '@/components/BlogDetail.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/blog/post/:inode',
      name: 'BlogDetail',
      component: BlogDetail,
      props: route => {
        return { dataPath: '/Blog', ...route.params }
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'AllPages',
      component: AllPages
    }
  ]
})

export default router

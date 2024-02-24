import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('../pages/index.vue')
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: () => import('../pages/dashboard.vue')
        }
    ]
})

export default router

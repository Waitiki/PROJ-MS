import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			component: Home
		},
		{
			path: '/Login',
			component: () => import('../views/LoginForm.vue')
		},
		{
			path: '/projects',
			component: () => import('../views/projects.vue')
		}
	
	],
})

export default router
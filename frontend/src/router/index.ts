import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterPage from '@/views/account/RegisterPage.vue'
import ForgetPasswordPage from '@/views/account/ForgetPasswordPage.vue'
import LoginPage from '@/views/account/LoginPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/account',
      children: [
        { path: 'login', name: 'login', component: LoginPage },
        { path: 'register', name: 'register', component: RegisterPage },
        { path: 'forget-password', name: 'forgetPassword', component: ForgetPasswordPage }
      ]
    }
  ]
})

export default router

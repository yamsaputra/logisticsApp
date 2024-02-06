import { createRouter, createWebHistory } from '@ionic/vue-router';
import tabs from '../components/ion-tabs.vue';
import HomePage from '../views/HomePage.vue';
import TrustPage from '../views/TrustPage.vue';
import AccountPage from '../views/AccountPage.vue';
import LoginPage from '../views/LoginPage.vue';
import SignupPage from '../views/SignupPage.vue';
import MessagePage from '../views/messagePage.vue';
import BringPage from '../views/bringPage.vue';
import PackagePage from '../views/packagePage.vue';

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/login',
    component: LoginPage
  },
  {
    path: '/signup',
    component: SignupPage
  },
  {
    path: '/bring',
    component: BringPage
  },
  {
    path: '/account',
    component: AccountPage
  },
  {
    path: '/message',
    component: MessagePage
  },
  {
    path: '/',
    component: tabs,
    children: [
      {
        path: '',
        name: 'Home',
        redirect: '/home'
      },
      {
        path: '/home',
        component: HomePage
      },
      {
        path: '/package',
        component: PackagePage
      },
      {
        path: '/trust',
        component: TrustPage
      },
      {
        path: '/message',
        component: MessagePage
      },
      {
        path: '/account',
        component: AccountPage
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router

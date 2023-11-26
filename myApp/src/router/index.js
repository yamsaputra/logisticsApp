import { createRouter, createWebHistory } from '@ionic/vue-router';
import tabs from '../components/ion-tabs.vue'
import HomePage from '../views/HomePage.vue'
import FlyerPage from '../views/FlyerPage.vue'
import AboutPage from '../views/AboutPage.vue'
import AccountPage from '../views/AccountPage.vue';

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
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
        path: '/fly',
        component: FlyerPage
      },
      {
        path: '/account',
        component: AccountPage
      },
      {
        path: '/about',
        component: AboutPage
      },
    ]
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router

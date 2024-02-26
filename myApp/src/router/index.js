import { createRouter, createWebHistory } from '@ionic/vue-router';
import tabs from '../components/ion-tabs.vue';
import homePage from '../views/homePage.vue';
import trustPage from '../views/trustPage.vue';
import accountPage from '../views/accountPage.vue';
import loginPage from '../views/loginPage.vue';
import signupPage from '../views/signupPage.vue';
import messagePage from '../views/messagePage.vue';
import routePage from '../views/routePage.vue';
import packagePage from '../views/packagePage.vue';
import mapPage from '../views/mapPage.vue';
import listPage from '../views/listPage.vue';

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/home',
    name: 'Home',
    component: homePage
  },
  {
    path: '/login',
    component: loginPage
  },
  {
    path: '/signup',
    component: signupPage
  },
  {
    path: '/route',
    component: routePage
  },
  {
    path: '/map',
    component: mapPage
  },
  {
    path: '/list/:query',
    name: 'listPage',
    component: listPage
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
        component: homePage
      },
      {
        path: '/package',
        component: packagePage
      },
      {
        path: '/trust',
        component: trustPage
      },
      {
        path: '/message',
        component: messagePage
      },
      {
        path: '/account',
        component: accountPage
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router

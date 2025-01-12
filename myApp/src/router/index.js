import { createRouter, createWebHistory } from "@ionic/vue-router";
import ionTabs from "../components/ion-tabs.vue";
import homePage from "../views/homePage.vue";
import trustPage from "../views/trustPage.vue";
import accountPage from "../views/accountPage.vue";
import loginPage from "../views/loginPage.vue";
import signupPage from "../views/signupPage.vue";
import routePage from "../views/routePage.vue";
import packagePage from "../views/packagePage.vue";
import listPage from "../views/listPage.vue";

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/home",
    name: "Home",
    component: homePage,
  },
  {
    path: "/login",
    name: "Login",
    component: loginPage,
  },
  {
    path: "/signup",
    component: signupPage,
  },
  {
    path: "/route",
    component: routePage,
  },
  {
    path: "/list",
    name: "listPage",
    component: listPage,
  },
  {
    path: "/",
    component: ionTabs,
    children: [
      {
        path: "home",
        name: "Home",
        component: homePage,
      },
      {
        path: "package",
        name: "Package",
        component: packagePage,
      },
      {
        path: "trust",
        name: "Trust",
        component: trustPage,
      },
      {
        path: "account",
        name: "Account",
        component: accountPage,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;

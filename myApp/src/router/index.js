// Framework import statements.
import { createRouter, createWebHistory } from "@ionic/vue-router";
import ionTabs from "../components/ion-tabs.vue";
import homePage from "../views/HomePage.vue";
import trustPage from "../views/TrustPage.vue";
import accountPage from "../views/AccountPage.vue";
import loginPage from "../views/LoginPage.vue";
import signupPage from "../views/SignupPage.vue";
import routePage from "../views/routePage.vue";
import packagePage from "../views/PackagePage.vue";
import listPage from "../views/listPage.vue";

// Routes array.
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

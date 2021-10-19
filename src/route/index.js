import store from "../store"; // your vuex store
import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/Home.vue";
import Account from "../components/Account.vue";
import Login from "../components/Login.vue";
import Welcome from "../components/login/Welcome.vue";

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next();
    return;
  }
  next("/");
};

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next();
    return;
  }
  next("/login");
};

export default new createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/welcome",
      name: "Welcome",
      component: Welcome,
    },
    {
      path: "/account",
      name: "Account",
      component: Account,
      beforeEnter: ifAuthenticated,
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
      beforeEnter: ifNotAuthenticated,
    },
  ],
});

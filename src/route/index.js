import store from "../store"; // your vuex store
import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/Home.vue";
import Account from "../components/Account.vue";
import Login from "../components/login/Login.vue";
import Welcome from "../components/login/Welcome.vue";
import Register from "../components/login/Register.vue";
import Verification from "../components/login/Verification.vue";
import ChangePwdProfile from "../components/ChangePwdProfile.vue";
import ChangeForgotPwd from "../components/ChangeForgotPwd.vue";

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
            path: "/welcome",
            name: "Welcome",
            component: Welcome,
        },
        {
            path: "/login",
            name: "Login",
            component: Login,
            beforeEnter: ifNotAuthenticated,
        },
        {
            path: "/register",
            name: "Register",
            component: Register,
        },
        {
            path: "/account",
            name: "Account",
            component: Account,
            beforeEnter: ifAuthenticated,
        },
        // {
        //   path: "/login",
        //   name: "Login",
        //   component: Login,
        //   beforeEnter: ifNotAuthenticated,
        // },
        {
            path: "/verification",
            name: "Verification",
            component: Verification,
            props: true,
        },
        {
            path: "/change-password",
            name: "ChangePwdProfile",
            component: ChangePwdProfile,
        },
        {
            path: "/forgot-password",
            name: "ChangeForgotPwd",
            component: ChangeForgotPwd,
        },
    ],
});

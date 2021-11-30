<template>
    <router-view></router-view>
</template>

<script>
import axios from "axios";
import { AUTH_LOGOUT } from "./config/constant";
export default {
    name: "App",
    components: {},
    created: function() {
        axios.interceptors.response.use(undefined, function(err) {
            return new Promise((resolve, reject) => {
                if (
                    err.status === 401 &&
                    err.config &&
                    !err.config.__isRetryRequest
                ) {
                    // if you ever get an unauthorized, logout the user
                    resolve(200);
                    this.$store.dispatch(AUTH_LOGOUT);
                    // you can also redirect to /login if needed !
                    reject();
                }
                throw err;
            });
        });
    },
};
</script>

<style scoped>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

@import "./assets/variable.css";
</style>

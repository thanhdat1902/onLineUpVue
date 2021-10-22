import { createApp } from "vue";
import App from "./App.vue";
import axios from "axios";
import router from "./route";
import store from "./store";
import FBHelper from "./helpers/FBHelper";

const token = localStorage.getItem("user-token");
if (token) {
    axios.defaults.headers.common["Authorization"] = token;
}

FBHelper.initFacebookSdk();

createApp(App)
    .use(router)
    .use(store)
    .mount("#app");

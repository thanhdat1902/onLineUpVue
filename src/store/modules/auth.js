import axios from "axios";
import http from "../../core/http";
import {
    AUTH_REQUEST,
    AUTH_SUCCESS,
    AUTH_ERROR,
    // USER_REQUEST,
    AUTH_LOGOUT,
} from "../../config/constant";
const state = {
    token: localStorage.getItem("user-token") || "",
    status: "",
};

const getters = {
    isAuthenticated: (state) => !!state.token,
    authStatus: (state) => state.status,
};
const actions = {
    [AUTH_REQUEST]: ({ commit }, { user, pathName }) => {
        return new Promise((resolve, reject) => {
            // The Promise used for router redirect in login
            console.log(process.env.VUE_APP_BASE_URL);
            commit(AUTH_REQUEST);
            http.request({
                method: http.METHOD.POST,
                data: user,
                path: pathName,
            })
                .then((res) => {
                    console.log(res);
                    console.log(res.data.accessToken);
                    const token = res.data.jwtResponse.accessToken;
                    console.log(token);
                    commit(AUTH_SUCCESS, token);
                    http.setAccessToken(token);
                    // you have your token, now log in your user :)
                    // dispatch(USER_REQUEST);
                    resolve(res);
                })
                .catch((err) => {
                    commit(AUTH_ERROR, err);
                    http.removeAccessToken();
                    reject(err);
                });
        });
    },
    [AUTH_LOGOUT]: ({ commit }) => {
        return new Promise((resolve) => {
            commit(AUTH_LOGOUT);
            localStorage.removeItem("user-token"); // clear your user's token from localstorage
            delete axios.defaults.headers.common["Authorization"];
            resolve();
        });
    },
};
const mutations = {
    [AUTH_REQUEST]: (state) => {
        state.status = "loading";
    },
    [AUTH_SUCCESS]: (state, token) => {
        console.log(token);
        state.status = "success";
        state.token = token;
    },
    [AUTH_ERROR]: (state) => {
        state.status = "error";
    },
};
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};

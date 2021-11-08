import http from "../core/http";

export default {
    login() {
        //  TODO
    },
    postEmail: async function(data) {
        return http.request({
            method: http.METHOD.POST,
            data: data,
            path: "sign-up/post-email",
        });
    },
    verifyOTP: async function(data) {
        return http.request({
            method: http.METHOD.POST,
            data: data,
            path: "sign-up/verify-otp",
        });
    },
    createNewAccount: function(data) {
        return http.request({
            method: http.METHOD.POST,
            data: data,
            path: "sign-up/create-account",
            headers: {
                token_otp: http.getAccessToken(),
            },
        });
    },
    loginByPwd(data) {
        return http.request({
            method: http.METHOD.POST,
            data: data,
            path: "login",
        });
    },
    confirmEmailForgotPwd(data) {
        return http.request({
            method: http.METHOD.POST,
            data: data,
            path: "user-profile/forget-password/confirm-email",
        });
    },
};

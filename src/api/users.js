import http from "../core/http";

export default {
    login() {
        //  TODO
    },
    postEmail: async function(data) {
        try {
            const response = await http.request({
                method: http.METHOD.POST,
                data: data,
                path: "sign-up/post-email",
            });
            console.log(response);
            if (response.descriptionCode == "fail") return false;
            else return true;
        } catch (err) {
            console.log(err);
            return err.message;
        }
    },
    verifyOTP: async function(data) {
        try {
            const response = await http.request({
                method: http.METHOD.POST,
                data: data,
                path: "sign-up/verify-otp",
            });
            console.log(response);
            return true;
        } catch (err) {
            console.log(err);
            return err.message;
        }
    },
    createNewAccount: function(data) {
        return http.request({
            method: http.METHOD.POST,
            data: data,
            path: "/sign-up/create-account",
            headers: {
                token_otp: http.getAccessToken(),
            },
        });
    },
};

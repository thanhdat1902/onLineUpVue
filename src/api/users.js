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
};

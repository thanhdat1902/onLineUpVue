import http from "../core/http";

const postEmail = {
    postEmail: async function(data) {
        try {
            const response = await http.request({
                method: http.METHOD.POST,
                data: data,
                path: "sign-up/post-email",
            });
            console.log(response);
        } catch (err) {
            console.log(err);
        }
    },
};

export default postEmail;

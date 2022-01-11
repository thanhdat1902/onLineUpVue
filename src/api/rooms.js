import http from "../core/http";

export default {
    login() {
        //  TODO
    },
    postEmail: async function (data) {
        return http.request({
            method: http.METHOD.POST,
            data: data,
            path: "sign-up/post-email",
        });
    },
    getListJoinedRoom: async function () {
        return http.request({
            method: http.METHOD.GET,
            path: "room/room-user",
            headers: { Authorization: `Bearer ${http.getAccessToken()}` },
        });
    },
    getListOwnerRoom: async function () {
        return http.request({
            method: http.METHOD.GET,
            path: "room/room-admin",
            headers: { Authorization: `Bearer ${http.getAccessToken()}` },
        });
    },
};

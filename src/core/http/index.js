import axios from "axios";
import SingletonPromise from "../utils/SingletonPromise";

const DEFAULT_HEADERS = {
    Accept: "application/json",
    "Content-Type": "application/json",
};

const METHOD = {
    GET: "get",
    POST: "post",
};

export default {
    METHOD,
    setAccessToken(token) {
        localStorage.setItem("user-token", token); // store the token in localstorage
    },
    removeAccessToken() {
        localStorage.removeItem("user-token");
    },
    getAccessToken() {
        return localStorage.getItem("user-token");
    },

    setUserEmail(email) {
        localStorage.setItem("user-email", email);
    },

    removeUserEmail() {
        localStorage.removeItem("user-email");
    },
    getUserEmail() {
        return localStorage.getItem("user-email");
    },

    _getHeader(headers) {
        headers = headers
            ? headers
            : { Authorization: `Bearer ${this.getAccessToken()}` };
        return {
            ...DEFAULT_HEADERS,
            ...headers,
        };
    },

    request(props) {
        const {
            path = "",
            data = null,
            method = METHOD.GET,
            requestId = new Date().getTime() + path,
            timeout = 30 * 1000, //in seconds
            retry = 0,
            headers = {},
        } = props;

        return SingletonPromise(requestId, (resolve, reject) => {
            const options = {
                method,
                timeout,
                url: process.env.VUE_APP_BASE_URL + path,
                headers: this._getHeader(headers),
                // eslint-disable-next-line no-extra-boolean-cast
                ...(!!data ? { data } : {}), // eleminate field data when undefined
            };

            const _successHandler = ({ data }) => {
                if (!data) {
                    throw Error(
                        `Cannot find response from api: ${options.url}`
                    );
                }
                resolve(data);
            };

            const _failHandler = (e) => {
                if (retry < 1) {
                    reject(e);
                    return;
                }

                this.request({
                    ...props,
                    retry: retry - 1,
                })
                    .then(resolve)
                    .catch(reject);
            };

            axios(options)
                .then(_successHandler)
                .catch(_failHandler);

            //   if (__D   EV__) {
            //     console.log(
            //       ' >>>> [REQUEST API] >>>>\n',
            //       JSON.stringify(options, null, 2)
            //     );
            //   }
        });
    },
};

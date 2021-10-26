const FBHelper = {
    loadFacebookSDKScript(d, s, id) {
        var js,
            fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
            return;
        }
        js = d.createElement(s);
        js.id = id;
        js.src = "https://connect.facebook.net/vi_VN/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    },
    initFacebookSdk() {
        window.fbAsyncInit = function() {
            window.FB.init({
                appId: "178666927735500",
                xfbml: true,
                version: "v12.0",
            });
        };
        this.loadFacebookSDKScript(document, "script", "facebook-jssdk");
    },
    login() {
        return new Promise((resolve, reject) => {
            window.FB.login(
                function(response) {
                    if (response.authResponse) {
                        resolve(response.authResponse);
                        console.log(response);
                    } else {
                        reject();
                    }
                },
                { scope: "public_profile,email" }
            );
        });
    },
    getToken() {
        return new Promise((resolve, reject) => {
            window.FB.getLoginStatus(function(response) {
                if (response.status === "connected" && response.authResponse) {
                    resolve(response.authResponse.accessToken);
                    console.log(response.authResponse.accessToken);
                } else if (
                    response.status === "not_authorized" ||
                    response.status === "unknown"
                ) {
                    window.FB.login(
                        function(response) {
                            if (response.authResponse) {
                                resolve(response.authResponse.accessToken);
                                console.log(response.authResponse.accessToken);
                            } else {
                                reject();
                            }
                        },
                        { scope: "public_profile,email" }
                    );
                } else {
                    reject();
                }
            });
        });
    },
    getLoginStatus() {
        return new Promise((resolve, reject) => {
            window.FB.getLoginStatus(({ authResponse }) => {
                if (authResponse) {
                    resolve(authResponse.accessToken);
                } else {
                    reject();
                }
            });
        });
    },
    logout() {
        window.FB.logout(function(response) {
            console.log(response);
        });
    },
};

export default FBHelper;

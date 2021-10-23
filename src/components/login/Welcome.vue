<template>
    <div id="welcome">
        <div class="main">
            <div class="main__banner">
                <div class="main__banner-msg">Welcome back!</div>
                <p>
                    To keep connected with us please login with your personal
                    info
                </p>
                <Button class="signin-btn" text="LOG IN" link="#" />
            </div>
            <div class="main__create-acc">
                <LanguageSelector />
                <div class="main__create-acc-area">
                    <div class="main__create-acc-text">Create Account</div>
                    <div class="social-buttons">
                        <SocialLoginButton icon="fab fa-google" link="#" />
                        <SocialLoginButton
                            @click="signupWithFacebook"
                            icon="fab fa-facebook-f"
                            link="#"
                        />
                        <SocialLoginButton icon="fab fa-linkedin-in" link="#" />
                    </div>
                    <p>or use your email for registration:</p>
                    <InputField
                        @inputData="handleInput"
                        @blur="handleValidEmail"
                        @focus="handldeFocusInput"
                        v-model="email"
                        class="main__create-acc-input"
                        :class="{ 'input--error': !validation.validEmail }"
                        placeholder="Email"
                    />
                    <p
                        v-if="v$.email.required.$invalid && v$.email.$dirty"
                        class="error-msg"
                    >
                        The email is required
                    </p>
                    <p
                        v-if="v$.email.email.$invalid && v$.email.$dirty"
                        class="error-msg"
                    >
                        Invalid form of email
                    </p>
                    <Button
                        @btnClicked="handleSignUpButton"
                        text="SIGN UP"
                        link="#"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import { AUTH_REQUEST } from "../config/constant";
import Button from "../../core/components/Button";
import SocialLoginButton from "../../core/components/SocialLoginBtn";
import InputField from "../../core/components/InputField";
import LanguageSelector from "../../core/components/LanguageSelector.vue";
import useVuelidate from "@vuelidate/core";
import FBHelper from "../../helpers/FBHelper";
import http from "../../core/http";
import { required, email } from "@vuelidate/validators";
export default {
    name: "Welcome",
    setup: () => ({ v$: useVuelidate() }),
    data: function() {
        return {
            email: "",
        };
    },
    computed: {
        validation: function() {
            return {
                validEmail: !this.v$.email.$dirty || !this.v$.email.$error,
                emailTouched: this.v$.email.$dirty,
            };
        },
    },
    components: {
        Button,
        SocialLoginButton,
        InputField,
        LanguageSelector,
    },
    methods: {
        // login: function() {
        //   console.log(123);
        //   const { username, password } = this;
        //   this.$store
        //     .dispatch("auth/" + AUTH_REQUEST, { username, password })
        //     .then(() => {
        //       this.$router.push("/");
        //     });
        // },

        handleValidEmail: function() {
            this.v$.email.$touch();
        },
        handleInput: function(value) {
            this.email = value;
        },
        handldeFocusInput: function() {
            this.invalidEmail = false;
            console.log(this.invalidEmail);
        },
        handleSignUpButton: function() {
            // console.log(this.validation.emailTouched);
            // if (!this.validation.emailTouched) {
            //   this.invalidEmail = true;
            // }
            http.request({
                method: http.METHOD.POST,
                data: { email: this.email },
                path: "sign-up/post-email",
            })
                .then((data) => {
                    console.log(data);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        signupWithFacebook: async function() {
            try {
                const { accessToken } = await FBHelper.login();
                const response = await http.request({
                    method: http.METHOD.POST,
                    data: { facebookToken: accessToken },
                    path: "sign-up/use-facebook",
                });
                console.log(response);
            } catch (err) {
                console.log(err);
            }
            // FBHelper.login().then(({ accessToken }) => {
            //     console.log(accessToken);
            //     http.request({
            //         method: http.METHOD.POST,
            //         data: { facebookToken: accessToken },
            //         path: "sign-up/use-facebook",
            //     })
            //         .then((data) => {
            //             console.log(data);
            //         })
            //         .catch((err) => {
            //             console.log(err);
            //         });
            // });
        },
        logout: function() {
            FBHelper.logout();
        },
    },
    validations: {
        email: {
            required,
            email,
        },
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-size: 16px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

.input--error {
    border: solid 1px #ff0000 !important;
}

.error-msg {
    min-width: 60%;
    margin: -1.5rem 0 1.5rem 0;
    font-size: 0.9rem;
    color: #ff0000;
}

#welcome {
    background-image: url("~@/assets/background_login.png");
    background-size: cover;
    background-position: center center;
    min-height: 100vh;
    position: relative;
    display: flex;
    flex-direction: column;
}

.main {
    height: 80vh;
    width: 75%;
    background-color: transparent;
    margin: auto;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
    border-radius: 8px;
    display: flex;
}

/* Start handle banner */
.main .main__banner {
    max-width: 35%;
    background: rgba(24, 66, 113, 0.9);
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #fff;
    align-items: center;
}

.main .main__banner .main__banner-msg,
.main .main__create-acc .main__create-acc-text {
    font-size: 2rem;
    text-align: center;
    font-weight: bold;
}

.main .main__banner p {
    text-align: center;
    margin: 1.5rem 0;
}

.signin-btn {
    border: solid 1px #000;
}

/* End handle banner */

/* Start handle create account part */
.main .main__create-acc {
    flex-grow: 4;
    background-color: #fff;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    display: flex;
    flex-direction: column;
}

.main__create-acc-area {
    width: 80%;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.main .main__create-acc .main__create-acc-text {
    color: #184271;
}

.main .main__create-acc .social-buttons {
    display: flex;
    flex-direction: row;
    min-width: 9rem;
    justify-content: space-between;
}
.main .main__create-acc .social-buttons,
.main .main__create-acc .main__create-acc-input {
    margin: 1.5rem 0;
}
</style>

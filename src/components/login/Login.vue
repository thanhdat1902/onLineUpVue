<template>
    <div :class="{ 'welcome--modal': showError }" id="welcome">
        <div class="main">
            <Banner
                class="main__banner"
                contentText="Do not have an account yet? Create a new one"
                btnText="SIGN UP"
                bannerText="Welcome back!"
                @btnClicked="handleSignUpButton"
            />

            <div class="main__create-acc">
                <LanguageSelector />
                <div class="main__create-acc-area">
                    <div class="main__create-acc-text">Login</div>
                    <div class="social-buttons">
                        <SocialLoginButton icon="fab fa-google" link="#" />
                        <SocialLoginButton icon="fab fa-facebook-f" link="#" />
                        <SocialLoginButton icon="fab fa-linkedin-in" link="#" />
                    </div>
                    <InputField
                        @inputData="handleInputEmail"
                        v-model="email"
                        class="input-email"
                        placeholder="Email"
                    />

                    <InputField
                        @inputData="handleInputPwd"
                        v-model="password"
                        class="input-password"
                        input_type="password"
                        isPwd
                        placeholder="Password"
                    />
                    <p @click="handleForgetPwd" class="forget-password">
                        Forgotten your password?
                    </p>

                    <Button
                        class="login-btn"
                        @btnClicked="handleLogInButton($event)"
                        text="LOG IN"
                        link="#"
                    />
                </div>
                <ErrorModal
                    :error="errorMsg"
                    v-bind:show="showError"
                    @closeClicked="handleModal"
                />
                <LoadingModal v-bind:show="showLoading" />
                <EmailModal
                    v-bind:show="showEmailModal"
                    @closeClicked="handleModal"
                    @errorEmail="handleErrorForgotPwd"
                />
            </div>
        </div>
    </div>
</template>

<script>
// import { AUTH_REQUEST } from "../config/constant";
import Banner from "./Banner.vue";
import ErrorModal from "../../core/components/ErrorModal";
import LoadingModal from "../../core/components/LoadingModal";
import EmailModal from "../../core/components/EmailModal.vue";

import SocialLoginButton from "../../core/components/SocialLoginBtn";

import Button from "../../core/components/Button";
import InputField from "../../core/components/InputField";
import LanguageSelector from "../../core/components/LanguageSelector.vue";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { AUTH_REQUEST } from "../../config/constant";
export default {
    name: "Login",
    setup: () => ({ v$: useVuelidate() }),
    data: function() {
        return {
            email: "",
            password: "",
            showError: false,
            errorMsg: "",
            showLoading: false,
            showEmailModal: false,
        };
    },
    computed: {
        errors: function() {
            return {
                emailRequired: this.v$.email.required.$invalid,
                passwordRequired: this.v$.password.required.$invalid,
            };
        },
        user: function() {
            return {
                email: this.email,
                password: this.password,
            };
        },
    },
    components: {
        Button,
        InputField,
        LanguageSelector,
        Banner,
        ErrorModal,
        LoadingModal,
        EmailModal,
        SocialLoginButton,
    },
    methods: {
        // login: function() {
        //   console.log(123);
        //   const { email, password } = this;
        //   this.$store
        //     .dispatch("auth/" + AUTH_REQUEST, { email, password })
        //     .then(() => {
        //       this.$router.push("/");
        //     });
        // },

        handleInputEmail: function(value) {
            this.email = value;
        },
        handleInputPwd: function(value) {
            this.password = value;
        },
        handleInputConfirm: function(value) {
            this.confirm = value;
        },
        handleForgetPwd: function() {
            this.showEmailModal = true;
        },
        handleLogInButton: function() {
            event.stopPropagation();
            this.showLoading = true;
            if (this.errors.emailRequired || this.errors.passwordRequired) {
                this.showLoading = false;
                this.showError = true;
                this.errorMsg =
                    "Please fill your information before signing up ";
            } else {
                this.$store
                    .dispatch("auth/" + AUTH_REQUEST, this.user)
                    .then(() => {
                        this.showLoading = false;

                        this.$router.push("/register");
                    })
                    .catch((err) => {
                        this.showLoading = false;
                        this.showError = true;
                        this.errorMsg = err.response.data
                            ? err.response.data.description
                            : "Failed to login, please try again";
                    });
            }
        },
        handleSignUpButton: function() {
            this.$router.push("/welcome");
        },
        handleModal: function() {
            this.showError = false;
            this.showEmailModal = false;
        },
        handleErrorForgotPwd: function(err) {
            this.showEmailModal = false;
            this.showError = true;
            this.errorMsg = err;
        },
    },
    validations: {
        email: {
            required,
        },
        password: {
            required,
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
    height: 100vh;
    width: 100%;
    background-color: transparent;
    margin: auto;

    display: flex;
}

/* Start handle create account part */
.main .main__create-acc {
    flex-grow: 4;
    background-color: #fff;
    position: relative;
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
    background: var(--gradient);
    background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 2rem;
    text-align: center;
    font-weight: bold;
    margin-bottom: 1.5rem;
}

.main .main__create-acc .social-buttons {
    display: flex;
    flex-direction: row;
    min-width: 9rem;
    justify-content: space-between;
    margin-bottom: 1.5rem;
}

.main .main__create-acc .input-password,
.main .main__create-acc .input-confirm {
    margin-top: 1rem;
}

.main .main__create-acc .forget-password {
    text-decoration: underline;
    width: 80%;
    margin-top: 1rem;
    cursor: pointer;
}

.login-btn {
    margin-top: 1.5rem;
}
/* End handle create account part */

/* Handle modal */
.modal {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 50%;
    width: 70%;

    background-color: white;
    padding: 6rem;
    border-radius: 5px;
    box-shadow: 0 3rem 5rem rgba(0, 0, 0, 0.3);
    z-index: 10;
}

.overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(2px);
    z-index: 5;
    border-top-right-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
}

@media (min-width: 1024px) {
    .main {
        height: 80vh;
        width: 75%;
        box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px,
            rgba(0, 0, 0, 0.23) 0px 3px 6px;
        border-radius: 0.5rem;
    }

    .main .main__create-acc {
        border-top-right-radius: 0.5rem;
        border-bottom-right-radius: 0.5rem;
    }

    .main .main__create-acc .forget-password {
        width: 65%;
    }
}

@media (min-width: 740px) and (max-width: 1024px) {
    .main {
        height: 100vh;
        width: 100%;
    }
}

@media (max-width: 740px) {
    #welcome {
        background: #fff;
    }

    .welcome--modal {
        background-color: rgba(0, 0, 0, 0.5) !important;
        backdrop-filter: blur(2px);
    }

    .main {
        flex-direction: column;
    }

    .main .main__create-acc {
        flex-grow: 2;
    }
}
</style>

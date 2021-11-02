<template>
    <div :class="{ 'welcome--modal': showError || showLoading }" id="welcome">
        <div class="main">
            <Banner
                class="main__banner"
                contentText="To keep connected with us please login with your personal info"
                btnText="Log in"
                bannerText="Welcome back!"
                @btnClicked="handleLoginButton"
            />
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
                    <p class="main__create-acc-inst">
                        or use your email for registration:
                    </p>
                    <InputField
                        @inputData="handleInput"
                        @blur="handleValidEmail"
                        v-model="email"
                        class="main__create-acc-input"
                        :class="{
                            'input--error':
                                !validation.validEmail && showErrInput,
                        }"
                        placeholder="Email"
                    />
                    <p
                        v-if="
                            v$.email.required.$invalid &&
                                v$.email.$dirty &&
                                showErrInput
                        "
                        class="error-msg"
                    >
                        The email is required
                    </p>
                    <p
                        v-if="
                            v$.email.email.$invalid &&
                                v$.email.$dirty &&
                                showErrInput
                        "
                        class="error-msg"
                    >
                        Invalid form of email
                    </p>
                    <Button
                        class="signup-btn"
                        @btnClicked="handleSignUpButton"
                        text="SIGN UP"
                        link="#"
                    />
                </div>
                <ErrorModal
                    :error="errorMsg"
                    v-bind:show="showError"
                    @closeClicked="handleModal"
                />
                <LoadingModal v-bind:show="showLoading" />
            </div>
        </div>
    </div>
</template>

<script>
// import { AUTH_REQUEST } from "../config/constant";
import Banner from "../../components/login/Banner.vue";
import Button from "../../core/components/Button";
import SocialLoginButton from "../../core/components/SocialLoginBtn";
import InputField from "../../core/components/InputField";
import LanguageSelector from "../../core/components/LanguageSelector.vue";
import ErrorModal from "../../core/components/ErrorModal";
import LoadingModal from "../../core/components/LoadingModal.vue";

import useVuelidate from "@vuelidate/core";
import FBHelper from "../../helpers/FBHelper";
import users from "../../api/users.js";
import http from "../../core/http";
import { required, email } from "@vuelidate/validators";
export default {
    name: "Welcome",
    setup: () => ({ v$: useVuelidate() }),
    data: function() {
        return {
            email: "",
            showErrInput: false,
            showError: false,
            showLoading: false,
            errorMsg: "",
            signupBtnDisabled: false,
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
        Banner,
        ErrorModal,
        LoadingModal,
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
            if (!this.validation.validEmail) this.showErrInput = true;
        },
        handleInput: function(value) {
            this.showErrInput = false;
            this.email = value;
        },
        handleSignUpButton: function() {
            // console.log(this.validation.emailTouched);
            // if (!this.validation.emailTouched) {
            //     this.invalidEmail = true;
            // }
            if (!this.v$.$anyDirty) {
                this.showError = true;
                this.errorMsg =
                    "Please fill your information before signing up ";
            } else if (this.v$.$invalid) {
                this.showError = true;
                this.errorMsg =
                    "Please correct your information before signing up";
            } else {
                this.showLoading = true;
                users
                    .postEmail({ email: this.email })
                    .then((data) => {
                        this.showLoading = false;
                        console.log(data);
                        http.setUserEmail(this.email);
                        this.$router.push("/verification");
                    })
                    .catch((err) => {
                        this.showLoading = false;
                        this.showError = true;
                        this.errorMsg = err.response.data
                            ? err.response.data.description
                            : "Failed to send OTP, please try again";
                    });
            }
        },
        handleLoginButton: function() {
            this.$router.push("/login");
        },
        signupWithFacebook: async function() {
            try {
                const { accessToken } = await FBHelper.getToken();
                const response = await http.request({
                    method: http.METHOD.POST,
                    data: { facebookToken: accessToken },
                    path: "sign-up/use-facebook",
                });
                console.log(response);
            } catch (err) {
                console.log(err.message);
            }
            FBHelper.login().then(({ accessToken }) => {
                console.log(accessToken);
                http.request({
                    method: http.METHOD.POST,
                    data: { facebookToken: accessToken },
                    path: "sign-up/use-facebook",
                })
                    .then((data) => {
                        console.log(data);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            });
        },
        logout: function() {
            FBHelper.logout();
        },
        handleModal: function() {
            this.showError = false;
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
    border: solid 1px var(--error) !important;
}

.error-msg {
    width: 75%;
    font-size: 0.9rem;
    color: var(--error);
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
}

.main .main__create-acc .social-buttons {
    display: flex;
    flex-direction: row;
    min-width: 9rem;
    justify-content: space-between;
}
.main .main__create-acc .social-buttons {
    margin: 1.5rem 0rem;
}

.main .main__create-acc .main__create-acc-inst {
    margin-bottom: 1.5rem;
}

.signup-btn {
    margin-top: 1.5rem;
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

    .error-msg {
        width: 60%;
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

    .main {
        flex-direction: column;
    }

    .welcome--modal {
        background-color: rgba(0, 0, 0, 0.5) !important;
        backdrop-filter: blur(2px);
    }

    .main .main__create-acc {
        flex-grow: 2;
    }
}
</style>

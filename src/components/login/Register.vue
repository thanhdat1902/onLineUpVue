<template>
    <div :class="{ 'welcome--modal': showError || showLoading }" id="welcome">
        <div class="main">
            <Banner
                class="main__banner"
                contentText="To keep connected with us please login with your personal info"
                btnText="LOG IN"
                bannerText="Welcome back!"
                @btnClicked="handleLoginButton"
            />

            <div class="main__create-acc">
                <LanguageSelector />
                <div class="main__create-acc-area">
                    <div class="main__create-acc-text">Register</div>
                    <InputField
                        @inputData="handleInputUsername"
                        @blur="
                            handleValidInput(
                                v$.username,
                                validation.validUsername
                            )
                        "
                        v-model="username"
                        class="input-username"
                        :class="{ 'input--error': !validation.validUsername }"
                        placeholder="User Name"
                    />
                    <p v-if="errors.usernameRequired" class="error-msg">
                        The username is required
                    </p>

                    <InputField
                        @inputData="handleInputPwd"
                        @blur="
                            handleValidInput(
                                v$.password,
                                validation.validPassword
                            )
                        "
                        v-model="password"
                        class="input-password"
                        input_type="password"
                        isPwd
                        :class="{
                            'input--error': !validation.validPassword,
                        }"
                        placeholder="Password"
                    />
                    <p v-if="errors.passwordRequired" class="error-msg">
                        The password is required
                    </p>
                    <p v-if="errors.passwordMinLength" class="error-msg">
                        Password must be at least 6 words
                    </p>

                    <InputField
                        @inputData="handleInputConfirm"
                        @blur="
                            handleValidInput(
                                v$.confirm,
                                validation.validConfirm
                            )
                        "
                        v-model="confirm"
                        class="input-confirm"
                        input_type="password"
                        :class="{
                            'input--error': !validation.validConfirm,
                        }"
                        placeholder="Confirm Password"
                    />
                    <p v-if="errors.confirmRequired" class="error-msg">
                        The confirm password is required
                    </p>

                    <Button
                        class="signup-btn"
                        @btnClicked="handleSignUpButton($event)"
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
import ErrorModal from "../../core/components/ErrorModal";
import LoadingModal from "../../core/components/LoadingModal";

import Button from "../../core/components/Button";
import InputField from "../../core/components/InputField";
import LanguageSelector from "../../core/components/LanguageSelector.vue";
import useVuelidate from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";
import users from "../../api/users";
import http from "../../core/http";
export default {
    name: "Register",
    setup: () => ({ v$: useVuelidate() }),
    data: function() {
        return {
            username: "",
            password: "",
            confirm: "",
            showError: false,
            errorMsg: "",
            showLoading: false,
        };
    },
    computed: {
        validation: function() {
            return {
                validUsername: !this.v$.username.$error,
                validPassword: !this.v$.password.$error,
                validConfirm: !this.v$.confirm.$error,
            };
        },
        errors: function() {
            return {
                usernameRequired:
                    this.v$.username.required.$invalid &&
                    this.v$.username.$dirty,
                passwordRequired:
                    this.v$.password.required.$invalid &&
                    this.v$.password.$dirty,
                passwordMinLength:
                    this.v$.password.minLength.$invalid &&
                    this.v$.password.$dirty,
                confirmRequired:
                    this.v$.confirm.required.$invalid && this.v$.confirm.$dirty,
            };
        },
        userInfo: function() {
            return {
                email: http.getUserEmail(),
                fullname: this.username,
                password: this.password,
                confirmPassword: this.confirm,
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

        handleValidInput: function(touch) {
            touch.$touch();
        },

        handleInputUsername: function(value) {
            this.username = value;
        },
        handleInputPwd: function(value) {
            this.password = value;
            // if (this.confirm === this.password) {
            //   this.invalidConfirm = false;
            // }
        },
        handleInputConfirm: function(value) {
            this.confirm = value;
        },
        handleSignUpButton: function() {
            event.stopPropagation();
            if (!this.v$.$anyDirty) {
                this.showError = true;
                this.errorMsg =
                    "Please fill your information before signing up ";
            } else if (this.v$.$invalid) {
                this.showError = true;
                this.errorMsg =
                    "Please correct your information before signing up";
            } else if (this.confirm != this.password) {
                this.showError = true;
                this.errorMsg = "Incorrect confirm password!";
            } else {
                this.showLoading = true;
                console.log(this.userInfo);
                console.log(http.getAccessToken());
                users
                    .createNewAccount(this.userInfo)
                    .then((data) => {
                        this.showLoading = false;
                        console.log(data);
                        this.$router.push("/home");
                    })
                    .catch((err) => {
                        console.log(err.response);
                        this.showLoading = false;
                        this.errorMsg = err.response.data
                            ? err.response.data.description
                            : "Failed to register, please try again";
                        this.showError = true;
                    });
            }
        },
        handleLoginButton: function() {
            this.$router.push("/login");
        },
        handleModal: function() {
            this.showError = false;
        },
    },
    validations: {
        username: {
            required,
        },
        password: {
            required,
            minLength: minLength(6),
        },
        confirm: {
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
    margin-bottom: 1.5rem;
}

.main .main__create-acc .input-password,
.main .main__create-acc .input-confirm {
    margin-top: 1rem;
}

.signup-btn {
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

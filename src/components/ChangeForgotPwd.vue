<template>
    <div id="change-pwd">
        <div class="main">
            <div class="main__change-pwd">
                <BackButton
                    branchName="Login"
                    class="main__change-pwd-back-btn"
                />
                <div class="main__change-pwd-area">
                    <div class="main__change-pwd-text">
                        Change Password
                    </div>
                    <div class="main__change-pwd-inputs">
                        <InputField
                            @inputData="handleInputPwd"
                            @blur="
                                handleValidInput(
                                    v$.newPassword,
                                    validation.validNewPassword
                                )
                            "
                            v-model="newPassword"
                            class="main__change-pwd-input new-password"
                            input_type="password"
                            isPwd
                            :class="{
                                'input--error': !validation.validNewPassword,
                            }"
                            placeholder="New Password"
                        />
                        <p v-if="errors.newPasswordRequired" class="error-msg">
                            The new password is required
                        </p>
                        <p v-if="errors.newPasswordMinLength" class="error-msg">
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
                            class="main__change-pwd-input input-confirm"
                            input_type="password"
                            :class="{
                                'input--error': !validation.validConfirm,
                            }"
                            placeholder="Confirm Password"
                        />
                        <p v-if="errors.confirmRequired" class="error-msg">
                            The confirm password is required
                        </p>
                    </div>
                    <Button
                        class="main__change-pwd-button"
                        @btnClicked="handleConfirmButton"
                        text="CONFIRM"
                        link="#"
                    />
                </div>
                <ErrorModal
                    class="main__check-otp-modal"
                    :error="errorMsg"
                    v-bind:show="showError"
                    @closeClicked="handleModal"
                    :isVerify="isVerify"
                />
                <LoadingModal
                    class="main__check-otp-modal"
                    v-bind:show="showLoading"
                    :isVerify="isVerify"
                />
            </div>
        </div>
    </div>
</template>

<script>
import BackButton from "../core/components/BackButton";
import Button from "../core/components/Button";
import InputField from "../core/components/InputField";
import ErrorModal from "../core/components/ErrorModal.vue";
import LoadingModal from "../core/components/LoadingModal.vue";
import useVuelidate from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";
export default {
    name: "ChangeForgotPwd",
    setup: () => ({ v$: useVuelidate() }),
    data: function() {
        return {
            newPassword: "",
            confirm: "",
            inputTouched: [false, false, false],
            anyTouched: true,
            showError: false,
            showLoading: false,
            errorMsg: "",
            isVerify: true,
        };
    },
    computed: {
        validation: function() {
            return {
                validNewPassword: !this.v$.newPassword.$error,
                validConfirm: !this.v$.confirm.$error,
            };
        },
        errors: function() {
            return {
                newPasswordRequired:
                    this.v$.newPassword.required.$invalid &&
                    this.v$.newPassword.$dirty,
                newPasswordMinLength:
                    this.v$.newPassword.minLength.$invalid &&
                    this.v$.newPassword.$dirty,
                confirmRequired:
                    this.v$.confirm.required.$invalid && this.v$.confirm.$dirty,
            };
        },
    },
    components: {
        BackButton,
        Button,
        InputField,
        ErrorModal,
        LoadingModal,
    },
    methods: {
        handleValidInput: function(touch, checkValid) {
            touch.$touch();
            if (checkValid) {
                return;
            }
        },

        handleInputPwd: function(value) {
            this.newPassword = value;
            // if (this.confirm === this.password) {
            //   this.invalidConfirm = false;
            // }
        },
        handleInputConfirm: function(value) {
            this.confirm = value;
        },
        handleModal: function() {
            this.showError = false;
        },
        handleConfirmButton: function() {
            if (!this.v$.$anyDirty) {
                this.showError = true;
                this.errorMsg =
                    "Please fill your information before signing up ";
            } else if (this.v$.$invalid) {
                this.showError = true;
                this.errorMsg =
                    "Please correct your information before signing up";
            }
        },
    },
    validations: {
        newPassword: {
            required,
            minLength: minLength(6),
        },
        confirm: {
            required,
        },
    },
};
</script>

<style scoped>
* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-size: 16px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

#change-pwd {
    background-image: url("~@/assets/background_login.png");
    background-size: cover;
    background-position: center center;
    min-height: 100vh;
    position: relative;
    display: flex;
    flex-direction: column;
}

.main {
    height: 70vh;
    width: 60%;
    background-color: transparent;
    margin: auto;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
    border-radius: 8px;
    display: flex;
}

/* Start handle check OTP part */
.main .main__change-pwd {
    flex-grow: 4;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    border-radius: 8px;
}

.main .main__change-pwd-back-btn {
    width: 1rem;
    height: 1rem;
    position: absolute;
    margin: 1rem;
}

.main__change-pwd-area {
    width: 80%;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.main .main__change-pwd .main__change-pwd-text {
    color: #184271;
}

.main .main__change-pwd .main__change-pwd-inputs {
    width: 50%;
    display: flex;
    flex-direction: column;
}

.main .main__change-pwd .main__change-pwd-inputs .main__change-pwd-input {
    margin-top: 1rem;
    width: 100%;
    align-self: center;
}

.main .main__change-pwd .main__change-pwd-text {
    font-size: 1.5rem;
    text-align: center;
    font-weight: bold;
}

.main .main__change-pwd .main__change-pwd-button {
    margin-top: 1rem;
}

.input--error {
    border: solid 1px #ff0000 !important;
}

.error-msg {
    width: 100%;
    font-size: 0.9rem;
    color: #ff0000;
}

.main__check-otp-modal {
    height: 70vh;
    width: 60%;
}
</style>

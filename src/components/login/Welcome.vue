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
                <div class="lang-selector">
                    <button
                        :class="{ 'lang-selector--active': !isEnglish }"
                        class="lang-selector__viet"
                        @click="handleLanguageSelectorViet"
                    >
                        Việt
                    </button>
                    <button
                        :class="{ 'lang-selector--active': isEnglish }"
                        class="lang-selector__eng"
                        @click="handleLanguageSelectorEng"
                    >
                        Eng
                    </button>
                </div>
                <div class="main__create-acc-area">
                    <div class="main__create-acc-text">Create Account</div>
                    <div class="social-buttons">
                        <SocialLoginButton icon="fab fa-google" link="#" />
                        <SocialLoginButton
                            v-on:click="login"
                            icon="fab fa-facebook-f"
                            link="#"
                        />
                        <SocialLoginButton icon="fab fa-linkedin-in" link="#" />
                    </div>
                    <p>or use your email for registration:</p>
                    <InputField
                        :model="email"
                        @blur="handleValidEmail"
                        class="main__create-acc-input"
                        placeholder="Email"
                    />

                    <Button text="SIGN UP" link="#" />
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
import useVuelidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import FBHelper from "../../helpers/FBHelper";
export default {
    name: "Welcome",
    setup() {
        return { v$: useVuelidate() };
    },
    data: function() {
        return {
            isEnglish: true,
            email: "",
            isConnected: false,
            name: "",
            personalID: "",
            picture: "",
            FB: undefined,
        };
    },
    components: {
        Button,
        SocialLoginButton,
        InputField,
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
        handleLanguageSelectorViet: function() {
            if (this.isEnglish) this.isEnglish = !this.isEnglish;
        },
        handleLanguageSelectorEng: function() {
            if (!this.isEnglish) this.isEnglish = !this.isEnglish;
        },
        handleValidEmail: function() {
            console.log(this.email);
        },
        login: function() {
            FBHelper.login().then(({ accessToken }) => {
                console.log(accessToken);
            });
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

/* Start handle language selector */
.lang-selector {
    position: relative;
    height: 2rem;
    margin: 0 1rem -2rem 1rem;
    align-self: flex-end;
    text-align: center;
    line-height: 2rem;
    padding-top: 0.2rem;
    border-radius: 0.3rem;
}

.lang-selector button {
    padding: 0.2rem 1rem;
    font-size: 0.8rem;
    border: none;
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
}

.lang-selector__eng {
    border-top-right-radius: 0.3rem;
    border-bottom-right-radius: 0.3rem;
}

.lang-selector__viet {
    border-top-left-radius: 0.3rem;
    border-bottom-left-radius: 0.3rem;
}

.lang-selector--active {
    background-color: #184271;
    color: #fff;
}
/* End handle language selector */

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

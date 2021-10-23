<template>
  <div id="welcome">
    <div class="main">
      <div class="main__banner">
        <div class="main__banner-msg">Welcome back!</div>
        <p>To keep connected with us please login with your personal info</p>
        <Button class="signin-btn" text="LOG IN" link="#" />
      </div>
      <div class="main__create-acc">
        <LanguageSelector />
        <div class="main__create-acc-area">
          <div class="main__create-acc-text">Register</div>
          <InputField
            @inputData="handleInputUsername"
            @blur="handleValidInput(v$.username, validation.validUsername)"
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
            @blur="handleValidInput(v$.password, validation.validPassword)"
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
            @blur="handleValidInput(v$.confirm, validation.validConfirm)"
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
            @btnClicked="handleSignUpButton"
            text="SIGN UP"
            link="#"
          />
        </div>
        <!-- <div class="modal hidden">
          hhhhhhhhhhhhhhhhhhhhhhhhhhh
        </div>
        <div class="overlay"></div> -->
      </div>
    </div>
  </div>
</template>

<script>
// import { AUTH_REQUEST } from "../config/constant";
import Button from "../../core/components/Button";
import InputField from "../../core/components/InputField";
import LanguageSelector from "../../core/components/LanguageSelector.vue";
import useVuelidate from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";
export default {
  name: "Register",
  setup: () => ({ v$: useVuelidate() }),
  data: function() {
    return {
      username: "",
      password: "",
      confirm: "",
      inputTouched: [false, false, false],
      anyTouched: true,
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
          this.v$.username.required.$invalid && this.v$.username.$dirty,
        passwordRequired:
          this.v$.password.required.$invalid && this.v$.password.$dirty,
        passwordMinLength:
          this.v$.password.minLength.$invalid && this.v$.password.$dirty,
        confirmRequired:
          this.v$.confirm.required.$invalid && this.v$.confirm.$dirty,
      };
    },
  },
  components: {
    Button,
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

    handleValidInput: function(touch, checkValid) {
      touch.$touch();
      if (checkValid) {
        return;
      }
      console.log(this.v$.username.$error);
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
      if (!this.v$.$anyDirty) {
        alert("Please fill your information before sign up");
      } else {
        alert("Please correct your information before sign up");
      }
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
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

.input--error {
  border: solid 1px #ff0000 !important;
}

.error-msg {
  min-width: 60%;
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
  height: 100vh;
  width: 100%;
  background-color: transparent;
  margin: auto;

  display: flex;
}

/* Start handle banner */
.main .main__banner {
  max-width: 35%;
  background: rgba(24, 66, 113, 0.9);
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
  margin: 1.5rem 1rem;
}

.signin-btn {
  border: solid 1px #000;
}

/* End handle banner */

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
  color: #184271;
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
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
    border-radius: 0.5rem;
  }

  .main .main__banner > p {
    margin: 1.5rem 0rem;
  }

  .main .main__create-acc {
    border-top-right-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
  }

  .main .main__banner {
    border-top-left-radius: 0.5rem;
    border-bottom-left-radius: 0.5rem;
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
    background: #184271;
  }

  .main {
    flex-direction: column;
  }

  .main .main__banner {
    max-width: 100%;
    flex-grow: 1;
  }

  .main .main__create-acc {
    flex-grow: 2;
    border-top-left-radius: 2rem;
    border-top-right-radius: 2rem;
  }
}
</style>

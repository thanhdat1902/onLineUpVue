<template>
    <div v-if="show" class="modal-container">
        <div class="modal">
            <div class="modal__text">Your Email</div>
            <InputField
                @inputData="handleInput"
                class="modal__input"
                placeholder="Email"
            />
            <Button
                class="modal__confirm-btn"
                @click="handleConfirmBtn"
                text="COFIRM"
                link="#"
            />
        </div>
        <div
            @click="handleClose"
            class="overlay"
            :class="{ 'overlay-verify': isVerify }"
        ></div>
    </div>
</template>

<script>
import InputField from "../../core/components/InputField";
import Button from "../../core/components/Button";
import users from "../../api/users.js";
import http from "../http/index.js";

export default {
    name: "EmailModal",
    data: function () {
        return {
            email: "",
            error: "",
            isForgotPwd: true,
        };
    },
    components: { InputField, Button },
    props: {
        show: Boolean,
        isVerify: Boolean,
    },
    methods: {
        handleClose: function () {
            this.$emit("closeClicked");
        },
        handleInput: function (data) {
            this.email = data;
        },
        handleConfirmBtn: function () {
            console.log(this.email);
            users
                .confirmEmailForgotPwd({ email: this.email })
                .then((data) => {
                    console.log(data);
                    http.setUserEmail(this.email);
                    this.$router.push({
                        name: "Verification",
                        params: { isForgotPwd: this.isForgotPwd },
                    });
                })
                .catch((err) => {
                    console.log(err.response);
                    this.error = err.response
                        ? err.response.data.description
                        : "Failed to send OTP, please try again";
                    this.$emit("errorEmail", this.error);
                });
        },
    },
};
</script>

<style scoped>
/* Handle modal */
.modal-container {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 10;
    animation: fadeIn 0.2s;
    animation-timing-function: linear;
    animation-direction: alternate;
}

@keyframes fadeIn {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}

.modal {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    min-height: 40%;
    width: 55%;
    z-index: 10;
    padding: 2rem 0;
    background-color: white;
    box-shadow: 0 3rem 5rem rgba(0, 0, 0, 0.3);

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.modal__text {
    background: var(--gradient);
    background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 1.5rem;
    text-align: center;
    font-weight: bold;
}

.modal__input {
    margin: 1.5rem 0;
}
.modal .modal__loading-container {
    display: flex;
    height: 100%;
    width: 100%;
    justify-content: flex-start;
}

.modal .modal__loading-container .modal__animation {
    height: 100% !important;
    width: 50% !important;
}

.modal .modal__loading {
    font-size: 1.5rem;
    font-weight: 500;
    text-align: center;
    margin: auto 0;
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
}

@media (min-width: 1024px) {
    .overlay {
        border-top-right-radius: 0.5rem;
        border-bottom-right-radius: 0.5rem;
    }

    .overlay-verify {
        border-radius: 0.5rem;
    }
}

@media (max-width: 740px) {
    .modal {
        width: 70%;
    }
}
</style>

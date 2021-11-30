<template>
    <div v-if="show" class="modal-container">
        <div class="modal hidden">
            <button @click="handleClose" class="close-modal">&times;</button>
            <div class="modal__error-container">
                <v-lottie-player
                    path="https://assets9.lottiefiles.com/private_files/lf30_glnkkfua.json"
                    background="#FFFFFF"
                    speed="1"
                    class="modal__error-icon"
                    loop
                    autoplay
                ></v-lottie-player>
                <p class="modal__error">{{ error }}</p>
            </div>
        </div>
        <div
            @click="handleClose"
            class="overlay"
            :class="{ 'overlay-verify': isVerify }"
        ></div>
    </div>
</template>

<script>
import VueLottiePlayer from "vue-lottie-player";
export default {
    name: "ErrorModal",
    components: {
        vLottiePlayer: VueLottiePlayer,
    },
    props: {
        error: String,
        show: Boolean,
        isVerify: Boolean,
    },
    methods: {
        handleClose: function() {
            this.$emit("closeClicked");
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
    height: 40%;
    width: 55%;
    z-index: 10;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0 3rem 5rem rgba(0, 0, 0, 0.3);

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}

.modal .modal__error-container {
    display: flex;
    height: 100%;
    width: 100%;
    align-items: center;
}

.modal .modal__error {
    font-size: 1rem;
    font-weight: 500;
    text-align: center;
    margin-right: 1rem;
}

.modal .modal__error-icon {
    height: 90% !important;
    width: 30% !important;
}

.close-modal {
    font-size: 2rem;
    color: #000;
    cursor: pointer;
    border: none;
    background: none;
    align-self: flex-end;
    margin-bottom: -2.5rem;
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

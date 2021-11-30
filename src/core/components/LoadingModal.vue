<template>
    <div v-if="show" class="modal-container">
        <div class="modal hidden">
            <div class="modal__loading-container">
                <v-lottie-player
                    path="https://assets4.lottiefiles.com/packages/lf20_e6ewcgas.json"
                    background="#FFFFFF"
                    speed="1"
                    loop
                    class="modal__animation"
                    autoplay
                ></v-lottie-player>
                <p class="modal__loading">Loading...</p>
            </div>
        </div>
        <div class="overlay" :class="{ 'overlay-verify': isVerify }"></div>
    </div>
</template>

<script>
import VueLottiePlayer from "vue-lottie-player";

export default {
    name: "LoadingModal",
    components: {
        vLottiePlayer: VueLottiePlayer,
    },
    props: {
        show: Boolean,
        isVerify: Boolean,
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
    height: 25%;
    width: 55%;
    z-index: 10;
    background-color: white;
    box-shadow: 0 3rem 5rem rgba(0, 0, 0, 0.3);

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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

<template>
    <div id="verification">
        <div class="main">
            <div class="main__check-otp">
                <router-link to="/register" class="main__check-otp-back-btn"
                    ><i class="fas fa-long-arrow-alt-left"> </i
                ></router-link>
                <div class="main__check-otp-area">
                    <div class="main__check-otp-text">
                        OTP
                    </div>
                    <p>The OTP is valid for 30s</p>
                    <p
                        id="main__check-otp-timer"
                        :style="[
                            this.timer > 10
                                ? { color: 'black' }
                                : { color: 'red' },
                        ]"
                    >
                        {{ timerCountdown }}
                    </p>
                    <OTPInput @submitOTP="handleOnComplete" ref="resendOtp" />
                    <a
                        @click="handleResendValidation"
                        href="#"
                        class="main__check-otp-resend"
                        >Resend OTP</a
                    >
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import OTPInput from "../../core/components/OTPInput";
export default {
    name: "Verification",
    components: {
        OTPInput,
    },
    data() {
        return {
            timer: 30,
        };
    },
    computed: {
        timerCountdown() {
            var minutes = Math.floor(parseInt(this.timer, 10) / 60);
            var seconds = parseInt(this.timer, 10) - minutes * 60;
            minutes = ("0" + minutes).slice(-2);
            seconds = ("0" + seconds).slice(-2);
            return `${minutes}:${seconds}`;
        },
    },
    mounted() {
        setInterval(() => {
            if (this.timer > 0) this.timer -= 1;
        }, 1000);
    },
    watch: {
        timer(val) {
            if (val === 0) console.log(val); //disable OTP
        },
    },
    methods: {
        handleOnComplete(value) {
            console.log("OTP completed: ", value);
            //post for verification
            //if success, move to next page
            //if not, print error
        },
        handleResendValidation: function() {
            //resend Otp
            //reset OTPInput
            this.$refs.resendOtp.resetOtp();
            this.timer = 30;
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

#verification {
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
.main .main__check-otp {
    flex-grow: 4;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    border-radius: 8px;
}

.main .main__check-otp-back-btn {
    width: 1rem;
    height: 1rem;
    color: #000;
    position: absolute;
    margin: 1rem;
}

.main__check-otp-area {
    width: 80%;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.main .main__check-otp .main__check-otp-text {
    color: #184271;
}

.main .main__check-otp .main__check-otp-input {
    margin: 1.5rem 0;
}

.main .main__check-otp .main__check-otp-text {
    font-size: 2rem;
    text-align: center;
    font-weight: bold;
}

.main .main__check-otp .main__check-otp-resend {
    text-decoration: none;
    font-weight: bold;
    color: #184271;
    margin: 0.5rem 0;
}

.otp-input {
    width: 40px;
    height: 40px;
    padding: 5px;
    margin: 0 10px;
    font-size: 20px;
    border-radius: 4px;
    border: 1px solid rgba(0, 0, 0, 0.3);
    text-align: center;
}
</style>

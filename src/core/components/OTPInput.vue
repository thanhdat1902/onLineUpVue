/* eslint-disable vue/no-deprecated-dollar-listeners-api */
<template>
    <form
        method="get"
        class="digit-group"
        data-group-name="digits"
        data-autosubmit="false"
        autocomplete="off"
    >
        <input
            ref="start-digit"
            type="number"
            id="digit-1"
            name="digit-1"
            @input="handleInput"
            @keydown="deleteInput"
            v-model="fullOtp[0]"
            :disabled="submitting == 1"
            placeholder="0"
            autofocus
        />
        <input
            type="number"
            id="digit-2"
            name="digit-2"
            @input="handleInput"
            @keydown="deleteInput"
            v-model="fullOtp[1]"
            :disabled="submitting == 1"
            placeholder="0"
        />
        <input
            type="number"
            id="digit-3"
            name="digit-3"
            @input="handleInput"
            @keydown="deleteInput"
            v-model="fullOtp[2]"
            :disabled="submitting == 1"
            placeholder="0"
        />
        <input
            type="number"
            id="digit-4"
            name="digit-4"
            @input="handleInput"
            @keydown="deleteInput"
            v-model="fullOtp[3]"
            :disabled="submitting == 1"
            placeholder="0"
        />
        <input
            type="number"
            id="digit-5"
            name="digit-5"
            @input="handleInput"
            @keydown="deleteInput"
            v-model="fullOtp[4]"
            :disabled="submitting == 1"
            placeholder="0"
        />
        <input
            type="number"
            id="digit-6"
            name="digit-6"
            @input="handleInput"
            @keydown="deleteInput"
            v-model="fullOtp[5]"
            :disabled="submitting == 1"
            placeholder="0"
        />
    </form>
</template>

<script>
export default {
    name: "OTPInput",
    data: function() {
        return {
            fullOtp: new Array(5),
            submitting: false,
        };
    },
    methods: {
        handleInput(event) {
            // limit input length to 1
            if (event.target.value.length > 1)
                event.target.value = event.target.value.slice(0, 1);

            if (event.target.value.length === 1) {
                // this.fullOtp[event.target.name.slice(-1)] = event.target.value;
                if (event.target.name !== "digit-6") {
                    event.target.nextElementSibling.focus();
                } else {
                    this.$emit("submitOTP", this.fullOtp.join(""));
                    //disable making changes to input field
                    this.submitting = true;
                    //await before checking whether OTP is correct or not
                    setTimeout(this.resetOtp, 3000);
                }
            }
        },
        deleteInput(event) {
            if (event.key === "Backspace") {
                if (event.target.name === "digit-6") event.target.value = "";
                if (event.target.name !== "digit-1")
                    event.target.previousElementSibling.focus();
            }
            if (!(event.key >= 0 && event.key <= 9)) {
                event.preventDefault();
            }
        },
        resetOtp() {
            this.fullOtp = [];
            //enable input again and focus on the first digit input
            this.submitting = false;
            this.detailsEditable = true;
            this.$nextTick(() => {
                this.$refs["start-digit"].focus();
            });
        },
    },
    computed: {},
};
</script>

<style scoped>
* {
    font-size: 16px;
}
.digit-group {
    margin: 1rem 0 1.5rem;
}
.digit-group input {
    padding: 0.7rem 1rem;
    margin: 0 0.3rem;
    background: rgba(196, 196, 196, 0.6);
    width: 0.5rem;
    border-radius: 0.3rem;
    border: none;
    text-align: center;
}
.digit-group input:disabled,
.digit-group input::placeholder {
    color: #8e8e8e;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
</style>

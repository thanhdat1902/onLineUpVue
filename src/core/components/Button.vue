<template>
    <a @click="handleClicked" v-bind:href="link" class="button">{{ text }} </a>
</template>

<script>
export default {
    name: "Button",
    props: {
        text: String,
        link: String,
    },
    methods: {
        handleClicked: function () {
            this.$emit("btnClicked", event.target.value);
        },
    },
};
</script>

<style scoped>
.button {
    font-size: 16px;
    border-radius: 2rem;
    text-decoration: none;
    padding: 0.7rem 3rem;
    color: #fff;
    background: var(--primary_1);
    width: fit-content;
    font-weight: 600;
}
</style>

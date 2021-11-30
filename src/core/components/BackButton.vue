<template>
    <router-link :to="branchName" id="button">
        <i class="fas fa-long-arrow-alt-left"> </i>
    </router-link>
</template>
<script>
export default {
    name: "BackButton",
    props: {
        branchName: String,
    },
};
</script>
<style scoped>
#button {
    color: #000;
}
</style>

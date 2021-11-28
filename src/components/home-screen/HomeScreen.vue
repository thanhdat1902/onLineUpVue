<template>
    <div>
        <Header />
    </div>
</template>

<script>
import Header from "../../core/components/Header.vue";
export default {
    name: "HomeScreen",
    components: {
        Header,
    },
    methods: {},
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
</style>

<template>
    <div id="footer">
        <p>@ onLineUp 2021</p>
        <div>
            <a href="#">About</a>
            <a href="#">Term of Use</a>
            <a href="#">Privacy Policy</a>
        </div>
    </div>
</template>

<script>
export default {
    name: "Header",
    components: {},
    props: {},
    methods: {},
};
</script>

<style scoped>
* {
    margin: 0;
}

#footer {
    width: 100%;
    background-color: #c4c4c4;
    padding: 1rem;
    font-size: 1.2rem;
    display: flex;
    justify-content: space-between;
}

#footer a {
    color: #000;
    text-decoration: none;
    padding: 0 0.5rem;
}
</style>

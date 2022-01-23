<template>
    <div id="header">
        <div @click="handleLogoClicked" class="header__logo">
            <i class="far fa-clock header__clock-icon"></i>
            <p>onLineUp</p>
        </div>

        <div class="header__avatar-container">
            <i class="fas fa-bell header__bell-icon"></i>
            <img
                class="header__avatar"
                src="~@/assets/ong_nam.jpg"
                alt="avatar"
            />
        </div>
    </div>
</template>

<script>
export default {
    name: "Header",
    components: {},
    props: {},
    methods: {
        handleLogoClicked: function () {
            this.$router.push("/home");
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
}

#header {
    display: flex;
    height: 4rem;
    width: 100%;
    background: var(--gradient);
    align-items: center;
    justify-content: space-between;
    padding: 0 2rem;
}

.header__logo {
    display: flex;
    align-items: center;
    cursor: pointer;
}

.header__logo > p {
    margin-left: 0.5rem;
    font-size: 1.5rem;
    font-weight: bold;
    color: #fff;
}

.header__clock-icon {
    font-size: 1.5rem;
    padding-right: 0.5rem;
    margin-top: 0.5rem;
    font-weight: 500;
    color: #fff;
    border-right: solid 3px #fff;
}

.header__avatar {
    height: 2.5rem;
    widows: 2.5rem;
}

.header__avatar-container {
    display: flex;
    align-items: center;
}

.header__avatar {
    margin-right: -5%;
    box-shadow: rgba(100, 100, 100, 0.16) 0px 1px 4px,
        rgb(255, 255, 255) 0px 0px 0px 3px;
}

.header__bell-icon {
    font-size: 1rem;
    color: #fff;
    margin: auto 1rem;
    text-align: center;
    cursor: pointer;
}

.header__bell-icon:hover {
    color: #f6b800;
}
</style>

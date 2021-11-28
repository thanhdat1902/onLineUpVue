<template>
    <div id="header">
        <p>onLineUp</p>
        <div class="header__search-container">
            <div class="header__search-bar">
                <input
                    class="header__search-input"
                    type="text"
                    placeholder="Search"
                />
                <button v-on:click="showPwd" class="header__search-icon">
                    <i class="social-button__icon fas fa-search fa-lg"></i>
                </button>
            </div>
            <button class="header__create-room-btn">+Room</button>
        </div>
        <img class="header__avatar" src="~@/assets/ong_nam.jpg" alt="avatar" />
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
#header {
    display: flex;
    width: 100%;
    height: 6rem;
    background: var(--gradient);
    justify-content: space-around;
    align-items: center;
    padding: 0 1rem;
}

#header p {
    font-size: 2rem;
    font-weight: bold;
    color: #000;
}

.header__avatar {
    height: 4rem;
    widows: 4rem;
}

.header__search-container {
    display: flex;
    width: 50%;
    height: 100%;
    align-items: center;
}

.header__search-bar {
    flex-grow: 5;
    padding: 0.5rem 1rem;
    background: #fff;
    width: 40%;
    height: 30%;
    border-radius: 0.3rem;
    border: none;
    display: flex;
    flex-direction: row;
    align-items: center;
}

.header__search-input {
    background: transparent;
    border: none;
    font-size: 1.2rem;
    height: 100%;
    width: 100%;
}

.header__search-input:focus {
    outline: none;
}

.header__search-icon {
    background: none;
    border: none;
    height: 100%;
    cursor: pointer;
    margin-right: -0.5rem;
}

.header__create-room-btn {
    flex-grow: 1;
    font-size: 1.5rem;
    cursor: pointer;
    margin: 0 1rem;
    height: 40%;
    border-radius: 0.5rem;
    border: none;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(0, 0, 0) 0px 0px 0px 2px;
    background: #fff;
}

.header__avatar {
    margin-right: -5%;
    box-shadow: rgba(100, 100, 100, 0.16) 0px 1px 4px,
        rgb(255, 255, 255) 0px 0px 0px 3px;
}
</style>

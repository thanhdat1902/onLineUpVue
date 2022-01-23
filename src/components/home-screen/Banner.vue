<template>
    <div id="banner">
        <img
            class="banner__image"
            src="~@/assets/queue-undraw.svg"
            alt="queue"
        />
        <div class="banner__search-container">
            <button class="banner__create-room-btn">Create a room</button>
            <div class="banner__search-bar">
                <input
                    v-model="keyword"
                    @keyup.enter="handleSearch"
                    class="banner__search-input"
                    type="text"
                    placeholder="Search"
                />
                <button @click="handleSearch" class="banner__search-icon">
                    <i class="social-button__icon fas fa-search fa-lg"></i>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import http from "../../core/http";
export default {
    name: "Banner",
    components: {},
    props: {},
    data: function () {
        return {
            keyword: "",
        };
    },
    methods: {
        handleSearch: function () {
            http.setSearchKey(this.keyword);
            this.$emit("searchClicked");
            this.$router.push("/search-room");
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

#banner {
    height: 20rem;
    display: flex;
    align-items: center;
    background-color: #fff;
    padding: 1rem 5%;
    justify-content: space-around;
    background-image: url("~@/assets/banner_background.jpg");
    background-size: 120%;
}

.banner__image {
    font-size: 5rem;

    width: auto;
    height: 80%;
}
/* Handle search bar and create room button */
.banner__search-container {
    display: flex;
    flex-direction: column;
    width: 30%;
    height: 40%;
    justify-content: space-between;
    align-items: center;
}

.banner__create-room-btn {
    padding: 0.5rem 1rem;
    background: var(--gradient_reverse);
    height: 45%;
    width: 100%;
    border-radius: 0.3rem;
    color: #fff;
    font-weight: 700;
    border: none;
    cursor: pointer;
    position: relative;
    transition: all 0.2s linear 0s;
}

.banner__create-room-btn:before {
    content: "\f067";
    font-family: FontAwesome;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 2rem;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 0 50% 50% 0;
    transform: scale(0, 1);
    transform-origin: left center;
    transition: all 0.2s linear 0s;
}
.banner__create-room-btn:hover {
    text-indent: 2rem;
}
.banner__create-room-btn:hover:before {
    transform: scale(1, 1);
    text-indent: 0;
}

.banner__search-bar {
    padding: 0.5rem 1rem;
    background: #fff;
    height: 45%;
    width: 100%;
    border-radius: 0.3rem;
    border: none;
    display: flex;
    flex-direction: row;
    align-items: center;
}

.banner__search-input {
    background: transparent;
    border: none;
    height: 100%;
    width: 100%;
    color: #000;
}

.banner__search-input:focus {
    outline: none;
}

.banner__search-icon {
    background: none;
    border: none;
    height: 100%;
    cursor: pointer;
    margin-right: -0.5rem;
}
</style>

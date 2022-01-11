<template>
    <div id="join-room">
        <Header class="join-room__header" />
        <div class="join-room__body">
            <div class="join-room__detail-container">
                <RoomDetail />
            </div>
            <Button class="join-room__btn" text="Join Room" />
        </div>

        <Footer />
    </div>
</template>

<script>
import RoomDetail from "./RoomDetail.vue";
import Footer from "../../../core/components/Footer.vue";
import Header from "../../../core/components/Header.vue";
import Button from "../../../core/components/Button.vue";
export default {
    name: "JoinRoomScreen",
    components: {
        RoomDetail,
        Header,
        Footer,
        Button,
    },
    props: {
        listRoom: Array,
        listName: String,
        isJoined: Boolean,
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: "Encode Sans", sans-serif;
    font-size: 16px;
}

#join-room {
    height: 100vh;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    display: flex;
    flex-direction: column;
}
.join-room__header {
    background: var(--primary_2) !important;
    border-bottom: 1px solid #fff;
}

.join-room__body {
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100%;
    justify-content: center;
    align-items: center;
    background: linear-gradient(180deg, var(--primary_2) 40%, #fff 40%);
}

.join-room__detail-container {
    height: 65vh;
    width: 80%;
    z-index: 100;
}

.join-room__btn {
    background: var(--primary_2);
    width: 30%;
    margin-top: 2rem;
    text-align: center;
    border-radius: 1rem;
    cursor: pointer;
}
</style>

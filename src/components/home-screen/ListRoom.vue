<template>
    <div id="list-room">
        <p>{{ listName }}</p>
        <!-- <div class="list-room__empty">You have not joined any room yet</div> -->

        <div
            v-bind:class="{ 'list-room__room-container--border': isJoined }"
            class="list-room__room-container"
        >
            <RoomTag
                class="list-room__room"
                v-for="room in listRoom"
                :key="room"
                :roomName="room.name"
                :hostName="room.hostName"
                :address="room.address"
                :start="room.startDate"
                :end="room.endDate"
            />
        </div>
    </div>
</template>

<script>
import RoomTag from "../home-screen/RoomTag.vue";
export default {
    name: "ListRoom",
    components: {
        RoomTag,
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
    font-size: 16px;
}

#list-room {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
}

#list-room p {
    font-size: 1.5rem;
    padding: 2rem;
    font-weight: bold;
}

.list-room__room-container {
    display: grid;
    grid-template-columns: auto auto auto;
    grid-gap: 2rem 2rem;
    width: 75vw;
    justify-content: start;
    padding-bottom: 3rem;
}

.list-room__room-container--border {
    border-bottom: 2px solid #a9a9a9;
}

.list-room__room-container .list-room__room {
    width: calc(75vw / 3 - 4rem / 3);
}

.list-room__empty {
    padding: 7rem 2rem;
    font-size: 2rem;
    color: #a9a9a9;
    font-weight: bolder;
    border-bottom: 3px solid #a9a9a9;
    border-top: 3px solid #a9a9a9;
}
</style>

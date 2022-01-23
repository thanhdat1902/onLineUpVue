<template>
    <div id="search-room">
        <Header />
        <Banner @searchClicked="searchRoom" />

        <div class="search-room__result">
            <p>Search Result:</p>
            <div v-if="!listRoom.length" class="search-room__empty-result">
                <p>There is no room match your search</p>
            </div>
            <SearchResult
                @click="handleRoomClick(room)"
                v-for="room in listRoom"
                :key="room"
                :roomName="room.name"
                :hostName="room.hostName"
                :startDate="room.startDate"
                :endDate="room.endDate"
                :location="room.address"
            />
        </div>

        <Footer style="margin-top: 3rem" />
    </div>
</template>

<script>
import Header from "../../core/components/Header.vue";
import Footer from "../../core/components/Footer.vue";
import Banner from "../home-screen/Banner.vue";
import SearchResult from "../../core/components/SearchResult.vue";
import http from "../../core/http";
import rooms from "../../api/rooms";

export default {
    name: "HomeScreen",
    components: {
        Header,
        Banner,
        Footer,
        SearchResult,
    },
    data: function () {
        return {
            listRoom: [],
            listOwnerRoom: [],
        };
    },
    mounted() {
        this.searchRoom();
        console.log(http.getSearchKey());
    },
    methods: {
        searchRoom: function () {
            rooms
                .searchRoom({ roomName: http.getSearchKey() })
                .then((data) => {
                    console.log(data);
                    this.listRoom = [...data.data];
                    const option = {
                        hour: "numeric",
                        minute: "numeric",
                        day: "numeric",
                        weekday: "short",

                        month: "short",
                    };
                    this.listRoom.forEach((room) => {
                        let startTimeStamp = room.startDate;
                        let endTimeStamp = room.endDate;
                        let start = new Date(startTimeStamp);
                        let end = new Date(endTimeStamp);
                        room.startDate = new Intl.DateTimeFormat(
                            navigator.language,
                            option
                        ).format(start);
                        room.endDate = new Intl.DateTimeFormat(
                            navigator.language,
                            option
                        ).format(end);
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        handleRoomClick: function (room) {
            http.setCurrentRoom(room.id);
            this.$router.push({
                name: "JoinRoomScreen",
                params: { roomId: room.id },
            });
        },
        handleSearch: function () {
            console.log("search again");
        },
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

.search-room__result {
    background: #fafafa;
}

.search-room__result > p {
    padding: 1.5rem 2rem 0 2rem;
    font-size: 1.5rem;
    font-weight: bold;
}

.search-room__empty-result {
    width: 50%;
    text-align: center;
    margin: auto;
    padding: 7rem 2rem;

    color: #a9a9a9;
    font-weight: bolder;
    border-bottom: 3px solid #a9a9a9;
    border-top: 3px solid #a9a9a9;
}

.search-room__empty-result p {
    font-size: 2rem;
}
</style>

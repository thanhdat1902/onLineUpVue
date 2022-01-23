<template>
    <div id="home-screen">
        <Header />
        <Banner />
        <ListRoom :listRoom="listRoom" listName="JOINED" :isJoined="true" />
        <ListRoom :listRoom="listOwnerRoom" listName="OWNER" />
        <Footer />
    </div>
</template>

<script>
import rooms from "../../api/rooms.js";
import Header from "../../core/components/Header.vue";
import Footer from "../../core/components/Footer.vue";
import Banner from "../home-screen/Banner.vue";
import ListRoom from "../home-screen/ListRoom.vue";
export default {
    name: "HomeScreen",
    components: {
        Header,
        Banner,
        Footer,
        ListRoom,
    },
    data: function () {
        return {
            listRoom: [],
            listOwnerRoom: [],
        };
    },
    created() {
        //Get joined list
        rooms
            .getListJoinedRoom()
            .then((res) => {
                this.listRoom = res.data;
                this.modifyListRoom(this.listRoom);
            })
            .catch((err) => console.log(err));

        //Get owner list
        rooms
            .getListOwnerRoom()
            .then((res) => {
                this.listOwnerRoom = res.data;
                this.modifyListRoom(this.listOwnerRoom);
            })
            .catch((err) => console.log(err));
    },
    methods: {
        modifyListRoom: function (list) {
            const option = {
                hour: "numeric",
                minute: "numeric",
                day: "numeric",
                weekday: "short",

                month: "short",
            };
            list.forEach((room) => {
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

#home-screen {
    background-color: var(--background);
}

.home-screen__carousel-container {
    width: 90%;
    margin: auto;
    border-radius: 1.5rem;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
        rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
}

.home-screen__room-carousel {
    margin: 0 2rem;
}

.home-screen__list-title {
    font-size: 1.5rem;
    font-weight: bold;
    padding: 1.5rem 1rem;
}
</style>

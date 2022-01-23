<template>
    <div id="join-room">
        <Header class="join-room__header" />
        <div class="join-room__body">
            <div class="join-room__detail-container">
                <RoomDetail
                    :roomName="roomInfo.name"
                    :startDate="roomInfo.startDate"
                    :endDate="roomInfo.endDate"
                    :hostName="roomInfo.hostName"
                    :location="roomInfo.address"
                    :joined="joined"
                    :curQueuer="queuerNum"
                    description="Waiting room"
                />
            </div>
            <Button
                @click="handleJoinClicked"
                class="join-room__btn"
                text="Join Room"
                v-bind:class="{ 'join-room__btn--joined': joined }"
            />
        </div>

        <Footer />
    </div>
</template>

<script>
import RoomDetail from "./RoomDetail.vue";
import Footer from "../../../core/components/Footer.vue";
import Header from "../../../core/components/Header.vue";
import Button from "../../../core/components/Button.vue";
import http from "../../../core/http/index";
import rooms from "../../../api/rooms";
export default {
    name: "JoinRoomScreen",
    data: function () {
        return {
            id: String,
            roomInfo: Object,
            name: "sss",
            joined: false,
            queuerNum: 15,
        };
    },

    components: {
        RoomDetail,
        Header,
        Footer,
        Button,
    },
    props: { roomId: String },
    mounted() {
        this.id = http.getCurrentRoom();
        console.log(this.id);
        console.log(http.getUserId());
        rooms
            .getRoomDetail({ roomID: this.id })
            .then((data) => {
                //check joined
                console.log(typeof data.data.userList);
                console.log(data.data.userList);
                //check queuer
                data.data.userList.forEach((user) => {
                    console.log(user.id);
                    console.log(http.getUserId());

                    if (user.id === http.getUserId()) {
                        this.joined = true;
                    }
                });
                //check admin
                data.data.adminList.forEach((admin) => {
                    console.log(admin.id);
                    console.log(http.getUserId());

                    if (admin.id === http.getUserId()) {
                        this.joined = true;
                    }
                });
                // modify room date
                const option = {
                    hour: "numeric",
                    minute: "numeric",
                    day: "numeric",
                    weekday: "short",

                    month: "short",
                };
                let startTimeStamp = data.data.startDate;
                let endTimeStamp = data.data.endDate;
                let start = new Date(startTimeStamp);
                let end = new Date(endTimeStamp);
                data.data.startDate = new Intl.DateTimeFormat(
                    navigator.language,
                    option
                ).format(start);
                data.data.endDate = new Intl.DateTimeFormat(
                    navigator.language,
                    option
                ).format(end);
                // modify room date
                this.roomInfo = { ...data.data };
                console.log(this.roomInfo);
            })
            .catch((err) => {
                console.log(err);
            });
    },
    methods: {
        handleJoinClicked: function () {
            if (!this.joined) {
                this.joined = true;
                console.log(this.joined);
                this.queuerNum += 1;
                console.log(http.getAccessToken());
                console.log(this.roomInfo.id);
                console.log(http.getUserId());
                rooms
                    .addQueuer({
                        roomID: this.roomInfo.id,
                    })
                    .then((res) => {
                        console.log(res);
                    })
                    .catch((err) => {
                        console.log(err.message);
                    });
            }
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
    margin-top: 2%;
    text-align: center;
    border-radius: 1rem;
    cursor: pointer;
}

.join-room__btn--joined {
    opacity: 0.5;
    cursor: default;
}
</style>

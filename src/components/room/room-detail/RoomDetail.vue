<template>
    <div id="room-detail">
        <div class="room-tail__banner">
            <img
                class="detail-img"
                src="~@/assets/detail-undraw.svg"
                alt="detail"
            />
        </div>
        <p class="room-tail__room-name">{{ roomName }}</p>
        <div class="room-detail__information-container">
            <div class="room-detail__information">
                <div
                    v-bind:class="{
                        'room-info__container--not-joined': !joined,
                    }"
                    class="room-info__container"
                >
                    <p v-if="joined" @click="handleSwitchInfo">
                        <i class="fas fa-sync"></i>Click here to see additional
                        info
                    </p>
                    <div
                        v-if="!switched"
                        class="room-info__main"
                        style="width: 100%"
                    >
                        <div class="room-info__detail room-info__room-host">
                            <i class="far fa-user"></i>
                            <p>{{ hostName }}</p>
                        </div>
                        <div class="room-info__extra-detail">
                            <div class="room-info__detail">
                                <i class="far fa-compass"></i>
                                <p>{{ location }}</p>
                            </div>

                            <div class="room-info__detail">
                                <i class="far fa-calendar"></i>
                                <p>{{ startDate }}</p>
                            </div>

                            <div class="room-info__detail">
                                <i class="far fa-hourglass"></i>
                                <p>
                                    Estimated process time per <br />
                                    person: 00:05
                                </p>
                            </div>

                            <div class="room-info__detail">
                                <i class="far fa-calendar"></i>
                                <p>{{ endDate }}</p>
                            </div>

                            <div class="room-info__detail">
                                <i class="far fa-clipboard"></i>
                                <p>{{ description }}</p>
                            </div>
                        </div>
                    </div>

                    <div v-else class="room-info__additional">
                        <div class="qrcode-container">
                            <div class="qrcode">
                                <qrcode-vue
                                    style="height: 90%; width: 90%"
                                    :value="value"
                                    :size="size"
                                    level="H"
                                />
                            </div>
                            <p style="margin-top: 0.5rem">
                                Show this QR code to your
                            </p>
                            <p>room’s host to check in</p>
                        </div>
                        <div class="additional-info">
                            <p>
                                <i class="fas fa-file-alt"></i>Required
                                documents:
                            </p>
                            <ul class="additional-list">
                                <li>Your ID</li>
                                <li>Your passport</li>
                                <li>3x4 photos</li>
                            </ul>
                            <p><i class="fas fa-tshirt"></i>Dress code:</p>
                            <ul class="additional-list">
                                <li>Formal shoes</li>
                                <li>White shirt</li>
                                <li>Dark trousers</li>
                            </ul>
                            <p>
                                <i class="fas fa-thumbtack"></i>Additional note
                            </p>
                            <ul class="additional-list">
                                <li>None</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="room-info__current-queuer">
                    <div class="queurs-description">
                        <p class="queuers-number">{{ curQueuer }}</p>

                        <p>
                            Current <br />
                            queuers
                        </p>
                    </div>

                    <i class="fas fa-caret-right"></i>
                </div>
            </div>
            <ParticipantList :adminName="hostName" />
        </div>
    </div>
</template>

<script>
import ParticipantList from "../room-detail/ParticipantList.vue";
import QrcodeVue from "qrcode.vue";
export default {
    name: "RoomDetail",
    components: {
        ParticipantList,
        QrcodeVue,
    },
    data: function () {
        return {
            value: "https://onlineup-utilities.web.app?roomId=23dg2KO",
            size: window.innerHeight / 4,
            switched: false,
        };
    },
    props: {
        roomName: String,
        hostName: String,
        endDate: String,
        startDate: String,
        description: String,
        location: String,
        joined: Boolean,
        curQueuer: Number,
    },
    methods: {
        handleSwitchInfo: function () {
            console.log(1);
            this.switched = !this.switched;
            console.log(this.switched);
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

#room-detail {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
}

.room-tail__room-name {
    color: #fff;
    font-weight: bold;
    font-size: 2rem;
    padding: 1rem;
}

#room-detail .room-tail__banner {
    align-self: flex-end;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 37%;
    height: 35%;
    width: auto;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
        rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    margin-bottom: -12%;
    z-index: 100;
    background: #fff;
    border-radius: 2rem;
}
.detail-img {
    padding: 1rem;
    width: auto;
    height: 100%;
}

.room-detail__information-container {
    height: 80%;
    display: flex;
}

#room-detail .room-detail__information {
    height: 100%;
    width: 100%;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
    border-radius: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #fff;
}

/* Start room info */
.room-info__container {
    padding: 2rem 0;
    margin-right: 4rem;
    height: 110%;
    width: 70%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    margin-left: 3rem;
}

.room-info__container--not-joined {
    padding-top: 3rem;
    padding-left: 3rem;
    width: 76%;
    height: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    margin: 5.5% 0 0 0;
}

.room-info__container > p {
    margin-right: 10rem;
    font-size: 0.9rem;
    cursor: pointer;
}

.room-info__container > p i {
    font-size: 0.8rem;
    margin-right: 0.5rem;
}

.room-info__main {
    margin-bottom: 15%;
    margin-left: 2rem;
}

.room-info__detail {
    display: flex;
    padding-top: 0.5rem;
}

.room-info__detail i {
    padding-top: 0.2rem;
    margin-right: 0.5rem;
}

.room-info__detail .fa-hourglass {
    padding-top: 0.7rem;
}

.room-info__room-host {
    width: 100%;
    padding: 1rem 0;
    border-bottom: solid 1px #000;
}

.room-info__extra-detail {
    width: 100%;
    padding: 1rem 2rem 0 0;
    display: grid;
    grid-row-gap: 1rem;
    grid-template-columns: auto auto;
    justify-content: space-between;
}

.room-info__additional {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
}

.qrcode-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.room-info__additional .qrcode {
    height: 13rem;
    width: 13rem;
    background: var(--primary_2);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 1rem;
}

.additional-info {
    padding: 0.5rem 0;
}

.additional-info i {
    margin-right: 0.5rem;
}

.additional-list {
    display: grid;
    column-gap: 3rem;
    grid-template-columns: auto auto;
    margin: 0.5rem 0 0.5rem 3rem;
}

/* .additional-list li {
    width: 13rem;
} */

/* Current queuer  */
.room-info__current-queuer {
    display: flex;
    align-items: center;
}

.room-info__current-queuer .queuers-number {
    font-weight: bold;
    font-size: 2rem;
    text-align: center;
}

.room-info__current-queuer i {
    font-size: 1.5rem;
    margin: 0 1rem;
}
</style>

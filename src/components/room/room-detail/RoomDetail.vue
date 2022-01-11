<template>
    <div id="room-detail">
        <div class="room-tail__banner">
            <img
                class="detail-img"
                src="~@/assets/detail-undraw.svg"
                alt="detail"
            />
        </div>
        <p class="room-tail__room-name">Room's Name</p>
        <div class="room-detail__information-container">
            <div class="room-detail__information">
                <div class="room-info__container">
                    <div class="room-info__detail room-info__room-host">
                        <i class="far fa-user"></i>
                        <p>Host Name</p>
                    </div>
                    <div class="room-info__extra-detail">
                        <div class="room-info__detail">
                            <i class="far fa-compass"></i>
                            <p>Location</p>
                        </div>

                        <div class="room-info__detail">
                            <i class="far fa-calendar"></i>
                            <p>Start time</p>
                        </div>

                        <div class="room-info__detail">
                            <i class="far fa-hourglass"></i>
                            <p>
                                Estimated process time per <br />
                                person: hh:mm
                            </p>
                        </div>

                        <div class="room-info__detail">
                            <i class="far fa-calendar"></i>
                            <p>End time</p>
                        </div>

                        <div class="room-info__detail">
                            <i class="far fa-clipboard"></i>
                            <p>Description</p>
                        </div>
                    </div>
                </div>
                <div class="room-info__current-queuer">
                    <div class="queurs-description">
                        <p class="queuers-number">15</p>

                        <p>
                            Current <br />
                            queuers
                        </p>
                    </div>

                    <i class="fas fa-caret-right"></i>
                </div>
            </div>
            <ParticipantList />
        </div>
    </div>
</template>

<script>
import ParticipantList from "../room-detail/ParticipantList.vue";

export default {
    name: "RoomDetail",
    components: {
        ParticipantList,
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
    margin-right: 40%;
    height: 40%;
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
    padding: 2rem;
    width: 70%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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

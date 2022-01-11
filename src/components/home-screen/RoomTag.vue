<template>
    <div class="room-tag">
        <div class="room-tag__category"></div>
        <p style="font-weight: bold; font-size: 1.4rem">{{ roomName }}</p>

        <div class="room-tag__detail room-tag__room-host">
            <i class="far fa-user"></i>
            <p>{{ hostName }}</p>
        </div>

        <div class="room-tag__extra-detail">
            <div class="room-tag__detail">
                <i class="far fa-compass"></i>
                <p>{{ address }}</p>
            </div>

            <div class="room-tag__detail">
                <i class="far fa-calendar"></i>
                <p>{{ start }}</p>
            </div>

            <div class="room-tag__detail">
                <i class="far fa-calendar"></i>
                <p>{{ end }}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "RoomTag",
    props: {
        roomName: String,
        hostName: String,
        address: String,
        start: String,
        end: String,
    },
    mounted() {
        console.log(this.roomName);
    },
    methods: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}

.room-tag {
    background: #fff;
    height: 15rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    color: #000;
    border-radius: 0.5rem;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    cursor: pointer;
}

.room-tag__category {
    height: 0.7rem;
    width: 5rem;
    background-color: var(--primary_1);
    border-radius: 0.5rem;
    margin: 0.2rem 0 0.2rem auto;
}

.room-tag__detail {
    display: flex;
    padding-top: 0.5rem;
}

.room-tag__detail i {
    padding-top: 0.2rem;
    margin-right: 1rem;
}

.room-tag__room-host {
    padding: 1rem 0;
    border-bottom: solid 1px #000;
}
</style>

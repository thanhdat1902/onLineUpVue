<template>
    <div>
        <!-- navigationNextLabel là button next, tìm cách thêm vào component vào chỗ này -->

        <Carousel :items-to-show="3">
            <slide v-for="room in listRoom" :key="room">
                <RoomTag
                    :roomName="room.name"
                    :hostName="room.hostName"
                    :date="room.startDate"
                    :number="room.processUnit"
                />
            </slide>

            <template v-if="option" #addons>
                <Navigation />
                <Pagination />
            </template>
        </Carousel>
        <!-- <Button innerText="Sample"/>
    <Button innerText="Sample"/> -->
    </div>
</template>
<script>
import { defineComponent } from "vue";
import { Carousel, Navigation, Pagination, Slide } from "vue3-carousel";
import RoomTag from "../home-screen/RoomTag.vue";

import "vue3-carousel/dist/carousel.css";

export default defineComponent({
    data: function () {
        return {
            option: true,
        };
    },
    props: {
        listRoom: Array,
    },
    name: "RoomCarousel",
    components: {
        Carousel,
        Slide,
        Pagination,
        Navigation,
        RoomTag,
    },
});
</script>

<style>
.carousel__prev,
.carousel__next {
    background-color: var(--primary_1);
}

.carousel__pagination-button {
    background-color: #808080;
}

.carousel__pagination-button--active {
    background-color: var(--primary_1);
}

.carousel__pagination {
    padding: 0;
}
</style>

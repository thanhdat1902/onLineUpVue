<template>
    <div id="room-info">
        <p>Room Detail</p>
        <div class="room-info__time-container">
            <InputField
                class="room-info__input room-name"
                placeholder="Room Name"
                input_type="text"
            />
            <InputField
                class="room-info__input estimated-time"
                placeholder="Estimated time"
                input_type="text"
            />
        </div>
        <div class="room-info__time-container">
            <span class="input-label"><p>Date/time:</p> </span>
            <InputField
                class="room-info__input date-time"
                placeholder="Date/Time"
                input_type="datetime-local"
            />
        </div>
        <InputField
            class="room-info__input"
            placeholder="Address"
            input_type="text"
        />
        <Button class="room-info__button" text="Next" />
    </div>
</template>
<script>
import InputField from "../../../core/components/InputField.vue";
import Button from "../../../core/components/Button.vue";
export default {
    name: "RoomInfoForm",
    components: {
        InputField,
        Button,
    },
};
</script>
<style scoped>
* {
    box-sizing: border-box;
}

#room-info {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 2% 4%;
    border-radius: 1.5rem;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
        rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
    background-color: #fff;
}

#room-info > p {
    font-size: 2rem;
    font-weight: bold;
    margin: 0;
}

.room-info__input {
    border-radius: 0.7rem;
    border: solid 3px #000;
    width: 100%;
    padding: 1rem;
}

.room-info__time-container {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
}

.input-label {
    text-align: center;
    font-weight: bold;
}

.estimated-time,
.room-name {
    width: 47%;
}

.date-time {
    display: flex;
    align-items: center;
    margin-left: 1rem;
}

.estimated-time {
    margin-left: auto;
}

.room-info__button {
    margin-left: auto;
}
</style>

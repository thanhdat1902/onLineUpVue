<template>
    <div id="participants">
        <p>Participants</p>
        <ul class="participants__list">
            <li>
                <div class="user-name">
                    <i
                        style="margin-top: 0.4rem"
                        class="fas fa-user-circle"
                    ></i>
                    <p>
                        {{ adminName }}
                        <br />
                        <span style="font-size=0.5rem">Room Host</span>
                    </p>
                </div>

                <div style="margin-top: 0.4rem">
                    <i class="far fa-comment-dots"></i>
                    <i class="fas fa-ellipsis-h"></i>
                </div>
            </li>
            <li v-for="n in 5" :key="n">
                <div class="user-name">
                    <i class="fas fa-user-circle"></i>
                    <p>Queuer</p>
                </div>

                <div>
                    <i class="far fa-comment-dots"></i>
                    <i class="fas fa-ellipsis-h"></i>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "ParticipantList",
    components: {},
    props: {
        adminName: String,
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

#participants {
    margin-left: 1rem;
    width: 50%;
    display: flex;
    flex-direction: column;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
    border-radius: 1rem;
    background: #fff;
}

#participants > p {
    font-size: 1.2rem;
    padding: 1rem 0 0 1.5rem;
    font-weight: bold;
}

.participants__list {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 80%;
    width: 100%;
    padding: 2rem 1.3rem;
    list-style-type: none;
}

.user-name {
    display: flex;
}

.fa-user-circle {
    font-size: 1.5rem;
    margin-right: 0.2rem;
}

.participants__list li {
    display: flex;
    justify-content: space-between;
}

.participants__list li i {
    padding: 0 0.2rem;
    cursor: pointer;
}

.participants__list li span {
    font-size: 0.8rem;
}
</style>

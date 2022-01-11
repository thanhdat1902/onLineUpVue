<template>
    <div class="result-card">
        <span class="result-tag"></span>
        <img class="result-img" src="~@/assets/ong_nam.jpg" alt="Host's image">
        <span class="result-info-list">
            <p class="result-name">{{roomName}}</p>
            <span class="result-info">
                <i class="info-icon far fa-user"></i>
                <p class="info-content">{{hostName}}</p>
            </span>
            <span class="info-divider"></span>
            <span class="result-info">
                <i class="info-icon far fa-compass"></i>
                <p class="info-content">{{location}}</p>
            </span>
            <span class="result-info">
                <i class="info-icon far fa-calendar"></i>
                <p class="info-content">{{startDate}}</p>
            </span>
            <span class="result-info">
                <i class="info-icon far fa-calendar"></i>
                <p class="info-content">{{endDate}}</p>
            </span>
        </span>
    </div>
</template>

<script>
export default {
    name: "SearchResult",
    props:{
        roomName: {
            type: String,
            default: "Room Name",
        },
        hostName: {
            type: String,
            default: "User Name",
        },
        location: {
            type: String,
            default: "Meeting's location",
        },
        startDate: {
            type: String,
            default: "Start date & time",
        },
        endDate: {
            type: String,
            default: "Start date & time",
        },
    }
};
</script>

<style scoped>
* {
    font-size: 16px;
}
.result-card {
    background: rgb(255, 255, 255);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    width: 65%;
    height: 17rem;
    border-radius: 0.7rem;
    border: none;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 1rem auto;
    position: relative;
}

.result-tag {
    position: absolute;
    background: #5590BA;
    border-radius: 5px;
    width: 120px;
    height: 7px;
    top: 7px;
    right: 40px;
}

.result-img {
    width: 15rem;
    height: 13rem;
    padding: 0 3rem 0; 
}

.result-info-list {
    display: flex;
    flex-direction: column;
    margin-left: 1.5rem;
}

.result-name {
    font-size: 150%;
    font-weight: bold;
    margin: 0.5rem 0.5rem 1rem 0;
}

.result-info {
    display: flex;
    flex-direction: row;
    align-items: center;
    column-gap: 0.5rem;
}

.info-divider {
    border: 1px solid #000000;
    margin: 0.3rem 1rem 0 0;
    width: 300px;
}

.info-content {
    margin: 0.2rem;
}
</style>

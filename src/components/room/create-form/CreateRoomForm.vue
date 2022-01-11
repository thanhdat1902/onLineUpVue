<template>
    <div id="form-create">
        <div class="form-create__header">
            <p>onLineUp</p>
            <span class="header-close-btn">
                <i class="fas fa-times"></i>
            </span>
        </div>
        <div class="form-create__form-container">
            <div class="process-container">
                <div class="process-bar">
                    <div class="process-number process-number--active">
                        <p>1</p>
                    </div>
                    <span class="process-number--active"> </span>
                    <div class="process-number">
                        <p>2</p>
                    </div>
                    <span></span>
                    <div class="process-number">
                        <p>3</p>
                    </div>
                </div>
                <div class="process-name">
                    <p>Room Detail</p>
                    <p>Additional infomation</p>
                    <p>Host infomation</p>
                </div>
            </div>
            <RoomInfoForm class="input-container" />
        </div>

        <Footer />
    </div>
</template>

<script>
import Footer from "../../../core/components/Footer.vue";
import RoomInfoForm from "../create-form/RoomInfoForm.vue";
export default {
    name: "CreateScreenForm",
    components: {
        Footer,
        RoomInfoForm,
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}

#form-create {
    max-height: 100vh;
    max-width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.form-create__header {
    background: var(--gradient);
    height: 3.5rem;
    padding: 0 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.form-create__header p {
    font-size: 1.7rem;
    font-weight: bold;
    color: #000;
    width: 20%;
}

.header-close-btn {
    font-size: 2.5rem;
    color: #fff;
    cursor: pointer;
}

.header-close-btn:hover {
    color: var(--error);
}

.form-create__form-container {
    background-image: url("~@/assets/background_login.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    width: 100%;
    height: 90vh;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 1.5rem 0;
}

.process-bar {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.process-number {
    background: rgba(196, 196, 196, 0.6);
    width: 4rem;
    height: 4rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
}

.process-number--active {
    background: var(--success) !important;
}

.process-number p {
    color: #fff;
    font-weight: bold;
    font-size: 2rem;
}

.process-bar > span {
    content: " ";
    background: rgba(196, 196, 196, 0.6);
    height: 2.5rem;
    width: 0.5rem;
    float: bottom;
    margin: -0.02rem 0;
}

.input-container {
    height: 100%;
    width: 50%;
}

.process-container {
    display: flex;
}

.process-name {
    margin-left: 2rem;
    padding: 1rem 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: #000;
    font-weight: bold;
    font-size: 1.2rem;
}
</style>

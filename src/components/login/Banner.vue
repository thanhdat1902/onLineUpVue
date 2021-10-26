<template>
    <div class="main__banner">
        <div class="main__banner-msg">Welcome back!</div>
        <p>
            To keep connected with us please login with your personal info
        </p>
        <Button class="signin-btn" text="LOG IN" link="#" />
    </div>
</template>

<script>
import Button from "../../core/components/Button";
export default {
    name: "Banner",
    components: {
        Button,
    },
};
</script>

<style scoped>
.main__banner {
    max-width: 35%;
    background: var(--gradient_trans);

    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #fff;
    align-items: center;
}

.main__banner .main__banner-msg {
    font-size: 2rem;
    text-align: center;
    font-weight: bold;
}

.main__banner p {
    text-align: center;
    margin: 1.5rem 1rem;
}

.signin-btn {
    border: solid 2px var(--primary_1);
    background: #fff;
    color: var(--primary_1);
    box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
        rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
}

@media (min-width: 1024px) {
    .main__banner {
        border-top-left-radius: 8px;
        border-bottom-left-radius: 8px;
    }
}

@media (min-width: 740px) and (max-width: 1024px) {
}

@media (max-width: 740px) {
    .main__banner {
        max-width: 100%;
        flex-grow: 1;
        border-bottom-left-radius: 1rem;
        border-bottom-right-radius: 1rem;
    }
}
</style>

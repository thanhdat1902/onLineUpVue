<template>
    <div class="lang-selector">
        <button
            :class="{ 'lang-selector--active': !isEnglish }"
            class="lang-selector__viet"
            @click="handleLanguageSelectorViet"
        >
            Việt
        </button>
        <button
            :class="{ 'lang-selector--active': isEnglish }"
            class="lang-selector__eng"
            @click="handleLanguageSelectorEng"
        >
            Eng
        </button>
    </div>
</template>

<script>
export default {
    name: "LanguageSelector",
    data: function() {
        return {
            isEnglish: true,
        };
    },
    methods: {
        handleLanguageSelectorViet: function() {
            if (this.isEnglish) this.isEnglish = !this.isEnglish;
        },
        handleLanguageSelectorEng: function() {
            if (!this.isEnglish) this.isEnglish = !this.isEnglish;
        },
    },
};
</script>

<style scoped>
/* Start handle language selector */
.lang-selector {
    margin: 1rem 1rem -2.5rem 0;
    align-self: flex-end;
    text-align: center;
    border-radius: 0.3rem;
    box-sizing: content-box;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
        rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
    display: flex;
    /* border: solid 1px #000; */
}

.lang-selector button {
    padding: 0.2rem 1rem;
    font-size: 0.8rem;
    border: none;
    cursor: pointer;
    background: #fff;
    height: 100%;
}

.lang-selector__eng {
    border-top-right-radius: 0.3rem;
    border-bottom-right-radius: 0.3rem;
}

.lang-selector__viet {
    border-top-left-radius: 0.3rem;
    border-bottom-left-radius: 0.3rem;
}

.lang-selector--active {
    background: var(--gradient) !important;
    color: #fff;
}
/* End handle language selector */
</style>

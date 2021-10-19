<template>
  <a v-bind:href="link" id="button">{{ text }} </a>
</template>

<script>
export default {
  name: "Button",
  props: {
    text: String,
    link: String,
  },
};
</script>

<style scoped>
#button {
  font-size: 16px;
  border-radius: 2rem;
  text-decoration: none;
  padding: 0.7rem 3rem;
  color: #fff;
  background-color: #184271;
  width: fit-content;
  font-weight: 600;
}
</style>

<template>
  <a v-bind:href="link" id="social-button">
    <i :class="icon" class="social-button__icon"></i>
  </a>
</template>

<script>
export default {
  name: "SocialLoginButton",
  props: {
    icon: String,
    link: String,
  },
};
</script>

<style scoped>
#social-button {
  font-size: 16px;
  padding: 0.5rem;
  border-radius: 50%;
  border: 1px solid #9cc1d1;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
}

.social-button__icon {
  width: 1rem;
  height: 1rem;
  text-align: center;

  color: #000;
}
</style>

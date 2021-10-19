/* eslint-disable vue/no-deprecated-dollar-listeners-api */
<template>
  <input
    type="text"
    :placeholder="placeholder"
    id="input-field"
    @input="updateValue"
  />
</template>

<script>
export default {
  name: "InputField",
  props: {
    placeholder: String,
  },
  methods: {
    updateValue(event) {
      this.$emit("input", event.target.value);
    },
  },
  computed: {},
};
</script>

<style scoped>
#input-field {
  padding: 0.7rem 1rem;
  background: rgba(196, 196, 196, 0.6);
  min-width: 60%;
  border-radius: 0.3rem;
  border: none;
}

#input-field::placeholder {
  color: #000;
}
</style>

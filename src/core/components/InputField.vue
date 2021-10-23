/* eslint-disable vue/no-deprecated-dollar-listeners-api */
<template>
  <div class="input-field">
    <input
      ref="input"
      class="input-field__tyepin"
      :type="type_input"
      :placeholder="placeholder"
      @blur="$emit('blur')"
      @input="updateValue"
    />
    <span v-if="isPwd">
      <button v-on:click="showPwd" v-if="show" class="input__pwd-show">
        Show
      </button>
      <button v-on:click="showPwd" v-else class="input__pwd-show">Hide</button>
    </span>
  </div>
</template>

<script>
export default {
  name: "InputField",
  props: {
    placeholder: String,
    input_type: String,
    isPwd: Boolean,
  },
  data: function() {
    return {
      show: true,
      showText: true,
      type_input: this.input_type,
      pwd: String,
    };
  },
  methods: {
    updateValue(event) {
      this.$emit("inputData", event.target.value);
    },
    showPwd: function() {
      this.show = !this.show;
      this.showText = !this.showText;
      this.type_input = this.type_input === "password" ? "text" : "password";
      this.$refs.input.focus();
    },
  },
  computed: {},
};
</script>

<style scoped>
* {
  font-size: 16px;
}
.input-field {
  padding: 0.7rem 1rem;
  background: rgba(196, 196, 196, 0.6);
  width: 80%;
  border-radius: 0.3rem;
  border: none;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.input-field__tyepin {
  background: transparent;
  border: none;
  height: 100%;
  width: 100%;
}

.input-field__tyepin:focus {
  outline: none;
}

.input-field__tyepin::placeholder {
  color: #000;
}

.input__pwd-show {
  font-weight: 600;
  font-size: 16px;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
}

@media (min-width: 1024px) {
  .input-field {
    width: 65%;
  }
}
</style>

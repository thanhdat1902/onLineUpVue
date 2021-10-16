<template>
  <div>
    <form class="login" @submit.prevent="login">
      <h1>Sign in</h1>
      <label>User name</label>
      <input required v-model="username" type="text" placeholder="Snoopy" />
      <label>Password</label>
      <input
        required
        v-model="password"
        type="password"
        placeholder="Password"
      />
      <hr />
      <button type="submit" v-on:submit.prevent="formSumitted">Login</button>
    </form>
  </div>
</template>

<script>
import {AUTH_REQUEST} from "../config/constant"
export default {
  name: 'Login',
  props: {
    msg: String,
  },
  methods: {  
    login: function() {
      console.log(123)
      const { username, password } = this;
      this.$store.dispatch( 'auth/' +AUTH_REQUEST, { username, password }).then(() => {
        this.$router.push('/');
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

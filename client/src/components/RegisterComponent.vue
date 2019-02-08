<template>
  <!-- Material form register -->
  <form @submit="registerApi" method="post">
    <p class="h4 text-center mb-4">Sign up</p>
    <div class="grey-text">
      <mdb-input label="Your name" v-model="name" icon="user" type="text" required/>
      <mdb-input label="Your email" v-model="email" icon="envelope" type="email" required/>
      <mdb-input label="Confirm your email" icon="exclamation-triangle" type="text" required/>
      <mdb-input label="Your password" v-model="password" icon="lock" type="password" required/>
    </div>
    <div class="text-center">
      <mdb-btn color="primary" type="submit">Register</mdb-btn>
    </div>
    {{msgFromServer}}
  </form>
  <!-- Material form register -->
</template>

<script>
import AuthServices from "../AuthServices";
import {
  mdbBtn,
  mdbInput
} from "mdbvue";

export default {
  name: "RegisterComponent",
  components: {
    mdbBtn,
    mdbInput
  },
  data() {
    return {
      register: false,
      name: "",
      email: "",
      password: "",
      msgFromServer: ""
    };
  },
  methods: {
    async registerApi(event) {
      event.preventDefault();
      alert(this.email + " " + this.name + " " +this.password);
      this.msgFromServer = await AuthServices.register(this.name, this.email, this.password);
    }
  },
};
</script>

<style>
form {
  max-width: 900px;
  margin: 0 auto;
  margin-top: 100px;
}
</style>

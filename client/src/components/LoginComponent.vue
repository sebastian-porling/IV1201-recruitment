<template>
  <!-- Material form login -->
  <mdb-container id="login">
      <form @submit="loginApi" method="post">
      <p class="h4 text-center mb-4">Sign in</p>
      <div class="grey-text">
      <mdb-input label="Your email" v-model="email" icon="envelope" type="email" name="email" required/>
      <mdb-input label="Your password" v-model="password" icon="lock" type="password" name="password" required/>
    </div>
    <div class="text-center">
      <mdb-btn color="primary" value="submit">Login</mdb-btn>
      <!--<mdb-btn v-on:click="register('bob','bla@mail.com','easypassword', $event)" color="primary">register</mdb-btn>-->
    </div>
    <span>Message: {{ msgFromServer }}</span>
    </form>
  </mdb-container>
  <!-- Material form login -->
</template>

<script>
import AuthServices from "../AuthServices";
import {
  mdbContainer,
  mdbBtn,
  mdbInput
} from "mdbvue";

export default {
  name: "LoginComponent",
  components: {
    mdbContainer,
    mdbBtn,
    mdbInput
  },
  data() {
    return {
      login: false,
      msgFromServer: "test",
      email: "",
      password: ""
    };
  },
  methods: {
    async loginApi(event) {
        event.preventDefault();
      this.msgFromServer = await AuthServices.login(this.email, this.password);
    }
  }
};
</script>

<style>
#login {
  max-width: 900px;
  margin: 0 auto;
  margin-top: 100px;
}
</style>
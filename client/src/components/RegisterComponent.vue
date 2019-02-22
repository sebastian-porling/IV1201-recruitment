<template>
  <!-- Material form register -->
  <form @submit="registerApi" method="post">
    <p class="h4 text-center mb-4">Sign up</p>
    <div class="grey-text">
      <mdb-input label="Your first name" v-model="name" icon="user" type="text" required/>
      <mdb-input label="Your surname" v-model="surname" icon="user" type="text" required/>
      <mdb-input label="Your social security number" v-model="ssn" icon="exclamation-triangle" type="text" required/>
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
import AuthServices from "../services/AuthServices";
import { mdbBtn, mdbInput } from "mdbvue";

export default {
  name: "RegisterComponent",
  components: {
    mdbBtn,
    mdbInput
  },
  /**
   * The data used for this component.
   */
  data() {
    return {
      register: false,
      name: "",
      surname: "",
      ssn: "",
      email: "",
      password: "",
      msgFromServer: ""
    };
  },
  methods: {
    /**
     * Will prevent default action by forms. And will register through authservices
     */
    async registerApi(event) {
      event.preventDefault();
      this.msgFromServer = await AuthServices.register(
        this.name,
        this.surname,
        this.ssn,
        this.email,
        this.password
      );
    }
  }
};
</script>

<style scoped>
/* Sets maximum width, centers and pushes it down */
form {
  max-width: 900px;
  margin: 0 auto;
  margin-top: 100px;
  padding: 10px;
}
</style>

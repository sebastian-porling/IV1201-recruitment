<template>
  <!-- Material form login -->
    <form @submit="loginApi" method="post">
      <p class="h4 text-center mb-4">Admin Sign in</p>
      <div class="grey-text">
        <mdb-input
          label="Your username"
          v-model="username"
          icon="envelope"
          type="username"
          name="username"
          required
        />
        <mdb-input
          label="Your password"
          v-model="password"
          icon="lock"
          type="password"
          name="password"
          required
        />
        <div class="text-center">
          <mdb-btn color="primary" value="submit">Login</mdb-btn>
        </div>
      </div>
      <span>Message: {{ messageFromServer }}</span>
    </form>
  <!-- Material form login -->
</template>

<script>
import AuthServices from "../services/AuthServices";
import { mdbBtn, mdbInput } from "mdbvue";
import { mapActions, mapState } from 'vuex'
export default {
  name: "AdminLoginComponent",
  components: {
    mdbBtn,
    mdbInput
  },
  /**
   * Data used in this component.
   */
  data() {
    return {
      messageFromServer: "test",
      username: "",
      password: ""
    };
  },
  methods: {
    /**
     * Will prevent default form action and use the authservice login.
     */
    ...mapActions([
      'login'
    ]),
    async loginApi(event) {
      event.preventDefault();
      await AuthServices.login(this.username, this.password).then((response) => {
        this.messageFromServer = response.message;
        this.login({name: response.data.name, token: null, role: response.data.role});
        this.$router.push('/user');
      })
      .catch((error) => {
        this.messageFromServer = error;
      });
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

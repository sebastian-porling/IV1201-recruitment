<template>
<div>
  <div class="spinner-grow" style="width: 10rem; height: 10rem;" role="status" v-bind:class="{'is-collapsed' : hidden }">
      <span class="sr-only">Loading...</span>
    </div>
    <!-- Material form login -->
    <form @submit="loginApi" method="post" v-bind:class="{'is-collapsed' : !hidden }">
      <p class="h4 text-center mb-4">Sign in</p>
      <div class="grey-text">
        <mdb-input
          label="Your email"
          v-model="email"
          icon="envelope"
          type="email"
          name="email"
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
</div>
  
</template>

<script>
import AuthServices from "../services/AuthServices";
import { mdbBtn, mdbInput } from "mdbvue";
import { mapActions } from 'vuex'
export default {
  name: "LoginComponent",
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
      email: "",
      password: "",
      hidden: true
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
      this.hidden = false;
      await AuthServices.login(this.email, this.password).then((response) => {
        this.hidden = true;
        this.messageFromServer = response.message;
        console.log(response);
        this.login({name: response.data.name, token: null, role: response.data.role});
        this.$router.push('/user');
      })
      .catch((error) => {
        this.hidden = true;
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
.spinner-grow{
	position: absolute;
	left: 45%;
	right: 40%;
	top: 40%;
	z-index: 2;
}
.is-collapsed{
	display: none;
}
</style>

<!-- A header template, it has the navigation -->
<template>
  <mdb-navbar expand="large" dark class="indigo">
    <!-- Navbar brand -->
    <mdb-navbar-toggler class="middle">
      <mdb-navbar-brand>Recruitment</mdb-navbar-brand>
      
      <mdb-navbar-nav>
        <mdb-nav-item to="/">Home</mdb-nav-item>
        <mdb-nav-item to="/user" v-if="loggedIn">{{this.user.name}}</mdb-nav-item>
        <mdb-nav-item to="/login" v-if="!loggedIn">Login</mdb-nav-item>
        <mdb-nav-item to="/register" v-if="!loggedIn">Register</mdb-nav-item>
      </mdb-navbar-nav>
      {{msgFromServer}}
      <mdb-btn v-on:click="logoutApi()" v-if="loggedIn">Logout</mdb-btn>
    </mdb-navbar-toggler>
  </mdb-navbar>
</template>

<script>
import AuthServices from "../services/AuthServices";
import {mapState, mapActions} from 'vuex'
import {
  mdbNavbar,
  mdbNavItem,
  mdbNavbarNav,
  mdbNavbarToggler,
  mdbNavbarBrand,
  mdbBtn
} from "mdbvue";

export default {
  name: "HeaderComponent",
  data() {
    /**
     * The data that can be changed in this module.
     */
    return {
      msgFromServer: ""
    };
  },
  computed: {
    ...mapState(['user']),
    loggedIn() {
      return this.user.name !== null;
    },
  },
  /**
   * Components needed for this module.
   */
  components: {
    mdbNavbar,
    mdbNavItem,
    mdbNavbarNav,
    mdbNavbarToggler,
    mdbNavbarBrand,
    mdbBtn
  },
  methods: {
    /**
     * Will change the variable msgFromServer when called.
     */
    ...mapActions({
      logout: 'logout'
    }),
    async logoutApi() {
      await AuthServices.logout().then((msg) => {
        this.msgFromServer = msg;
        this.logout();
        this.$router.push('/');
      });
    }
  }
};
</script>

<style scoped>
/* Sets width of the navbar */
#header {
  max-width: 900px;
  margin: 0 auto;
}
@media screen and (min-width: 992px) {
  .middle {
    display: block;
    min-width: 900px;
    margin-left: 50%;
    transform: translateX(-50%);
  }
}
</style>

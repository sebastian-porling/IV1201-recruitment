<!-- A header template, it has the navigation -->
<template>
  <mdb-navbar expand="large" dark class="indigo">
    <!-- Navbar brand -->
    <mdb-container>
    <mdb-navbar-toggler>
        <mdb-navbar-brand>Recruitment</mdb-navbar-brand>
      <mdb-navbar-nav>
        <mdb-nav-item to="/" active>Home</mdb-nav-item>
        <mdb-nav-item to="/login">Login</mdb-nav-item>
        <mdb-nav-item to="/register">Register</mdb-nav-item>
      </mdb-navbar-nav>
      {{msgFromServer}}
      <mdb-btn v-on:click="logoutApi()">Logout</mdb-btn>
    </mdb-navbar-toggler>
    </mdb-container>
  </mdb-navbar>
</template>

<script>
  import AuthServices from "../AuthServices";
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
        msgFromServer: "",
      };
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
        async logoutApi() {
        this.msgFromServer = await AuthServices.logout();
      }
    },
  };
</script>

<style>
  /* Sets width of the navbar */
  mdb-container{
      min-width: 900px;
      margin: 0 auto;
  }
</style>

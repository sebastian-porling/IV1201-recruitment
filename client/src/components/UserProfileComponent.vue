<!--  
This component is the user page. Here the user will be able to 
create, update applications. And update the user information.
-->
<template>
  <mdb-container>
    <div
      class="spinner-grow"
      style="width: 10rem; height: 10rem;"
      role="status"
      v-bind:class="{'is-collapsed' : hidden }"
    >
      <span class="sr-only">Loading...</span>
    </div>
    <h1> Welcome {{user.name}}!</h1>
    <mdb-btn color="warning" disabled>Edit profile</mdb-btn>
    <mdb-btn
      v-bind:class="{'is-collapsed' : applicationExists }"
      color="warning"
      @click.native="modal = true"
    >Create application</mdb-btn>
    <mdb-btn
      v-bind:class="{'is-collapsed' : !applicationExists }"
      color="warning"
      @click.native="modal = true"
    >Edit application</mdb-btn>
    <MakeApplicationComponent v-bind:class="{'is-collapsed' : !modal}" v-model="modal"/>
    </mdb-container>
</template>

<script>
import {
  mdbContainer,
  mdbBtn,
  
} from "mdbvue";
import MakeApplicationComponent from './MakeApplicationComponent.vue'
import { mapState, mapActions } from "vuex";
import ApplicationService from "../services/ApplicationService.js";
import { constants } from 'fs';
export default {
  name: "UserProfileComponent",
  components: {
    MakeApplicationComponent,
    mdbContainer,
    mdbBtn,
  },
  data() {
    return {
      application: null,
      applicationExists: false,
      hidden: false,
      modal: false,
      status: null
    };
  },
  computed: {
    ...mapState(["user"]),
    /**
		 *  @returns {Boolean} the state if the user is logged in or not.
		 */	
    loggedIn() {
      return this.user.name !== null;
    }
  },
  async created() {
    /**
		 *  Gets the application data of the logged in user.
     *  Will logout and redirect user if it is not authorized. (No or old token)
		 */	
    await ApplicationService.get()
      .then((data) => {
        this.hidden = true;
        if (data != undefined) {
          this.application = data;
          this.applicationExists = true;
          this.status = data.status;
        }
      })
      .catch(error => {
        console.log(error);
        this.logout();
        this.$router.push('/login');
      })
  },
  methods: {
    ...mapActions([
      'logout'
    ]),
  }
};
</script>

<style scoped>
.card img {
  width: 100%;
}
.spinner-grow {
  position: absolute;
  left: 45%;
  right: 40%;
  top: 40%;
  z-index: 2;
}
.is-collapsed {
  display: none;
}
</style>

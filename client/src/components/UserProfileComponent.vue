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
import { mapState } from "vuex";
import ApplicationService from "../services/ApplicationService.js";
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
    loggedIn() {
      return this.user.name !== null;
    }
  },
  async created() {
    await ApplicationService.get()
      .then(data => {
        this.hidden = true;
        if (data.status != null) {
          this.application = data;
          this.applicationExists = true;
          this.status = data.status;
        }
      })
      .catch(error => {
        return alert(error);
      });
  },
  methods: {
    
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

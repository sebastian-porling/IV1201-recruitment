<template>
  <mdb-container>
    <div class="spinner-grow" style="width: 10rem; height: 10rem;" role="status" v-bind:class="{'is-collapsed' : hidden }">
      <span class="sr-only">Loading...</span>
    </div>
    <h1>Welcome {{user.name}}!</h1>
    <mdb-card v-bind:class="{'is-collapsed' : !applicationExists }">
      <mdb-card-image
        src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%282%29.jpg"
        alt="Card image cap"
        waves
      ></mdb-card-image>
      <mdb-card-body>
        <mdb-card-title>Card with waves effect</mdb-card-title>
        <mdb-card-text>Some quick example text to build on the card title and make up the bulk of the card's content.</mdb-card-text>
        <mdb-btn color="primary">Button</mdb-btn>
      </mdb-card-body>
    </mdb-card>
    {{application}}
  </mdb-container>
</template>

<script>
import {
  mdbContainer,
  mdbCard,
  mdbCardBody,
  mdbCardText,
  mdbBtn,
	mdbCardImage,
	mdbCardTitle
} from "mdbvue";
import { mapState } from "vuex";
import ApplicationService from "../services/ApplicationService.js";
export default {
  name: "UserProfileComponent",
  components: {
    mdbContainer,
    mdbCard,
    mdbCardBody,
    mdbCardText,
    mdbBtn,
		mdbCardImage,
		mdbCardTitle
  },
  data() {
    return {
      application: null,
			applicationExists: false,
			hidden: false
    };
  },
  computed: {
    ...mapState(["user"]),
    loggedIn() {
      return this.user.name !== null;
    }
  },
  async created() {
    await ApplicationService.getUserApplication()
      .then(data => {
				this.hidden = true;
        if (data.length != 0) {
          this.application = data;
          this.applicationExists = true;
        }
      })
      .catch(error => {
        return alert(error);
      });
  },
  methods: {
    async test3() {}
  }
};
</script>

<style scoped>
.card img {
  width: 100%;
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

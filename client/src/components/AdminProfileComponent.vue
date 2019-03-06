<template>
   <mdbContainer>
    <!-- <mdb-tbl btn responsive striped>
      <mdb-tbl-head>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Username</th>
        </tr>
      </mdb-tbl-head>

      <mdb-tbl-body>
        <tr>
          <div>
            <span>
              Hello
              </span>
              <span>
              Hello
              </span>
              <span>
              Hello
              </span>
              <span>
              Hello
              </span>
              <span>
              Hello
              </span>
              <span>
              Hello
              </span>
            
          </div>
        </tr>
        <tr>
          <th scope="row">2</th>
          <td>Jacob</td>
          <td>
            <button type="button" class="btn btn-indigo btn-sm m-0">Button</button>
          </td>
          <td>@fat</td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td>Larry</td>
          <td>the Bird</td>
          <td>
            <button type="button" class="btn btn-indigo btn-sm m-0">Button</button>
          </td>
        </tr>
      </mdb-tbl-body>
    </mdb-tbl> -->
    <!-- <span>Application: {{ application }}</span> -->

   <div v-for="app in application" v-bind:value="app" v-bind:key="app._id">

    
    <div>
      <div>id: {{app._id}} </div>
      <span> Name: {{app.name}},  </span>
      <span> Surname: {{app.surname}} </span>
       <div>Availabilities </div>
      <div v-for="date in app.availability" v-bind:value="date" v-bind:key="date.from">  
        <div> From: {{date.from_date}} </div>
        <div> To: {{date.to_date}} </div>
      </div>
      <div> Competences </div>
      <div v-for="competence in app.competences" v-bind:value="competence" v-bind:key="competence.competence">  
        <div> Competence: {{competence.competence}} </div>
        <div> Years of experience: {{competence.years_of_experience}} </div>
      </div>
      <div>Status: {{app.status}} </div>
    </div>
     <div v-if="app.status !=='rejected' && app.status !=='approved'">
        <mdb-btn color="success">Success</mdb-btn>
        <mdb-btn color="danger">Danger</mdb-btn>
      </div>
      <div v-else>
        <mdb-btn class=grayed-out-button >Success</mdb-btn>
        <mdb-btn class=grayed-out-button >Danger</mdb-btn>
</div>

   
   
  </div>
  <!-- <mdb-accordion :panes="panes"/> -->
  </mdbContainer>

    

    
</template>

<script>
import {
 mdbContainer,
 mdbBtn
  
} from "mdbvue";
//import MakeApplicationComponent from './MakeApplicationComponent.vue'
//import { mapState } from "vuex";
import ApplicationService from "../services/ApplicationService.js";
export default {
  name: "AdminProfileComponent",
  components: {
    //MakeApplicationComponent,
    mdbContainer,
    mdbBtn,
  },
  data() {
    return {
      panes: null,
      application: null,
      applicationExists: false,
      hidden: false,
      modal: false,
      status: null,
      items: [
      { message: 'Foo' },
      { message: 'Bar' }
    ]
    };
  },
  // computed: {
  //   ...mapState(["user"]),
  //   loggedIn() {
  //     return this.user.name !== null;
  //   }
  // },
  async created() {
    await ApplicationService.getAll()
      .then(data => {
        this.application = data; 
        //this.application = 'blabla'
    //    data.map(value => 
    //  this.panes.push({title: 'title', content: value})
      })
      .catch(error => {
        return alert(error);
      });
  }
  ,
  methods: {
    
  }
};
</script>

<style scoped>
.grayed-out-button{
  color: rgba(211, 211, 211, 0.76)
}

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


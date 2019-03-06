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
    <span>Application: {{ application }}</span>
   <li v-for="app in application" v-bind:value="app" v-bind:key="app._id">

    <div>
      
      {{ app}}
    </div>
  </li>
  <!-- <mdb-accordion :panes="panes"/> -->
  </mdbContainer>

    

    
</template>

<script>
import {
 mdbTbl, 
 mdbTblHead, 
 mdbTblBody,
 mdbContainer,
 mdbBtn,
  mdbAccordion
  
} from "mdbvue";
import MakeApplicationComponent from './MakeApplicationComponent.vue'
import { mapState } from "vuex";
import ApplicationService from "../services/ApplicationService.js";
export default {
  name: "AdminProfileComponent",
  components: {
    MakeApplicationComponent,
    mdbContainer,
    mdbBtn,
    mdbTbl,
    mdbTblHead, 
    mdbTblBody,
     mdbAccordion
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


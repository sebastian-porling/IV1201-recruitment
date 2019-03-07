<!-- Represents the Recruiters view here the recruiter can see the applications and approve or reject them  -->
<template>
   <mdbContainer>
    <div class = "title-container d-flex justify-content-center"><font class="title" size="8">Applications</font> </div>
   <!-- Generate elements for each application -->
   <div v-for="app in application" v-bind:value="app" v-bind:key="app._id">
  <div class=" d-flex justify-content-center">
    <div class="application-container">
    <div dark class="indigo application ">
      <div> id: {{app._id}} </div>
      <span> Name: {{app.name}},  </span>
      <span> Surname: {{app.surname}} </span>
       <div>Availabilities </div>
      <div v-for="date in app.availability" v-bind:value="date" v-bind:key="date.from">  
        <div> From: {{date.from_date}}  </div>
        <div> To: {{date.to_date}} </div>
      </div>
      <div> Competences </div>
      <div v-for="competence in app.competences" v-bind:value="competence" v-bind:key="competence.competence">  
        <div> Competence: {{competence.competence}} </div>
        <div> Years of experience: {{competence.years_of_experience}} </div>
      </div>
      <div>Status: {{app.status}} </div>
      <div>Last edited: {{app.timestamp}} </div>
    </div>
     <div class="button-container d-flex justify-content-center" v-if="app.status ==='unhandled'">
        <mdb-btn @click="accept(app._id, app.timestamp)" color="success">Accept</mdb-btn>
        <mdb-btn @click="reject(app._id, app.timestamp)" color="danger">Reject</mdb-btn>
      </div>
      <div class="button-container d-flex justify-content-center" v-if="app.status !=='unhandled'">
        <mdb-btn  color="blue-grey" >Accept</mdb-btn>
        <mdb-btn  color="blue-grey" >Reject</mdb-btn>
      </div>
     </div>
    </div>
   
  </div>
  </mdbContainer>

    

    
</template>

<script>
import {
 mdbContainer,
 mdbBtn
  
} from "mdbvue";
import ApplicationService from "../services/ApplicationService.js";
export default {
  name: "AdminProfileComponent",
  components: {
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
  async created() {
    await this.getAll();
  },
 
  methods: {
    /** Reject an unhandled application  
     * @param id The id of the user whos applcation is to be rejected
     * @param timestamp The application timestamp used to ensure that the admin has the latest version of the application 
    */
    reject: async function(id, timestamp){
      try{
        await ApplicationService.reject(id, timestamp);
        await this.getAll();
      }
      catch(error){
        return alert(error);
      }

    },
    /** Accept an unhandled application
     * @param id The id of the user whos applcation is to be rejected
     * @param timestamp The application timestamp used to ensure that the admin has the latest version of the application 
      */
    accept: async function (id, timestamp){
      try{
        await ApplicationService.accept(id, timestamp);
        await this.getAll();
      }
      catch(error){
        return alert(error);
      }

    },
    /** Retrieve all applications on the server */
    getAll: async function (){
          await ApplicationService.getAll().then(data => {
          this.application = data; 
        })
        .catch(error => {
          return alert(error);
        });
    }
    
  }
};
</script>

<style scoped>

.title{
  color:navy;
}


.application-container{
  width: 50%;
}

.application{
 text-align: center;
}

.application>div,span{
 color: white;
 width: 100%
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


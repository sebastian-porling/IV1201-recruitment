<!--	
This component takes care of the application for the user. 
Here can the user create and modify the application. 
-->
<template>
	<div>
		<mdb-modal @close="toggleModal(!show)">
      <mdb-modal-header>
        <mdb-modal-title>Application</mdb-modal-title>
      </mdb-modal-header>
      <mdb-modal-body>
				<div>
			<p>When are you availabible?</p>
			<mdb-row v-for="(availability, index) in availabilities" v-bind:key="index">
				<hr>
				<mdb-col col="sm">
					<label for="">From</label>
					<mdb-input type="date" value="availability.from_date" v-model="availability.from_date"/>
				</mdb-col>
				<mdb-col col="sm">
					<label for="">To</label>
					<mdb-input type="date" value="avalibility.to_date" v-model="availability.to_date"/>
				</mdb-col>
				<mdb-btn @click="deleteAvailability(index)" color="danger" class="delete">X</mdb-btn>
			</mdb-row>
			<hr>
			<mdb-row>
				<hr>
				<mdb-col col="sm">
					<label for="">From</label>
					<mdb-input type="date" value="formFromDate" v-model="formFromDate"/>
				</mdb-col>
				<mdb-col col="sm">
					<label for="">To</label>
					<mdb-input type="date" value="formToDate" v-model="formToDate"/>
				</mdb-col>
				<mdb-btn color="success" class="add" @click="addAvailability()">+</mdb-btn>
			</mdb-row>
			<span class="error">{{availabilityError}}</span>
		</div>
		
		<p>What competences do you have?</p>
		<div v-for="(competence, index) in competences" v-bind:key="competence.competence">
			<hr>
			<mdb-row>
				<mdb-col col="sm">
					<br>
					<select class="browser-default custom-select" v-model="competence.competence" value="competence.name">
						<option v-for="option in options" v-bind:value="option.value" v-bind:key="option.value">
							{{ option.text }}
						</option>
					</select>
				</mdb-col>
				<mdb-col col="sm">
					<mdb-input label="Years of experince" v-model="competence.years_of_experience"/>
				</mdb-col>
        <mdb-btn @click="deleteCompetence(index)" color="danger" class="delete">X</mdb-btn>
			</mdb-row>
		</div>
		<hr>
		<mdb-row>
				<mdb-col col="sm">
					<br>
					<select class="browser-default custom-select" v-model="formCompetence">
						<option v-for="option in options" v-bind:value="option.value" v-bind:key="option.value" >
							{{ option.text }}
						</option>
					</select>
				</mdb-col>
				<mdb-col col="sm">
					<mdb-input label="Years of experince" v-model="formYears" input type="number" step="0.1"/>
				</mdb-col>
				<mdb-btn color="success" class="add" @click="addCompetence()">+</mdb-btn>
			</mdb-row>
			<span class="error">{{competenceError}}</span>
			</mdb-modal-body>
			<span class="error">{{applicationError}}</span>
				<span class="success">{{applicationSuccess}}</span>
      <mdb-modal-footer>
        <mdb-btn color="secondary" @click.native="toggleModal(!show)">Close</mdb-btn>
        <mdb-btn color="primary" @click="createApplication()">Save changes</mdb-btn>
      </mdb-modal-footer>
    </mdb-modal>
	</div>
</template>

<script>
import ApplicationService from "../services/ApplicationService.js";
import { mapActions } from "vuex";
import {
	mdbInput,
	mdbModal,
  mdbModalTitle,
  mdbModalHeader,
  mdbModalBody,
	mdbModalFooter,
	mdbBtn,
	mdbRow,
	mdbCol
	} from "mdbvue";
/**
 * 	Checks if the from date is before the to date.
 *  @returns {Boolean} 
 */	
function validateAvailability(from, to){
	return from < to;
}
/**
 *  Checks if the years are within the limits
 * 	and if competence is not null.
 *  @returns {Boolean} 
 */	
function validateCompetence(competence, years){
	if(competence == null || years == null){
		return false;
	}
	if(years > 100 || years < 1){
		return false;
	}
	return true;
}
export default {
	name: "MakeApplicationComponent",
	components: {
		mdbInput,
		mdbModal,
    mdbModalTitle,
    mdbModalHeader,
    mdbModalBody,
		mdbModalFooter,
		mdbBtn,
		mdbRow,
		mdbCol
  },
  props: ['value'],
	data() {
		return {
			competences: [],
			availabilities: [],
      options: [],
			show: true,
			application: [],
			formYears: null,
			formCompetence: null,
			formFromDate: null,
			formToDate: null,
			availabilityError: null,
			competenceError: null,
			applicationError: null,
			applicationSuccess: null
		}
	},
	methods: {
		...mapActions([
      'logout'
		]),
		/**
		 *  Will create/update application.
		 * 	Will show a message if the application was a success or failure.
		 */	
		async createApplication(){
			await ApplicationService.create(this.competences, this.availabilities).then((data) => {
				console.log("success");
				this.applicationSuccess = "Successfully added application";
				setTimeout(()=>{ this.applicationSuccess = null; }, 2000);
			}).catch((error) => {
				this.applicationError = error.response.data.error;
				setTimeout(()=>{ this.applicationError = null; }, 2000);
				console.log("error", error.response.data.error);
			});
		},
		/**
		 * 	Deletes the given index from availability array.
		 *  @param {Integer} index 
		 */	
		deleteAvailability(index){
			this.availabilities.splice(index,1)
		},
		/**
		 *  Deletes the given index from competence array.
		 *  @param {Integer} index 
		 */	
    deleteCompetence(index){
			this.competences.splice(index,1)
		},
		/**
		 * 	Adds competence to array.
		 * 	Will show error if the competence/years is invalid
		 */	
		addCompetence(){
			if(validateCompetence(this.formCompetence, this.formYears)){
				this.competences.push({competence: this.formCompetence, years_of_experience: parseInt(this.formYears)});
				this.formCompetence = null;
				this.formYears = null;
			}else{
				this.competenceError = "Invalid competence or years of experience";
				setTimeout(()=>{ this.competenceError = null; }, 2000);
			}
			
		},
		/**
		 *  Adds availability to arrray.
		 * 	Will show error if the dates are invalid.
		 */	
		addAvailability(){
			if(validateAvailability(this.formFromDate, this.formToDate)){
				this.availabilities.push({from_date: this.formFromDate, to_date: this.formToDate});
				this.formFromDate = null;
				this.formToDate = null;
			}else{
				this.availabilityError = "Invalid dates on availability";
				setTimeout(()=>{ this.availabilityError = null; }, 2000);
			}
		},
		/**
		 *  Will toggle the modal box.
		 */	
    toggleModal(value){
      this.$emit('input', value);
		},
		
	},
	computed: {
		
	},
	async created(){
		/**
		 *  Will get the competences.
		 */	
		await ApplicationService.getCompetences().then(data => {
      data.forEach(element => {
        this.options.push({text: element.sv, value: element.sv});
      });
		});
		/**
		 * Will get the application data of the logged in user.
		 */
		await ApplicationService.get()
      .then(data => {
        if (data.length != 0) {
					this.application = data;
					this.competences = data.competences;
					this.availabilities = data.availability;
				}
      })
      .catch(error => {
				console.log(error.response);
      });
	}
}
</script>

<style scoped>
	.delete{
		width: 30px;
		height: 30px;
		text-align: center;
		padding: 0px;
	}
	.add{
		width: 30px;
		height: 30px;
		text-align: center;
		padding: 0px;
	}
	.error{
		text-align: center;
		color: red;
	}
	.success{
		text-align: center;
		color: green;
	}
</style>

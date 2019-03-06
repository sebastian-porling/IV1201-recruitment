<template>
	<div>
		<mdb-modal @close="toggleModal(!show)">
      <mdb-modal-header>
        <mdb-modal-title>Create application</mdb-modal-title>
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
			</mdb-modal-body>
      <mdb-modal-footer>
        <mdb-btn color="secondary" @click.native="toggleModal(!show)">Close</mdb-btn>
        <mdb-btn color="primary" @click="createApplication()">Save changes</mdb-btn>
      </mdb-modal-footer>
    </mdb-modal>
	</div>
</template>

<script>
import ApplicationService from "../services/ApplicationService.js"
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
			formToDate: null
		}
	},
	methods: {
		async createApplication(){
			await ApplicationService.create(this.competences, this.availabilities).then((data) => {
				//console.log("success");
				data 
			}).catch((error) => {
				error
				//console.log("error");
			});
		},
		deleteAvailability(index){
			this.availabilities.splice(index,1)
    },
    deleteCompetence(index){
			this.competences.splice(index,1)
		},
		addCompetence(){
			this.competences.push({competence: this.formCompetence, years_of_experience: parseInt(this.formYears)});
			this.formCompetence = null;
			this.formYears = null;
		},
		addAvailability(){
			this.availabilities.push({from_date: this.formFromDate, to_date: this.formToDate});
			this.formFromDate = null;
			this.formToDate = null;
		},
    toggleModal(value){
      this.$emit('input', value);
    }
	},
	computed: {
		
	},
	async created(){
		await ApplicationService.getCompetences().then(data => {
      data.forEach(element => {
        this.options.push({text: element.sv, value: element.sv});
      });
		});
		await ApplicationService.get()
      .then(data => {
        if (data.length != 0) {
					this.application = data;
					this.competences = data.competences;
					this.availabilities = data.availability;
				}
      })
      .catch(error => {
        return alert(error);
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
</style>

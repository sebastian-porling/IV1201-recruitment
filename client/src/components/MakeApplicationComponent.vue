<template>
	<div>
		<mdb-modal>
      <mdb-modal-header>
        <mdb-modal-title>Create application</mdb-modal-title>
      </mdb-modal-header>
      <mdb-modal-body>
				<div>
			<p>When are you availabible?</p>
			<mdb-row v-for="(availability, index) in availabilities" v-bind:key="index">
				<mdb-col col="sm">
					<label for="">From</label>
					<mdb-input type="date" value="availability.from" v-model="availability.from"/>
				</mdb-col>
				<mdb-col col="sm">
					<label for="">To</label>
					<mdb-input type="date" value="avalibility.from" v-model="availability.to"/>
				</mdb-col>
				<mdb-btn @click="deleteAvailability(index)" color="danger">X</mdb-btn>
			</mdb-row>
		</div>
		<mdb-btn color="success">+</mdb-btn>
		<p>What competences do you have?</p>
		<div v-for="(competence, index) in competences" v-bind:key="competence.name">
			<mdb-row>
				<mdb-col col="sm">
					<br>
					<select class="browser-default custom-select" v-model="competence.name" value="competence.name">
						<option v-for="option in options" v-bind:value="option.value" v-bind:key="option.value">
							{{ option.text }}
						</option>
					</select>
				</mdb-col>
				<mdb-col col="sm">
					<mdb-input label="Years of experince" v-model="competence.years_of_experience"/>
				</mdb-col>
        <mdb-btn @click="deleteCompetence(index)" color="danger">X</mdb-btn>
			</mdb-row>
		</div>
		<mdb-btn color="success">+</mdb-btn>
			</mdb-modal-body>
      <mdb-modal-footer>
        <mdb-btn color="secondary" @click.native="toggleModal(!show)">Close</mdb-btn>
        <mdb-btn color="primary">Save changes</mdb-btn>
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
			competences: [{name: "Korvgrillning", years_of_experience: 1.2}],
			availabilities: [{from: "2018-12-12", to: "2017-11-22"}],
      options: [],
      show: true
		}
	},
	methods: {
		async createApplication(){
			
		},
		deleteAvailability(index){
			this.availabilities.splice(index,1)
    },
    deleteCompetence(index){
			this.competences.splice(index,1)
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
	}
}
</script>

<style scoped>

</style>

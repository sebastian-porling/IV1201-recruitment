<template>
	<mdb-container>
		{{user.name}}
		{{application}}
	</mdb-container>
</template>

<script>
import { mdbContainer, } from "mdbvue";
import { mapState } from 'vuex';
import ApplicationService from '../services/ApplicationService.js';
export default {
	name: "UserProfileComponent",
	components: {
		mdbContainer,
	},
	data() {
		return {
			application: null,
			applicationExists: false
		}
	},
	computed: {
		...mapState(['user']),
    loggedIn() {
      return this.user.name !== null;
		},
	},
	async created(){
		await ApplicationService.getUserApplication()
			.then((data) => {
				if(data.length != 0){
					this.application = data;
					this.applicationExists = true
				}
			})
			.catch((error) => {
				return alert(error);
			});
	},
	methods: {
		async test3() {
			
		}
	},
}
</script>

<style scoped>

</style>

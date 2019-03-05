import axios from 'axios';
const url = 'api/applications';

/**
 * Class used for handling applications
 */
class ApplicationService{

	/**
	 * 
	 * @param {*} id 
	 */
	static async get(id = null){
		try {
			let res;
			if (id != null) {
				res = await axios.get(url + '/:id', {
					params: {
						id: id
					}
				});
			} else {
				res =  await axios.get(url);
			}
			return res.data[0];
		} catch (error) {
			throw error;
		}
	}

	/**
	 * 
	 */
	static async getAll(){
		try {
			let res = await axios.get(url + '/all');
			return res.data;
		} catch (error) {
			throw error;
		}
	}

	/**
	 * 
	 * @param {*} id 
	 */
	static async reject(id){
		try {
			let result = await axios.put(url + '/reject/'+ id);
			return result;
		} catch (error) {
			throw error;
		}
	}

	/**
	 * 
	 * @param {*} id 
	 */
	static async accept(id){
		try {
			let result = await axios.put(url + '/accept/' + id);
			return result;
		} catch (error) {
			throw error;
		}
	}

	/**
	 * 
	 * @param {*} competences 
	 * @param {*} availability 
	 */
	static async create(competences, availability){
		try {
			let result = await axios.post(url + '/', {
				competences: competences,
				availability: availability
			});
			return result;
		} catch (error) {
			throw error;
		}
	}

	/**
	 * 
	 * @param {*} competences 
	 * @param {*} availability 
	 */
	static async update(competences, availability){
		try {
			let result = await axios.put(url + '/', {
				competences: competences,
				availability: availability
			});
			return result;
		} catch (error) {
			throw error;
		}
	}

	/**
	 * 
	 * @param {*} id 
	 */
	static async delete(id){
		try {
			let result = await axios.put(url + '/delete/' + id);
			return result;
		} catch (error) {
			throw error;
		}
	}

	/**
	 * 
	 */
	static async getCompetences(){
		try{
			let result = await axios.get("api" + "/competences");
			return result.data;
		}catch (error){
			throw error;
		}
	}
}

export default ApplicationService;

import axios from 'axios';
const url = 'api/applications';

/**
 * Class used for handling applications
 */
class ApplicationService{

	/**
	 * Gets the logged in users application if id is not given.
	 * Gets the application of the given id.
	 * @param {Hex} id 
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
	 * Gets all the applications.
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
	 * Rejects the given application
	 * @param {Hex} id 
	 */
	static async reject(id, timestamp){
		try {
			let result = await axios.put(url + '/reject/'+ id+'/'+timestamp);
			return result;
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Accepts the given application
	 * @param {Hex} id 
	 */
	static async accept(id, timestamp){
		try {
			let result = await axios.put(url + '/accept/' + id+ '/'+timestamp);
			return result;
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Creates an application.
	 * @param {String, Integer} competences 
	 * @param {Date, Date} availability 
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
	 * Updates an application.
	 * @param {String, Integer} competences 
	 * @param {Date, Date} availability 
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
	 * Deletes an application with the given id.
	 * @param {Hex} id 
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
	 * Get all the competences.
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

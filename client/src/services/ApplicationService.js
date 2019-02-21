import axios from 'axios';
const url = 'api/applications';

/**
 * Class used for handling applications
 */
class ApplicationService{
	static async getUserApplication(id = null){
		try {
			let res;
			if (id != null) {
				res = await axios.get(url + '/:id', {
					params: {
						id: id
					}
				});
			} else {
				res =  await axios.get(url + '/');
			}
			return res.data;
		} catch (error) {
			throw error;
		}
	}
}

export default ApplicationService

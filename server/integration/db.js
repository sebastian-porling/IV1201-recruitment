const mongodb = require('mongodb');
const retry = require('../utility/Retry')
const MAX_RETRIES = 5; 
const MONGO_NETWORK_ERROR = 'MongoNetworkError'
const ERROR_MESSAGE = 'failed to connect to server'
/**
 * Loads the user collection
 * @returns the collection
 */
exports.loadUsersCollection = async function loadUsersCollection() {
    const fn = async function(){       
        const client = await mongodb.MongoClient.connect(' mongodb://IV1201:IV1201@ds119993.mlab.com:19993/recruitment', {
            useNewUrlParser: true
        });
       return client.db('recruitment').collection('recruitment');
    }
    return await retry(fn, MAX_RETRIES, MONGO_NETWORK_ERROR, ERROR_MESSAGE);
  

}


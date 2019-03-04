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
  const fn = async function () {
    const client = await mongodb.MongoClient.connect(' mongodb://IV1201:IV1201@recruitment-shard-00-00-gxbqo.mongodb.net:27017,recruitment-shard-00-01-gxbqo.mongodb.net:27017,recruitment-shard-00-02-gxbqo.mongodb.net:27017/test?ssl=true&replicaSet=recruitment-shard-0&authSource=admin&retryWrites=true', {
      useNewUrlParser: true,
      replicaSet: 'recruitment-shard-0' ,
      readConcern: { level: "majority" }
    });
    return client.db('recruitment').collection('recruitment');
  }
  return await retry(fn, MAX_RETRIES, MONGO_NETWORK_ERROR, ERROR_MESSAGE);
}

exports.startSession = async function startSession(){
  const fn = async function () {
    const client = await mongodb.MongoClient.connect(' mongodb://IV1201:IV1201@recruitment-shard-00-00-gxbqo.mongodb.net:27017,recruitment-shard-00-01-gxbqo.mongodb.net:27017,recruitment-shard-00-02-gxbqo.mongodb.net:27017/test?ssl=true&replicaSet=recruitment-shard-0&authSource=admin&retryWrites=true', {
      useNewUrlParser: true,
      replicaSet: 'recruitment-shard-0' ,
      readConcern: { level: "majority" }
    });
    return client.startSession({ readPreference: { mode: "primary" } });
  }
  return await retry(fn, MAX_RETRIES, MONGO_NETWORK_ERROR, ERROR_MESSAGE);


}

exports.getClient = async function getClient(){
  const fn = async function () {
    const client = await mongodb.MongoClient.connect(' mongodb://IV1201:IV1201@recruitment-shard-00-00-gxbqo.mongodb.net:27017,recruitment-shard-00-01-gxbqo.mongodb.net:27017,recruitment-shard-00-02-gxbqo.mongodb.net:27017/test?ssl=true&replicaSet=recruitment-shard-0&authSource=admin&retryWrites=true', {
      useNewUrlParser: true,
      replicaSet: 'recruitment-shard-0' ,
      readConcern: { level: "majority" }
    });
    return client;

  }
  return await retry(fn, MAX_RETRIES, MONGO_NETWORK_ERROR, ERROR_MESSAGE);


}



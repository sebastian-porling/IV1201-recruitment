/** Module responsible for connecting to the database making it available for use. 
 * @module db
 */
/*const mongodb = require('mongodb');
const retry = require('../utility/Retry')
const MAX_RETRIES = 5;
const MONGO_NETWORK_ERROR = 'MongoNetworkError'
const ERROR_MESSAGE = 'failed to connect to server'
/**
 * Loads the user collection
 * @returns the collection
 */

/*exports.loadUsersCollection = async function loadUsersCollection() {
  //const fn = async function () {
     const client = await mongodb.MongoClient.connect(' mongodb://IV1201:IV1201@recruitment-shard-00-00-gxbqo.mongodb.net:27017,recruitment-shard-00-01-gxbqo.mongodb.net:27017,recruitment-shard-00-02-gxbqo.mongodb.net:27017/test?ssl=true&replicaSet=recruitment-shard-0&authSource=admin&retryWrites=true', {
      useNewUrlParser: true,
      replicaSet: 'recruitment-shard-0' ,
      readConcern: { level: "majority" }
    });
    return client.db('recruitment').collection('recruitment');
  //}
  //return await retry(fn, MAX_RETRIES, MONGO_NETWORK_ERROR, ERROR_MESSAGE);
}

/**
 * Loads the competences collection
 * @returns the collection
 */
/*exports.loadCompetenceCollection = async function loadCompetenceCollection() {
  //const fn = async function () {
    client = await mongodb.MongoClient.connect(' mongodb://IV1201:IV1201@recruitment-shard-00-00-gxbqo.mongodb.net:27017,recruitment-shard-00-01-gxbqo.mongodb.net:27017,recruitment-shard-00-02-gxbqo.mongodb.net:27017/test?ssl=true&replicaSet=recruitment-shard-0&authSource=admin&retryWrites=true', {
      useNewUrlParser: true,
      replicaSet: 'recruitment-shard-0' ,
      readConcern: { level: "majority" }
    });
    return client.db('recruitment').collection('competences');
  //}
  //return await retry(fn, MAX_RETRIES, MONGO_NETWORK_ERROR, ERROR_MESSAGE);
}

exports.startSession = async function startSession(){
  const fn = async function () {
    client = await mongodb.MongoClient.connect(' mongodb://IV1201:IV1201@recruitment-shard-00-00-gxbqo.mongodb.net:27017,recruitment-shard-00-01-gxbqo.mongodb.net:27017,recruitment-shard-00-02-gxbqo.mongodb.net:27017/test?ssl=true&replicaSet=recruitment-shard-0&authSource=admin&retryWrites=true', {
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
    client = await mongodb.MongoClient.connect(' mongodb://IV1201:IV1201@recruitment-shard-00-00-gxbqo.mongodb.net:27017,recruitment-shard-00-01-gxbqo.mongodb.net:27017,recruitment-shard-00-02-gxbqo.mongodb.net:27017/test?ssl=true&replicaSet=recruitment-shard-0&authSource=admin&retryWrites=true', {
      useNewUrlParser: true,
      replicaSet: 'recruitment-shard-0' ,
      readConcern: { level: "majority" }
    });
    return client;

  }
  return await retry(fn, MAX_RETRIES, MONGO_NETWORK_ERROR, ERROR_MESSAGE);
}

process.on('SIGINT', () => {
  dbClient.close();
  process.exit();
});

/* Mongo.js*/

var MongoClient = require('mongodb').MongoClient;
var url = process.env.MONGOLAB_URI || "mongodb://IV1201:IV1201@recruitment-shard-00-00-gxbqo.mongodb.net:27017,recruitment-shard-00-01-gxbqo.mongodb.net:27017,recruitment-shard-00-02-gxbqo.mongodb.net:27017/test?ssl=true&replicaSet=recruitment-shard-0&authSource=admin&retryWrites=true"; 
console.log(url);
var assert = require('assert');

var connection=[];
// Create the database connection
establishConnection = function(callback){
  MongoClient.connect(url, {useNewUrlParser: true,
    replicaSet: process.env.REPLICA_SET || 'recruitment-shard-0' ,
    readConcern: { level: "majority" }, poolSize: 10 },function(err, db) {
    assert.equal(null, err);
      connection = db
        if(typeof callback === 'function' && callback())
          callback(connection)
        }
)}

function getconnection(){
    return connection
}
module.exports = {
    establishConnection:establishConnection,
    getconnection:getconnection
}

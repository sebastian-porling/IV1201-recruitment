/** Module responsible for connecting to the database making it available for use. 
 * @module db
 */
const mongodb = require('mongodb');
var client;

/**
 * Initializes the database client 
 */
exports.init  = async function init(){
 const url = process.env.MONGOLAB_URI ||' mongodb://IV1201:IV1201@recruitment-shard-00-00-gxbqo.mongodb.net:27017,recruitment-shard-00-01-gxbqo.mongodb.net:27017,recruitment-shard-00-02-gxbqo.mongodb.net:27017/test?ssl=true&replicaSet=recruitment-shard-0&authSource=admin&retryWrites=true';
  client = await mongodb.MongoClient.connect(url , {
    useNewUrlParser: true,
    replicaSet: process.env.REPLICA_SET ||'recruitment-shard-0' ,
    readConcern: { level: "majority" }
  });
  return client; 
}
/**
 * Loads the recruitment database
 * @returns The recruitment database
 */
exports.loadDatabase = async function loadDatabase(){
  return client.db('recruitment')
}

/**
 * Loads the user collection
 * @returns the collection
 */

exports.loadUsersCollection = async function loadUsersCollection() {
    return client.db('recruitment').collection('recruitment');
}

/**
 * Loads the competences collection
 * @returns the collection
 */
exports.loadCompetenceCollection = async function loadCompetenceCollection() {
    return client.db('recruitment').collection('competences');
}

/**
 * Returns a new database session
 * @returns the started session
 */
exports.startSession = async function startSession(){
    return client.startSession({ readPreference: { mode: "primary" } });
}

/**
 * Returns the database client
 * @returns the database client 
 */
exports.getClient = async function getClient(){
    return client;
}



const MongoClient = require('mongodb').MongoClient;
const dbUrl =  process.env.MONGOLAB_URI || 'mongodb://localhost:27017';
const client = new MongoClient(dbUrl);

//var connection = client.connect();
module.exports = client.connect();

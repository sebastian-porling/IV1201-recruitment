const MongoClient = require('mongodb').MongoClient;
const dbUrl =  process.env.MONGOLAB_URI || 'mongodb://IV1201:IV1201@ds119993.mlab.com:19993/recruitment';
const client = new MongoClient(dbUrl, {useNewUrlParser: true});
module.exports = client.connect();

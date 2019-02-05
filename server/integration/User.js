var mongoConnection = require('../util/mongodb/mongodbConnection');
const assert = require('assert');

module.exports = new Promise(function(resolve, reject){
  mongoConnection.then((client, err) => {
    assert.equal(null, err);
    console.log("Connected successfully to mongodb");
    dbName = 'posts'
    const db = client.db(dbName);
    resolve(db.collection('users'));
  });
});


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
  //reject("")
});


// var mongoose = require('mongoose');  
// mongoose.Promise = global.Promise;

// mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost:27017/posts');
// var db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error"));
// db.once("open", function(callback){
//   console.log("Connection Succeeded");
// });

// var UserSchema = new mongoose.Schema({  
//   name: String,
//   email: String,
//   password: String,
//   role: String
// });

// mongoose.model('User', UserSchema);

// module.exports = mongoose.model('User');
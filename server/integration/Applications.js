const db = require('./db');
var ObjectId = require('mongodb').ObjectID;
const validateApp = require('../model/ValidateApplications');
const Err = require('../utility/ErrorEnums');
const mongodb = require('mongodb');
/** Module that acts as an interface to the database allowing different queries related to users in the database. 
 * @module Applications
 */

exports.findApplicationWithId = async function findApplicationWithId(id) {
  const validatedId = validateApp.validateId(id);
  const applications = await db.loadUsersCollection();
  return await applications.find({ _id: new ObjectId(validatedId) }, { projection: { role: 0, password: 0, username: 0 } }).toArray();
}

exports.findAllApplications = async function findAllApplications() {
  const applications = await db.loadUsersCollection();
  return await applications.find({ competences: { $exists: true }, availability: { $exists: true } }, { projection: { role: 0, password: 0, username: 0 } }).toArray();
}

exports.createApplication = async function createApplication(id, competences, availability) {
  const validatedId = validateApp.validateId(id);
  validateApp.validateCompetences(competences);
  validateApp.validateAvailability(availability);
  const applications = await db.loadUsersCollection();
  await applications.updateOne({ _id: new ObjectId(validatedId) }, { $set: { competences: competences, availability: availability } }, { upsert: true });
}

exports.deleteApplication = async function deleteApplication(id) {
  const validatedId = validateApp.validateId(id);
  const applications = await db.loadUsersCollection();
  await applications.updateOne({ _id: new ObjectId(validatedId) }, { $unset: { competences: 1, availability: 1, status: 1 } }, { upsert: true });
}

//exports.acceptApplication = async function acceptApplication(doc) {

 // validatedId = validateApp.validateId(doc.id);
  // validatedStatus = validateApp.validateStatus(doc.status);
  // validateApp.validateCompetences(doc.competences);
  // validateApp.validateAvailability(doc.availability);
  // const applications = await db.loadUsersCollection();
  // await resolveAfter5Seconds();
  // //await applications.findOneAndUpdate({ $and[ {$or: [ { status: previousValue}, { price: 10 } ] },{ $set: {}})
  // if(validatedStatus === 'undefined'){
  //   const whathappened = await applications.findOneAndUpdate({_id: new ObjectId(validatedId), status: { $exists: false }, competences: collection, availability: availability},{ $set: {}})
  // }
  // else{
  //   const whathappened = await applications.findOneAndUpdate({_id: new ObjectId(validatedId), status: validatedStatus, competences: collection, availability: availability},{ $set: {}})
  // }

//  console.log(whathappened); 
exports.acceptApplication = async function acceptApplication(id) {

  // const client = await mongodb.MongoClient.connect('mongodb://localhost:27017/admin?replicaSet=rs0', {
  //   useNewUrlParser: true, replicaSet: 'rs0'
  // });

  const client = await mongodb.MongoClient.connect(' mongodb://IV1201:IV1201@recruitment-shard-00-00-gxbqo.mongodb.net:27017,recruitment-shard-00-01-gxbqo.mongodb.net:27017,recruitment-shard-00-02-gxbqo.mongodb.net:27017/test?ssl=true&replicaSet=recruitment-shard-0&authSource=admin&retryWrites=true', {
      useNewUrlParser: true,
      replicaSet: 'recruitment-shard-0' ,
      readConcern: { level: "majority" }
    });


  
  const session = await client.startSession();
  //const applications =  await client.db('recruitment').collection('test');
  const applications =  await client.db('recruitment').collection('recruitment');

  console.log('hello');
  await session.startTransaction();

  const opts = { session, returnOriginal: false, new: true,
    writeConcern: { w: "majority", wtimeout: 5000 } };
  try{
    //const validatedId = validateApp.validateId(id);
    await applications.updateOne({ _id: new ObjectId(id), status: "test" }, { $set: { status: "accepted"}  }, opts)
    console.log('updated but not commited session1 ');
    await resolveAftermilliSeconds(8000);
    await session.commitTransaction();
    console.log('committed session1 ');
    session.endSession();
    
  }
  catch(e){
    console.log('Fail1')
    console.log(e.message)
    console.log(e.stack);
    await session.abortTransaction();
    session.endSession();
    throw e;
    //throw Error(Err.DatabaseErrors.MONGO_TRANSACTION_ERROR);

  }

}
  //const session = await db.getSession();
  //const applications = await db.loadUsersCollection();
  //const applications = await session.getDatabase("recruitment").recruitment;
  //employeesCollection = session.getDatabase("hr").employees;
//eventsCollection = session.getDatabase("reporting").events;
  //await applications.updateOne({ _id: new ObjectId(validatedId) }, { $set: { status: "rejected" } }, { upsert: true });
   //'mongodb://localhost:27017/recruitment/admin?replicaSet=rs0'
  //const client = await mongodb.MongoClient.connect('mongodb://localhost:27017/recruitment', {
exports.rejectApplication = async function rejectApplication(id) {
 //const client = await mongodb.MongoClient.connect('mongodb://localhost:27017/admin?replicaSet=rs0', {
 //   useNewUrlParser: true, replicaSet: 'rs0'
 // });

 const client = await mongodb.MongoClient.connect(' mongodb://IV1201:IV1201@recruitment-shard-00-00-gxbqo.mongodb.net:27017,recruitment-shard-00-01-gxbqo.mongodb.net:27017,recruitment-shard-00-02-gxbqo.mongodb.net:27017/test?ssl=true&replicaSet=recruitment-shard-0&authSource=admin&retryWrites=true', {
      useNewUrlParser: true,
      replicaSet: 'recruitment-shard-0' ,
      readConcern: { level: "majority" }
    });

  
  const session = await client.startSession();

  const opts = { session, returnOriginal: false, new: true,
    writeConcern: { w: "majority", wtimeout: 5000 } };

  //const applications =  await client.db('recruitment').collection('test');
  const applications =  await client.db('recruitment').collection('recruitment');
  await session.startTransaction();
  try{
    await resolveAftermilliSeconds(1000);
    //const validatedId = validateApp.validateId(id);
    await applications.updateOne({ _id: new ObjectId(id), status: "test"}, { $set: { status: "rejected"}  }, opts);
    //const foundAppl = await applications.find({ _id: new ObjectId(id) }, opts).toArray();
    console.log('updated but not commited session2 ');
    //console.log(foundAppl);
    await session.commitTransaction();
    console.log('commited session2 ')
    session.endSession();
    
  }
  catch(e){
    console.log('Fail2')
    console.log(e.message)
    console.log(e.stack);
    if(e.errorLabels){
        console.log(e.errorLabels)
        console.log('error labels')
      }
    await session.abortTransaction();
    session.endSession();
    throw e
    //throw Error(Err.DatabaseErrors.MONGO_TRANSACTION_ERROR);

  }
}

exports.primedb = async function primedb(id){
  // const client = await mongodb.MongoClient.connect(' mongodb://IV1201:IV1201@recruitment-shard-00-00-gxbqo.mongodb.net:27017,recruitment-shard-00-01-gxbqo.mongodb.net:27017,recruitment-shard-00-02-gxbqo.mongodb.net:27017/test?ssl=true&replicaSet=recruitment-shard-0&authSource=admin&retryWrites=true', {
  //     useNewUrlParser: true,
  //     replicaSet: 'recruitment-shard-0' ,
  //     readConcern: { level: "majority" }
  //   });

  const applications = await db.loadUsersCollection();

  await applications.updateOne({ _id: new ObjectId(id) }, { $set: { status: "test" } }, { upsert: true });
  console.log('db primed'); 



}

function resolveAftermilliSeconds(milisec) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('resolved');
    }, milisec);
  });
}


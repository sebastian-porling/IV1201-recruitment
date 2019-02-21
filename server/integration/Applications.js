const db = require('./db');
var ObjectId = require('mongodb').ObjectID;
const validateApp = require('../model/ValidateApplications');
const Err = require('../utility/ErrorEnums');
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

exports.acceptApplication = async function acceptApplication(doc) {
  validatedId = validateApp.validateId(doc.id);
  validatedStatus = validateApp.validateStatus(doc.status);
  validateApp.validateCompetences(doc.competences);
  validateApp.validateAvailability(doc.availability);
  const applications = await db.loadUsersCollection();
  await resolveAfter5Seconds();
  //await applications.findOneAndUpdate({ $and[ {$or: [ { status: previousValue}, { price: 10 } ] },{ $set: {}})
  if(validatedStatus === 'undefined'){
    const whathappened = await applications.findOneAndUpdate({_id: new ObjectId(validatedId), status: { $exists: false }, competences: collection, availability: availability},{ $set: {}})
  }
  else{
    const whathappened = await applications.findOneAndUpdate({_id: new ObjectId(validatedId), status: validatedStatus, competences: collection, availability: availability},{ $set: {}})
  }

  console.log(whathappened); 
  

  // const session = await db.getSession();
  // const applications = await db.loadUsersCollection();
  
  // await session.startTransaction( { readConcern: { level: "snapshot" }, writeConcern: { w: "majority" } } );
  
  // try{
  //   const validatedId = validateApp.validateId(id);
  //   const application = await applications.find({ _id: new ObjectId(validatedId) }, { projection: { role: 0, password: 0, username: 0 } }).toArray();
  //   console.log('hello');
  //   console.log('status: '+ String(application[0].status));
  //   const currentValue = application[0].status;
    
  //   // if(String(application[0].status) !== previousValue){
  //   //   throw Error(Err.DatabaseErrors.MONGO_TRANSACTION_ERROR);
  //   // }
    
  //   await resolveAfter5Seconds();
  //   await applications.updateOne({ _id: new ObjectId(validatedId) }, { $set: { status: {new: "accepted", old: "test"} } }, { upsert: true });
  //   await session.commitTransaction();
  //   await session.endSession();
    
  // }
  // catch(e){
  //   console.log(e.message)
  //   console.log(e.stack);
  //   await session.abortTransaction();
  //   throw Error(Err.DatabaseErrors.MONGO_TRANSACTION_ERROR);

  // }

  //const validatedId = validateApp.validateId(id);
  //const applications = await db.loadUsersCollection();
  //await applications.updateOne({ _id: new ObjectId(validatedId) }, { $set: { status: "accepted" } }, { upsert: true });
}

exports.rejectApplication = async function rejectApplication(id, previousValue) {
  const validatedId = validateApp.validateId(id);
  const applications = await db.loadUsersCollection();
  //await applications.updateOne({ _id: new ObjectId(validatedId) }, { $set: { status: "rejected" } }, { upsert: true });
  await applications.updateOne({ _id: new ObjectId(validatedId) }, { $set: { status: "rejected" } }, { upsert: true });

}

function resolveAfter5Seconds() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('resolved');
    }, 5000);
  });
}

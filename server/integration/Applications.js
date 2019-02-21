/** Module that acts as an interface to the database allowing different queries related to users in the database. 
 * @module Applications
 */

const db = require('./db');
var ObjectId = require('mongodb').ObjectID;
const validateApp = require('../model/ValidateApplications');

/**
 * Finds the application with the given user id. 
 * @param id The user id of the given application  
 * @returns An application with a matching id if successful. 

 */

exports.findApplicationWithId = async function findApplicationWithId(id) {
  const validatedId = validateApp.validateId(id);
  const applications = await db.loadUsersCollection();
  return await applications.find({ _id: new ObjectId(validatedId) }, { projection: { role: 0, password: 0, username: 0 } }).toArray();
} 

/**
 * Finds all applications stored in the database
 * @returns All applications stored in the database 
 */
exports.findAllApplications = async function findAllApplications() {
  const applications = await db.loadUsersCollection();
  return await applications.find({ competences: { $exists: true }, availability: { $exists: true } }, { projection: { role: 0, password: 0, username: 0 } }).toArray();
}

/**
 * Creates a new application for the given user id.
 * @param id The user id of the new application
 * @param competences The given users comptences
 * @param availability The time periods when the user is available 
 */
exports.createApplication = async function createApplication(id, competences, availability) {
  const validatedId = validateApp.validateId(id);
  validateApp.validateCompetences(competences);
  validateApp.validateAvailability(availability);
  const applications = await db.loadUsersCollection();
  await applications.updateOne({ _id: new ObjectId(validatedId) }, { $set: { competences: competences, availability: availability } }, { upsert: true });
}

/** 
 * Delete the given application
 * @param id Th user id of the application that is to be deleted
 */
exports.deleteApplication = async function deleteApplication(id) {
  const validatedId = validateApp.validateId(id);
  const applications = await db.loadUsersCollection();
  await applications.updateOne({ _id: new ObjectId(validatedId) }, { $unset: { competences: 1, availability: 1, status: 1 } }, { upsert: true });
}


/**
 * Accept the given application
 * @param id The user id of the application that is to be accepted.
 */
exports.acceptApplication = async function acceptApplication(id) {
  const validatedId = validateApp.validateId(id);
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


/**
 * Reject the given application
 * @param id The user id of the application thay is to rejected
 */
exports.rejectApplication = async function rejectApplication(id) {

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

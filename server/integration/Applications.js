
const db = require('./db');
var ObjectId = require('mongodb').ObjectID;
const validateApp = require('../model/ValidateApplications');
const Err = require('../utility/ErrorEnums');
const timeStamp = require('../utility/Timestamp');
//const delayfunction = require('../utility/DelayFunction');

/** Module that acts as an interface to the database allowing different queries related to users in the database. 
 * @module Applications
 */



/**
 * Finds the application with the given user id. 
 * @param id The user id of the given application  
 * @returns An application with a matching id if successful. 
*/
exports.findApplicationWithId = async function findApplicationWithId(id) {
  const validatedId = validateApp.validateId(id);
  const applications = await db.loadUsersCollection();
  const res = await applications.find({ _id: new ObjectId(validatedId), competences: {$exists: true}, availability: {$exists: true} }, { projection: { role: 0, password: 0, username: 0 } }).toArray();
  return res;
  //Need to check that application isnt empty when we get it!!!!!!!!!!!!!!!!!
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
  await applications.updateOne({ _id: new ObjectId(validatedId) }, { $set: { competences: competences, availability: availability, status: 'unhandled', timestamp: timeStamp.generateTimestamp() } }, { upsert: true });
}

/**
 * Updates an application for the given user id.
 * @param id The user id of the new application
 * @param competences The given users comptences
 * @param availability The time periods when the user is available 
 */
exports.updatepplication = async function updateApplication(id, competences, availability) {
  const validatedId = validateApp.validateId(id);
  validateApp.validateCompetences(competences);
  validateApp.validateAvailability(availability);
  const applications = await db.loadUsersCollection();
  await applications.updateOne({ _id: new ObjectId(validatedId) }, { $set: { competences: competences, availability: availability, status: 'unhandled', timestamp: timeStamp.generateTimestamp() } }, { upsert: true });
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

exports.acceptApplication = async function acceptApplication(id, timestamp) {
  const session = await db.startSession();
  const applications =  await db.loadUsersCollection();
  await session.startTransaction();
  const opts = { session, returnOriginal: false, new: true,
                writeConcern: { w: "majority", wtimeout: 5000 } };
  try{
    const validatedId = validateApp.validateId(id);
    const validatedTimestamp = validateApp.validateTimestamp(timestamp);
    const commandResult = await applications.updateOne({ _id: new ObjectId(validatedId), timestamp: validatedTimestamp }, { $set: { status: "accepted", timestamp: timeStamp.generateTimestamp()}  }, opts)
    if(commandResult.result.n == 0){
      throw Error(Err.DatabaseErrors.UPDATE_UNSUCCESSFUL)
    }

    //await delayfunction.resolveAftermilliSeconds(8000);
    await session.commitTransaction();
    session.endSession();
  }
  catch(e){
    console.log(e.message)
    console.log(e.stack);
    if(e.errorLabels){
      console.log(e.errorLabels)
    }
    await session.abortTransaction();
    session.endSession();
    if(e.message === 'WriteConflict'){
      throw Error(Err.DatabaseErrors.MONGO_WRITE_TRANSACTION_ERROR);
    }
    else{
      throw e
    }
  }

}
/**
 * Reject the given application
 * @param id The user id of the application thay is to rejected
 */
exports.rejectApplication = async function rejectApplication(id, timestamp) {
  const session = await db.startSession();
  const applications =  await db.loadUsersCollection();
  const opts = { session, returnOriginal: false, new: true,
                writeConcern: { w: "majority", wtimeout: 5000 } };
  await session.startTransaction();
  try{
    //await delayfunction.resolveAftermilliSeconds(1000);
    const validatedId = validateApp.validateId(id);
    const validatedTimestamp = validateApp.validateTimestamp(timestamp);
    const commandResult  = await applications.updateOne({ _id: new ObjectId(validatedId), timestamp: validatedTimestamp }, { $set: { status: "rejected", timestamp: timeStamp.generateTimestamp()}  }, opts)
    if(commandResult.result.n == 0){
      throw Error(Err.DatabaseErrors.UPDATE_UNSUCCESSFUL)
    }
    await session.commitTransaction();
    session.endSession();
    
  }
  catch(e){
    console.log(e.message)
    console.log(e.stack);
    if(e.errorLabels){
        console.log(e.errorLabels)
      }
    await session.abortTransaction();
    session.endSession();
    if(e.message === 'WriteConflict'){
      throw Error(Err.DatabaseErrors.MONGO_WRITE_TRANSACTION_ERROR);
    }
    else{
      throw e
    }
    
  }
}

/**
 * Get all the competences
 */
exports.getCompetences = async function getCompetences() {
  const competences = await db.loadCompetenceCollection();
  return await competences.find({}).toArray();
}


exports.primedb = async function primedb(id){
  const applications = await db.loadUsersCollection();
  const testTimestamp = "2019-03-03T18:14:14.486Z";
  await applications.updateOne({ _id: new ObjectId(id) }, { $set: { timestamp: testTimestamp } }, { upsert: true });
  console.log('db primed'); 
}


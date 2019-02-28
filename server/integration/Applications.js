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
  return await applications.find({ _id: new ObjectId(validatedId), competences: {$exists: true}, availability: {$exists: true} }, { projection: { role: 0, password: 0, username: 0 } }).toArray();
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
  await applications.updateOne({ _id: new ObjectId(validatedId) }, { $set: { status: "accepted" } }, { upsert: true });
}

/**
 * Reject the given application
 * @param id The user id of the application thay is to rejected
 */
exports.rejectApplication = async function rejectApplication(id) {
  const validatedId = validateApp.validateId(id);
  const applications = await db.loadUsersCollection();
  await applications.updateOne({ _id: new ObjectId(validatedId) }, { $set: { status: "rejected" } }, { upsert: true });
}

/**
 * Get all the competences
 */
exports.getCompetences = async function getCompetences() {
  const competences = await db.loadCompetenceCollection();
  return await competences.find({}).toArray();
}

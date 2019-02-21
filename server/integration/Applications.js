const db = require('./db');
var ObjectId = require('mongodb').ObjectID;
const validateApp = require('../model/ValidateApplications');
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

exports.acceptApplication = async function acceptApplication(id) {
  const validatedId = validateApp.validateId(id);
  const applications = await db.loadUsersCollection();
  await applications.updateOne({ _id: new ObjectId(validatedId) }, { $set: { status: "accepted" } }, { upsert: true });
}

exports.rejectApplication = async function rejectApplication(id) {
  const validatedId = validateApp.validateId(id);
  const applications = await db.loadUsersCollection();
  await applications.updateOne({ _id: new ObjectId(validatedId) }, { $set: { status: "rejected" } }, { upsert: true });

}

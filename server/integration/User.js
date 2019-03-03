/** Module that acts as an interface to the database allowing different queries related to users in the database. 
 * @module User
 */
const db = require('./db');
const validateAuth = require('../model/ValidateAuthentication');
const validateApp = require('../model/ValidateApplications');
var ObjectId = require('mongodb').ObjectID;


/**
 * Helper function for findUserById and findUserByEmail that initialises the database and performs the
 * given query. 
 * @param searchParams The query that should be executed
 * @returns The created token if successful 
 */
async function findUser(searchParams) {
  const userCollection = await db.loadUsersCollection();
  return await userCollection.findOne(searchParams);

}
/**
  * Finds a user in the database given the users id. 
 * @param userId The user id of the user that is to be found  
 * @returns The found user if successful
 */
exports.findUserById = async function findUserById(userId) {
  const validatedUserId = validateApp.validateId(userId);
  return await findUser({ _id: new ObjectId(validatedUserId) });
}
/**
 * Finds a user in the database given the users email.
 * @param email The email of the user that is to be found  
 * @returns The found user if successful
 */
exports.findUserByEmail = async function findUserByEmail(email) {
  const validatedEmail = validateAuth.validateEmail(email);
  return await findUser({ email: validatedEmail })
}
/**
 * Add a user to the database with the given name, email and password 
 * @param name The new users name 
 * @param email The new users email 
 * @param password The new users password (Assumed to be hashed)
 * @returns The id of the new user. 
 */
exports.addUser = async function addUser(name, email, password) {
  const userCollection = await db.loadUsersCollection();
  const validatedName = validateAuth.validateName(name);
  const validatedEmail = validateAuth.validateEmail(email);
  const validatedPassword = validateAuth.validatePassword(password);
  const result = await userCollection.insertOne({ name: validatedName, email: validatedEmail, password: validatedPassword, role: 'user' });
  return result.ops[0]._id;
}
/**
 * Delete the user with the given user id
 * @param userId The user id of the user that will be deleted.
 * @returns The result of the operartion.
 */
exports.deleteUser = async function deleteUser(userId) {
  const validatedUserId = validateApp.validateId(userId);
  const userCollection = await db.loadUsersCollection();
  return await userCollection.deleteOne({ _id: new ObjectId(validatedUserId) });
}

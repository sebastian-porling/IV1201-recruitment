/** Module that acts as an interface to the database allowing different queries related to users in the database. 
 * @module User
 */
const db = require('./db');
const validateAuth = require('../model/ValidateAuthentication');
const validateApp = require('../model/ValidateApplications');
const Err = require('../utility/ErrorEnums');
//const delayfunction = require('../utility/DelayFunction');
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
 async function findUserByEmail(email) {
  const validatedEmail = validateAuth.validateEmail(email);
  return await findUser({ email: validatedEmail })
}
exports.findUserByEmail = findUserByEmail;

/**
 * Finds a user in the database given the users email and social security number.
 * @param email The email of the user that is to be found  
 * @param ssn The social security number of the user that is to be found 
 * @returns The found user if successful
 */
exports.findUserByEmailAndSSN = async function findUserByEmail(email, ssn) {
  const validatedEmail = validateAuth.validateEmail(email);
  const validatedSsn = validateAuth.validateSsn(ssn);
  return await findUser({ email: validatedEmail, ssn: validatedSsn})
}

/**
 * Add a user to the database with the given name, email and password 
 * @param name The new users name 
 * @param email The new users email 
 * @param password The new users password (Assumed to be hashed)
 * @returns The id of the new user. 
 */
exports.addUser = async function addUser(name, surname, ssn, email, password) {
  const session = await db.startSession();
  const userCollection = await db.loadUsersCollection();
  const opts = { session, returnOriginal: false, new: true,
                writeConcern: { w: "majority", wtimeout: 5000 } };
  await session.startTransaction();
  try{
    const validatedName = validateAuth.validateName(name);
    const validatedEmail = validateAuth.validateEmail(email);
    const validatedPassword = validateAuth.validatePassword(password);
    const validatedSsn = validateAuth.validateSsn(ssn);
    const validatedSurname = validateAuth.validateName(surname);
    var user = await findUserByEmail(validatedEmail);
    if (user) throw Error(Err.AuthenticationErrors.EMAIL_TAKEN);
    const result = await userCollection.insertOne({ name: validatedName, surname: validatedSurname, ssn: validatedSsn, email: validatedEmail, password: validatedPassword, role: 'applicant'}, opts);
    //await delayfunction.resolveAftermilliSeconds(5000);
    await session.commitTransaction();
    session.endSession();
    return result.ops[0]._id;  
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
 * Delete the user with the given user id
 * @param userId The user id of the user that will be deleted.
 * @returns The result of the operartion.
 */
exports.deleteUser = async function deleteUser(userId) {
  const validatedUserId = validateApp.validateId(userId);
  const userCollection = await db.loadUsersCollection();
  return await userCollection.deleteOne({ _id: new ObjectId(validatedUserId) });
}


/**
 * Finds an admin/recruiter in the database given the Admins name 
 * @param name The name of the admin 
 * @returns The found admin if successful
 */
exports.findAdminByName = async function findAdminByName(name) {
  const validatedName = validateAuth.validateName(name);
  return await findUser({ name: validatedName, role: 'recruiter' });
}

/** 
 * Module used to validate data relevant to authentication.
 * @module ValidateAuthentication
 */
var validator = require('validator');
var xssFilters = require('xss-filters');
const assert = require('assert');
var Err = require('../utility/ErrorEnums');
/**
 * Verifies that the input from the user to a route in /auth is valid 
 * @param req Contains information about the request made by the client to the server.
 * @param res Used to construct a response to the client.
 * @param next The next middleware that should be called if the client is logged in as an admin.
 * @returns HTTP response if error occured else nothing
 */


 /**
  * Function that validates a given name. Throwing an error if validation fails. 
  * @param name The name that is to be validated.
  * @returns The filtered name if validation is successful. 
  */
const validateName = function (name) {
  var filteredName = xssFilters.inHTMLData(name);
  assert.strictEqual(name, filteredName, Err.ValidationErrors.INVALID_FORMAT_NAME);
  assert.strictEqual(true, validator.isAlpha(filteredName, 'sv-SE'), Err.ValidationErrors.INVALID_FORMAT_NAME);
  assert.strictEqual(true, validator.isByteLength(filteredName, { min: 1, max: 30 }), Err.ValidationErrors.INVALID_FORMAT_NAME);
  return filteredName;
}
exports.validateName = validateName;

const validateSsn = function (ssn) {
  var filteredSsn = xssFilters.inHTMLData(ssn);
  assert.strictEqual(ssn, filteredSsn);
  assert.strictEqual(true, validator.isByteLength(filteredSsn, { min: 13, max: 13}), Err.ValidationErrors.INVALID_FORMAT_SSN);
  assert.strictEqual(true, validator.matches(filteredSsn, /^(19|20)[0-9]{2}[0-1][0-9][0-3][0-9]-[0-9]{4}/), Err.ValidationErrors.INVALID_FORMAT_SSN);
  return filteredSsn;
}
exports.validateSsn = validateSsn;

/**
  * Function that validates a given email. Throwing an error if validation fails. 
  * @param email The email that is to be validated.
  * @returns The filtered email if validation is successful.
  */
const validateEmail = function (email) {
  var filteredEmail = xssFilters.inHTMLData(email);
  assert.strictEqual(filteredEmail, email, Err.ValidationErrors.INVALID_FORMAT_EMAIL);
  assert.strictEqual(true, validator.isEmail(filteredEmail), Err.ValidationErrors.INVALID_FORMAT_EMAIL);
  assert.strictEqual(true, validator.isByteLength(filteredEmail, { min: 1, max: 50 }), Err.ValidationErrors.INVALID_FORMAT_EMAIL);
  return filteredEmail;
}
exports.validateEmail = validateEmail;

/**
  * Function that validates a given password. Throwing an error if validation fails. 
  * @param password The password that is to be validated.
  * @returns The filtered passsword if validation is successful.
  */
const validatePassword = function (password) {
  var filteredPassword = xssFilters.inHTMLData(password);
  assert.strictEqual(filteredPassword, password, Err.ValidationErrors.INVALID_FORMAT_PASSWORD);
  assert.strictEqual(true, validator.isByteLength(filteredPassword, { min: 8, max: 120 }), Err.ValidationErrors.INVALID_FORMAT_PASSWORD);
  return filteredPassword;
}
exports.validatePassword = validatePassword;


/**
 * Middleware that verifies that request data to a route in /auth is valid
 * @param route Parameter that is used to decide the type of validation that should be undertaken.  
 * @param req Contains information about the request made by the client to the server.
 * @param res Used to construct a response to the client.
 * @param next The next middleware that should be called if validation is successful 
 */
exports.validateAuthenticationRoute = function validateAuthenticationRoute(route) {
  return async function (req, res, next) {
    try {
      //Validate name if register route. 
      if (route === '/register') {
        req.body.name = validateName(req.body.name);
        req.body.surname = validateName(req.body.surname);
        req.body.ssn = validateSsn(req.body.ssn);
      }
      if(route ==='/loginadmin'){
        req.body.name = validateName(req.body.name);
        req.body.password = validatePassword(req.body.password);
      }
      else{
        req.body.email = validateEmail(req.body.email);
        req.body.password = validatePassword(req.body.password);
      }
      //All data valid 
      next()
    }
    catch (e) {
      switch (e.message) {
        case Err.ValidationErrors.INVALID_FORMAT_NAME:
          console.log('Name has invalid format');
          return res.status(400).send({ error: 'Name has invalid format.' });
        //return res.status(400).send({ error: Err.ValidationErrors.INVALID_FORMAT_NAME });

        case Err.ValidationErrors.INVALID_FORMAT_EMAIL:
          console.log('Username has invalid format');
          return res.status(400).send({ error: 'Username has invalid format' });
        //return res.status(400).send({error: Err.ValidationErrors.INVALID_FORMAT_EMAIL});  

        case Err.ValidationErrors.INVALID_FORMAT_PASSWORD:
          console.log('Password has invalid format');
          return res.status(400).send({ error: 'Password has invalid format' });
        //return res.status(400).send({error: Err.ValidationErrors.INVALID_FORMAT_PASSWORD});   
        
        case Err.ValidationErrors.INVALID_FORMAT_SSN:
          console.log('SSN has invalid format');
          return res.status(400).send({ error: 'Social security number has invalid format' });

        default:
          console.log(e.name + ': ' + e.message);
          console.trace();
          return res.status(400).send({ error: 'Error on the server' });
        //return res.status(400).send({error: Err.ServerErrors.ERROR_ON_SERVER});
      }
    }
  };
};

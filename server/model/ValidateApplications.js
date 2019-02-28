/** 
 * Module used to validate data relevant to applications 
 * @module validateApplications
 */
var validator = require('validator');
var xssFilters = require('xss-filters');
const assert = require('assert');
var Err = require('../utility/ErrorEnums');
var Ajv = require('ajv');
var ajv = new Ajv({ allErrors: true, $data: true });
//Schema used to validate that competence json is correct
var competenceSchema = {
  "maxProperties": 2,
  "minProperties": 2,
  "properties": {
    "competence": { "type": "string", "minLength": 1, "maxLength": 30 },
    "years_of_experience": { "type": "number", "minimum": 0, "maximum": 100 }
  }
};
//Schema used to validate that availability json is correct
var availabilitySchema = {
  "maxProperties": 2,
  "minProperties": 2,
  "properties": {
    "from_date": { "type": "string", "format": "date-time" },
    "to_date": { "type": "string", "format": "date-time" }
  }
};
var validateComp = ajv.compile(competenceSchema);
var validateAvail = ajv.compile(availabilitySchema);

/** 
 * Function that validates the given user id. Throwing an error if validation fails. 
 * @param id The id that is to be validated
 * @return The filtered id if validation is successful 
 */
const validateId = function (id) {
  var filteredId = xssFilters.inHTMLData(id);
  console.log(id + "?");
  assert.strictEqual(id, filteredId, Err.ValidationErrors.INVALID_FORMAT_ID);
  assert.strictEqual(true, validator.isHexadecimal(filteredId), Err.ValidationErrors.INVALID_FORMAT_ID);
  assert.strictEqual(true, validator.isByteLength(filteredId, { min: 24, max: 24 }), Err.ValidationErrors.INVALID_FORMAT_ID);
  return filteredId;
};
exports.validateId = validateId;


const validateStatus = function(status){
  if(status === undefined){
    return 'undefined';
  }
  const filteredStatus = xssFilters.inHTMLData(status);
  assert.strictEqual(id, filteredStatus, Err.ValidationErrors.INVALID_FORMAT_STATUS);
  const statusEquals = validator.equals(status, 'accepted') || validator.equals(status, 'rejected')
  assert.strictEqual(true, statusEquals, Err.ValidationErrors.INVALID_FORMAT_STATUS);

}
exports.validateStatus = validateStatus;

/** 
 * Function that validates the given competences. Throwing an error if validation fails. 
 * @param competences The competences that are to be validated
 */

const validateCompetences = function (competences) {
  assert.strictEqual(true, Array.isArray(competences), Err.ValidationErrors.INVALID_FORMAT_COMPETENCE);
  for (let comp of competences) {
    assert.strictEqual(true, validateComp(comp), Err.ValidationErrors.INVALID_FORMAT_COMPETENCE);
    var competence = xssFilters.inHTMLData(comp.competence);
    var years_of_experience = Number(xssFilters.inHTMLData(comp.years_of_experience));
    assert.strictEqual(comp.competence, competence, Err.ValidationErrors.INVALID_FORMAT_COMPETENCE);
    assert.strictEqual(comp.years_of_experience, years_of_experience, Err.ValidationErrors.INVALID_FORMAT_COMPETENCE);
    comp.competence = competence;
    comp.years_of_experience = years_of_experience;
  }
};
exports.validateCompetences = validateCompetences;
/**
 * Function that validates the given availablities. Throwing an error if validation fails. 
 * @param  availability The availabilites that are to be validated
 */
const validateAvailability = function (availability) {
  assert.strictEqual(true, Array.isArray(availability), Err.ValidationErrors.INVALID_FORMAT_AVAILABILITY);
  for (let avail of availability) {
    assert.strictEqual(true, validateAvail(avail), Err.ValidationErrors.INVALID_FORMAT_AVAILABILITY);
    var from_date = xssFilters.inHTMLData(avail.from_date);
    var to_date = xssFilters.inHTMLData(avail.to_date);
    assert.strictEqual(avail.from_date, from_date, Err.ValidationErrors.INVALID_FORMAT_AVAILABILITY);
    assert.strictEqual(avail.to_date, to_date, Err.ValidationErrors.INVALID_FORMAT_AVAILABILITY);
    assert.strictEqual(true, validator.isAfter(to_date, from_date), Err.ValidationErrors.INVALID_FORMAT_AVAILABILITY);
    avail.from_date = from_date;
    avail.to_date = to_date;
  }
};

exports.validateAvailability = validateAvailability;


const validateTimestamp = function(timestamp){
  const filteredTimestamp = xssFilters.inHTMLData(timestamp);
  options = {strict: true};
  assert.strictEqual(true, validator.isISO8601(filteredTimestamp, options), Err.ValidationErrors.INVALID_FORMAT_TIMESTAMP);
  return filteredTimestamp; 
}
exports.validateTimestamp = validateTimestamp; 


/**
 * Middleware that verifies that the request data from the user to a route in /api/applications is valid.
 * @param route Parameter that is used to decide the type of validation that should be undertaken.  
 * @param req Contains information about the request made by the client to the server.
 * @param res Used to construct a response to the client.
 * @param next The next middleware that should be called if validation is successful 
 * @returns HTTP response if error occured else nothing
 */
exports.validateApplicationsRoute = function validateApplicationsRoute(route) {
  return async function (req, res, next) {
    try {
      if (route === '/:id') {
        //Validate id from params
        req.params.id = validateId(req.params.id);
      }
      else if(route === '/:id/:timestamp'){
        req.params.id = validateId(req.params.id);
        req.params.timestamp = validateTimestamp(req.params.timestamp);
      }
      else if (route === 'post/') {
        //Validate id from body
        req.body.id = validateId(req.body.id);
        validateCompetences(req.body.competences);
        validateAvailability(req.body.availability);
      }
      //All data valid 
      next()
    }
    catch (e) {
      switch (e.message) {
        case Err.ValidationErrors.INVALID_FORMAT_STATUS:
          console.log('status has invalid format');
          return res.status(400).send({error: 'status has invalid format'})

        case Err.ValidationErrors.INVALID_FORMAT_ID:
          console.log('id has invalid format');
          return res.status(400).send({ error: 'id has invalid format.' });
        //return res.status(400).send({ error: Err.ValidationErrors.INVALID_FORMAT_ID });

        case Err.ValidationErrors.INVALID_FORMAT_COMPETENCE:
          console.log('competence has invalid format');
          console.log(e.name + ': ' + e.message);
          console.log('Invalid: ' + ajv.errorsText(validateCompetence.errors));
          return res.status(400).send({ error: 'competence has invalid format' });
        //return res.status(400).send({error: Err.ValidationErrors.INVALID_FORMAT_COMPETENCE});

        case Err.ValidationErrors.INVALID_FORMAT_AVAILABILITY:
          console.log('availability has invalid format');
          console.log(e.name + ': ' + e.message);
          console.log('Invalid: ' + ajv.errorsText(validateAvailability.errors));
          return res.status(400).send({ error: 'availability has invalid format' });
        //return res.status(400).send({error: Err.ValidationErrors.INVALID_FORMAT_AVAILABILITY});  
        case Err.ValidationErrors.INVALID_FORMAT_TIMESTAMP:
          console.log('timestamp has invalid format');
          return res.status(400).send({error: 'timestamp has invalid format'})


        default:
          console.log(e.name + ': ' + e.message);
          console.log(e.stack)
          return res.status(400).send({ error: 'Error on the server' });
        //return res.status(400).send({error: Err.ServerErrors.ERROR_ON_SERVER});
      }
    }
  };
};   

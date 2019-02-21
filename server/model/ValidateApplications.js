/** 
 * Middleware used to validate that inputs from the user to routes in /api/applications are correct  
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
 * Verifies that the input from the user to a route in /api/applications is valid 
 * @param req Contains information about the request made by the client to the server.
 * @param res Used to construct a response to the client.
 * @param next The next middleware that should be called if the client is logged in as an admin.
 * @returns HTTP response if error occured else nothing
 */


const validateId = function (id) {
  var filteredId = xssFilters.inHTMLData(id);
  assert.strictEqual(id, filteredId, Err.ValidationErrors.INVALID_FORMAT_ID);
  assert.strictEqual(true, validator.isHexadecimal(filteredId), Err.ValidationErrors.INVALID_FORMAT_ID);
  assert.strictEqual(true, validator.isByteLength(filteredId, { min: 24, max: 24 }), Err.ValidationErrors.INVALID_FORMAT_ID);
  return filteredId;
};
exports.validateId = validateId;

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

exports.validateApplicationsRoute = function validateApplicationsRoute(route) {
  return async function (req, res, next) {
    try {
      if (route === '/:id') {
        //Validate id from params
        req.params.id = validateId(req.params.id);
      }
      if (route === 'post/') {
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

        default:
          console.log(e.name + ': ' + e.message);
          console.log(e.stack)
          return res.status(400).send({ error: 'Error on the server' });
        //return res.status(400).send({error: Err.ServerErrors.ERROR_ON_SERVER});
      }
    }
  };
};   

/** 
 * Middleware used to validate that inputs from the user to routes in /api/applications are correct  
 * @module validateApplications
 */
var validator = require('validator');
var xssFilters = require('xss-filters');
const assert = require('assert');
var Ajv = require('ajv');
var ajv = new Ajv({allErrors: true, $data: true});
//Schema used to validate that competence json is correct
var competenceSchema = {
    "maxProperties": 2,
    "minProperties": 2,
    "properties": {
        "competence": { "type": "string", "minLength": 1, "maxLength": 30 },
        "years_of_experience": { "type": "number", "minimum": 0, "maximum": 100}
    }
};
//Schema used to validate that availability json is correct
var availabilitySchema = {
    "maxProperties": 2,
    "minProperties": 2,
    "properties": {
        "from_date": { "type": "string", "format": "date-time"},
        "to_date": { "type": "string", "format": "date-time"}
    }
};
var validateCompetence = ajv.compile(competenceSchema);
var validateAvailability = ajv.compile(availabilitySchema);
/**
 * Verifies that the input from the user to a route in /api/applications is valid 
 * @param req Contains information about the request made by the client to the server.
 * @param res Used to construct a response to the client.
 * @param next The next middleware that should be called if the client is logged in as an admin.
 * @returns HTTP response if error occured else nothing
 */
function validateApplications(route){
    return async function (req, res, next) {
        try{ 
            if(route === '/:id'){
                //Validate id from params
                //sanitize data to prevent xss attacks 
                var id = xssFilters.inHTMLData(req.params.id);
                //If something was removed by the filter throw error
                assert.strictEqual(req.params.id, id, "1");
                //Check that id is a hexstring
                assert.strictEqual(true,  validator.isHexadecimal(id), "1");
                //Check that the id has length 24 the number of digits in an objectid hexnumber.  
                assert.strictEqual(true,  validator.isByteLength(id, {min:24, max: 24}), "1");
                //Filtered id is valid
                req.params.id = id; 
            }
            if(route === 'post/'){
                //Validate id from body
                //sanitize data to prevent xss attacks 
                var id = xssFilters.inHTMLData(req.body.id);
                //If something was removed by the filter throw error
                assert.strictEqual(req.body.id, id, "1");
                //Check that id is a hexstring
                assert.strictEqual(true,  validator.isHexadecimal(id), "1");
                //Check that the id has length 24 the number of digits in an objectid hexnumber.  
                assert.strictEqual(true,  validator.isByteLength(id, {min:24, max: 24}), "1");
                //Filtered id is valid
                req.params.id = id; 
                //Check that competences is an array
                assert.strictEqual(true, Array.isArray(req.body.competences), "2");
                for (let comp of req.body.competences) {
                    //Validate that json object has correct properties defined in competenceSchema
                    assert.strictEqual(true, validateCompetence(comp), "2");
                    //sanitize data to prevent xss attacks 
                    var competence = xssFilters.inHTMLData(comp.competence);
                    var years_of_experience = Number(xssFilters.inHTMLData(comp.years_of_experience)); 
                    //If something was removed by the filter throw error
                    assert.strictEqual(comp.competence, competence, "2");    
                    assert.strictEqual(comp.years_of_experience, years_of_experience, "2");
                    //competence is valid 
                    comp.competence = competence;
                    comp.years_of_experience = years_of_experience;
                }
                //Check that availability is an array
                assert.strictEqual(true, Array.isArray(req.body.availability), "3");
                for (let avail of req.body.availability) {
                    //Validate that json object has correct properties defined in availabilitySchema
                    assert.strictEqual(true, validateAvailability(avail), "3");
                    //sanitize data to prevent xss attacks 
                    var from_date = xssFilters.inHTMLData(avail.from_date);
                    var to_date = xssFilters.inHTMLData(avail.to_date); 
                    //If something was removed by the filter throw error
                    assert.strictEqual(avail.from_date, from_date, "3");    
                    assert.strictEqual(avail.to_date, to_date, "3");
                    //Check that to_date comes after from_date 
                    assert.strictEqual(true, validator.isAfter(to_date, from_date), "3");
                    //availability is valid 
                    avail.from_date = from_date;
                    avail.to_date = to_date;
                }
            } 
            //All data valid 
            next()
        }
        catch(e){
            switch(e.message) {
                case '1':
                    console.log('id has invalid format');
                    return res.status(400).send({ error: 'id has invalid format.' });
                case '2':
                    console.log('competence has invalid format');
                    console.log(e.name +': ' + e.message);
                    console.log('Invalid: ' + ajv.errorsText(validateCompetence.errors));
                    return res.status(400).send({error: 'competence has invalid format'});
                case '3':
                    console.log('availability has invalid format');
                    console.log(e.name +': ' + e.message);
                    console.log('Invalid: ' + ajv.errorsText(validateAvailability.errors));
                    return res.status(400).send({error: 'availability has invalid format'});              
                default:
                    console.log(e.name +': ' + e.message);
                    console.trace();
                    return res.status(400).send({error: 'Error on the server'});
            }
        } 
    };   
};   
module.exports = validateApplications;
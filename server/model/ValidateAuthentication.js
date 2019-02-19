/** 
 * Middleware used to validate that inputs from the user to routes in /auth are correct  
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

// function xssFilter(parameter, errorcode){
//     var filteredparameter = xssFilters.inHTMLData(parameter);
//     assert.strictEqual(parameter, filteredparameter, errorcode);
//     return filteredparameter; 
// }


const validateName = function (name){
    var filteredName = xssFilters.inHTMLData(name);
    assert.strictEqual(name, filteredName, Err.ValidationErrors.INVALID_FORMAT_NAME);
    assert.strictEqual(true,  validator.isAlpha(filteredName , 'sv-SE'), Err.ValidationErrors.INVALID_FORMAT_NAME);
    assert.strictEqual(true,  validator.isByteLength(filteredName, {min:1, max: 30}), Err.ValidationErrors.INVALID_FORMAT_NAME);
    return filteredName;
}
exports.validateName = validateName;

 const validateEmail =  function (email){
    var filteredEmail = xssFilters.inHTMLData(email);
    assert.strictEqual(filteredEmail, email, Err.ValidationErrors.INVALID_FORMAT_EMAIL);
    assert.strictEqual(true, validator.isEmail(filteredEmail), Err.ValidationErrors.INVALID_FORMAT_EMAIL);
    assert.strictEqual(true,  validator.isByteLength(filteredEmail, {min:1, max: 30}), Err.ValidationErrors.INVALID_FORMAT_EMAIL);
    return filteredEmail;
}
exports.validateEmail = validateEmail;

const validatePassword = function (password){
    var filteredPassword = xssFilters.inHTMLData(password);
    assert.strictEqual(filteredPassword, password, Err.ValidationErrors.INVALID_FORMAT_PASSWORD);
    assert.strictEqual(true,  validator.isByteLength(filteredPassword, {min:8, max: 120}), Err.ValidationErrors.INVALID_FORMAT_PASSWORD);
    return filteredPassword; 
}
exports.validatePassword = validatePassword;

exports.validateAuthenticationRoute =  function validateAuthenticationRoute(route){
    return async function (req, res, next) {
        try{  
            //Validate name if register route. 
            if(route === '/register'){
                req.body.name = validateName(req.body.name);
            }
            req.body.email = validateEmail(req.body.email);
            req.body.password = validatePassword(req.body.password);
            //All data valid 
            next()
        }
        catch(e){
            switch(e.message) {
                case Err.ValidationErrors.INVALID_FORMAT_NAME:
                    console.log('Name has invalid format');
                    //return res.status(400).send({ error: 'Name has invalid format.' });
                    return res.status(400).send({ error: Err.ValidationErrors.INVALID_FORMAT_NAME });

                case Err.ValidationErrors.INVALID_FORMAT_EMAIL:
                    console.log('Username has invalid format');
                    //return res.status(400).send({error: 'Username has invalid format'});  
                    return res.status(400).send({error: Err.ValidationErrors.INVALID_FORMAT_EMAIL});  

                case Err.ValidationErrors.INVALID_FORMAT_PASSWORD:
                    console.log('Password has invalid format');
                    //return res.status(400).send({error: 'Password has invalid format'}); 
                    return res.status(400).send({error: Err.ValidationErrors.INVALID_FORMAT_PASSWORD});            
           
                default:
                    console.log(e.name +': ' + e.message);
                    console.trace();
                    //return res.status(400).send({error: 'Error on the server'});
                    return res.status(400).send({error: Err.ServerErrors.ERROR_ON_SERVER});
            }
        } 
    };   
};  
// function validateAuthentication(route){
//     return async function (req, res, next) {
//         try{  
//             //Validate name if register route. 
//             if(route === '/register'){
//                 //sanitize data to prevent xss attacks 
//                 var name = xssFilters.inHTMLData(req.body.name);
//                 //If something was removed by the filter throw error
//                 assert.strictEqual(req.body.name, name, "1");
//                 //Check that name contains only letters.
//                 assert.strictEqual(true,  validator.isAlpha(name , 'sv-SE'), "1");
//                 //Check that name isn't to long  or short min: 1 max: 30 char
//                 assert.strictEqual(true,  validator.isByteLength(name, {min:1, max: 30}), "1");
//                 //Filtered name is valid
//                 req.body.name = name; 
//             }
//             //validate email
//             //sanitize data to prevent xss attacks 
//             var email = xssFilters.inHTMLData(req.body.email);
//             //If something was removed by the XSS filter throw error
//             assert.strictEqual(req.body.email, email, "2");
//             //validate email
//             assert.strictEqual(true, validator.isEmail(email), "2");
//             //Check that email isn't to long or short min: 1 max: 30 char
//             assert.strictEqual(true,  validator.isByteLength(email, {min:1, max: 30}), "2");
//             //Filtered email is valid 
//             req.body.email = email; 
//             //validate password
//             //sanitize data to prevent xss attacks 
//             var password = xssFilters.inHTMLData(req.body.password);
//             //If something was removed by the XSS filter throw error
//             assert.strictEqual(req.body.password, password, "3");
//             //Check that password  isn't to long or short min: 8 max: 120 char
//             assert.strictEqual(true,  validator.isByteLength(password, {min:8, max: 120}), "3");
//             //Filtered password is in valid format
//             req.body.password = password; 
//             //All data valid 
//             next()
//         }
//         catch(e){
//             switch(e.message) {
//                 case '1':
//                     console.log('Name has invalid format');
//                     return res.status(400).send({ error: 'Name has invalid format.' });
//                 case '2':
//                     console.log('Username has invalid format');
//                     return res.status(400).send({error: 'Username has invalid format'});  
//                 case '3':
//                     console.log('Password has invalid format');
//                     return res.status(400).send({error: 'Password has invalid format'});            
//                 default:
//                     console.log(e.name +': ' + e.message);
//                     console.trace();
//                     return res.status(400).send({error: 'Error on the server'});
//             }
//         } 
//     };   
// };   


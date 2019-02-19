/** 
 * Middleware used to validate that inputs from the user to routes in /auth are correct  
 * @module ValidateAuthentication
 */
var validator = require('validator');
var xssFilters = require('xss-filters');
const assert = require('assert');
/**
 * Verifies that the input from the user to a route in /auth is valid 
 * @param req Contains information about the request made by the client to the server.
 * @param res Used to construct a response to the client.
 * @param next The next middleware that should be called if the client is logged in as an admin.
 * @returns HTTP response if error occured else nothing
 */
function validateAuthentication(route){
    return async function (req, res, next) {
        try{  
            //Validate name if register route. 
            if(route === '/register'){
                //sanitize data to prevent xss attacks 
                var name = xssFilters.inHTMLData(req.body.name);
                //If something was removed by the filter throw error
                assert.strictEqual(req.body.name, name, "1");
                //Check that name contains only letters.
                assert.strictEqual(true,  validator.isAlpha(name , 'sv-SE'), "1");
                //Check that name isn't to long  or short min: 1 max: 30 char
                assert.strictEqual(true,  validator.isByteLength(name, {min:1, max: 30}), "1");
                //Filtered name is valid
                req.body.name = name; 
            }
            //validate email
            //sanitize data to prevent xss attacks 
            var email = xssFilters.inHTMLData(req.body.email);
            //If something was removed by the XSS filter throw error
            assert.strictEqual(req.body.email, email, "2");
            //validate email
            assert.strictEqual(true, validator.isEmail(email), "2");
            //Check that email isn't to long or short min: 1 max: 30 char
            assert.strictEqual(true,  validator.isByteLength(email, {min:1, max: 30}), "2");
            //Filtered email is valid 
            req.body.email = email; 
            //validate password
            //sanitize data to prevent xss attacks 
            var password = xssFilters.inHTMLData(req.body.password);
            //If something was removed by the XSS filter throw error
            assert.strictEqual(req.body.password, password, "3");
            //Check that password  isn't to long or short min: 8 max: 120 char
            assert.strictEqual(true,  validator.isByteLength(password, {min:8, max: 120}), "3");
            //Filtered password is in valid format
            req.body.password = password; 
            //All data valid 
            next()
        }
        catch(e){
            switch(e.message) {
                case '1':
                    console.log('Name has invalid format');
                    return res.status(400).send({ error: 'Name has invalid format.' });
                case '2':
                    console.log('Username has invalid format');
                    return res.status(400).send({error: 'Username has invalid format'});  
                case '3':
                    console.log('Password has invalid format');
                    return res.status(400).send({error: 'Password has invalid format'});            
                default:
                    console.log(e.name +': ' + e.message);
                    console.trace();
                    return res.status(400).send({error: 'Error on the server'});
            }
        } 
    };   
}
module.exports = validateAuthentication;

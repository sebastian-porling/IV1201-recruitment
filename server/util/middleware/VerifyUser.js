/** 
 * Middleware used to verify that a valid user is attempting to access a page/route.  
 * @module VerifyUser
 */
var jwt = require('jsonwebtoken');
config = 'supersecretstuff';

/**
 * Verifies that the current client is logged in as a user.
 * @param req Contains information about the request made by the client to the server
 * @param res Used to construct a response to the client
 * @param next The next middleware that should be called if the client is logged in as a valid user
 * @returns HTTP response if error occured else nothing
 */

async function verifyUser(req, res, next) {
  try{
    var token = req.session.token;
    console.log(token)
    if (!token)
      return res.status(400).send({ error: 'No token provided.' });
    jwt.verify(token, config, function(err, decoded) {
      if (err)
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      //User verified save user id to request so that it can be retrieved by further routes. 
      req.userId = decoded.id; 
      //Do we need to check if user is in database?
      console.log('Token verified');
      next();
      });
  }
  catch(e){
    switch(e.message) {
      default:
        console.log(e.name +': ' + e.message);
        console.trace();
        return res.status(400).send({error: 'Error on the server'});
    }

  }
}
module.exports = verifyUser;
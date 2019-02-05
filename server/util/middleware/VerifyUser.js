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
 */

function verifyUser(req, res, next) {
  //var token = req.headers['x-access-token'];
  var token = req.session.token;
  console.log(token)
  if (!token)
    return res.status(403).send({ auth: false, message: 'No token provided.' });
  jwt.verify(token, config, function(err, decoded) {
    if (err)
    return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    // if everything good, save to request for use in other routes
    req.userId = decoded.id;
    //Do we need to check if user is in database?
    console.log('Token verified');
    next();
  });
}
module.exports = verifyUser;
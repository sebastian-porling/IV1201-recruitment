/** 
 * Middleware used to verify that a valid user is attempting to access a page/route.  
 * @module VerifyUser
 */
var Token = require('./Token');
var Err = require('../utility/ErrorEnums');
/**
 * Verifies that the current client is logged in as a user.
 * @param req Contains information about the request made by the client to the server
 * @param res Used to construct a response to the client
 * @param next The next middleware that should be called if the client is logged in as a valid user
 * @returns HTTP response if error occured else nothing
 */
async function verifyUser(req, res, next) {
  try {
    var token = req.session.token;
    if (!token) {
      throw Error(Err.AuthorizationErrors.NO_TOKEN_PROVIDED);
    }
    const decodedToken = Token.verifyToken(token);
    req.userId = decodedToken.id;
    console.log('Token verified');
    next();
  }
  catch (e) {
    switch (e.name) {
      case 'JsonWebTokenError':
        console.log('Failed to authenticate token');
        console.log(e.name + ': ' + e.message);
        console.log(e.stack)
        //return res.status(500).send({ message: Err.AuthorizationErrors.INVALID_TOKEN_ERROR });
        return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      case Err.AuthorizationErrors.NO_TOKEN_PROVIDED:
        //return res.status(400).send({ error: Err.AuthorizationErrors.NO_TOKEN_PROVIDED });
        return res.status(400).send({ error: 'No token provided.' });
      default:
        console.log(e.name + ': ' + e.message);
        console.log(e.stack)
        //return res.status(400).send({error: Err.ServerErrors.ERROR_ON_SERVER});
        return res.status(400).send({ error: 'Error on the server' });
    }
  }
}
module.exports = verifyUser;

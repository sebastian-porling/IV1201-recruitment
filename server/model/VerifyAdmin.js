/** 
 * Middleware used to verify that an user attempting to access a page/route is an admin. 
 * @module VerifyAdmin 
 */
var User = require('../integration/User');
var Token = require('./Token');
var Err = require('../utility/ErrorEnums');
/**
 * Verifies that the current client is logged in as a user and has the role admin.  
 * @param req Contains information about the request made by the client to the server.
 * @param res Used to construct a response to the client.
 * @param next The next middleware that should be called if the client is logged in as an admin.
 * @returns HTTP response if error occured else nothing
 */
async function verifyAdmin(req, res, next) {
  try {
    //var token = req.session.token;
    //var token = req.headers['x-access-token'];
    var token = req.headers['authorization'];
    if (!token) throw Error(Err.AuthorizationErrors.NO_TOKEN_PROVIDED);
    var decodedToken = Token.verifyToken(token);
    user = await User.findUserById(decodedToken.id);
    if (!user) {
      throw Error(Err.AuthorizationErrors.USER_DOESNT_EXIST);
    }
    else if (!(user.role === "recruiter")) {
      throw Error(Err.AuthorizationErrors.UNAUTHORIZED_ACCESS_ATTEMPT);
    }
    else {
      req.userId = decodedToken.id;
      next()
    }
  }
  catch (e) {
    if (e.name === 'JsonWebTokenError') {
      console.log('Failed to authenticate token');
      //return res.status(400).send({ error: Err.AuthorizationErrors.INVALID_TOKEN_ERROR });
      return res.status(401).send({ auth: false, message: 'Failed to authenticate token.' });
    }
    else {
      switch (e.message) {
        case Err.AuthorizationErrors.NO_TOKEN_PROVIDED:
          console.log('No token provided');
          //return res.status(400).send({ error: Err.AuthorizationErrors.NO_TOKEN_PROVIDED });
          return res.status(400).send({ error: 'No token provided.' });
        case Err.AuthorizationErrors.USER_DOESNT_EXIST:
          console.log('No user found.');
          //return res.status(400).send({error: Err.AuthorizationErrors.USER_DOESNT_EXIST});   
          return res.status(400).send({ error: 'No user found.' });
        case Err.AuthorizationErrors.UNAUTHORIZED_ACCESS_ATTEMPT:
          console.log("unauthorized user attempted to access admin functionality");
          console.log(e.name);
          //return res.status(400).send({error: Err.AuthorizationErrors.UNAUTHORIZED_ACCESS_ATTEMPT}); 
          return res.status(400).send({ error: 'You are not authorized to view this page' });
        default:
          console.log(e.name + ': ' + e.message);
          console.log(e.stack)
          //return res.status(400).send({error: Err.ServerErrors.ERROR_ON_SERVER});
          return res.status(400).send({ error: 'Error on the server' });
      }
    }
  }
}
module.exports = verifyAdmin;

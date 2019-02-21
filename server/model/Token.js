/** 
 * Module used to verify and create tokens by acting as an interface to the jsonwebtoken module.  
 * @module Token
 */
var jwt = require('jsonwebtoken');
const serverSecret = 'supersecretstuff'
//var readfromenv= process.env.CONFIG;
/**
 * Creates a token using the server secret and a provided user id. 
 * @param userId The user id that will be stored in the token. 
 * @returns The created token if successful 
 */
exports.createToken = function createToken(userId) {
  var token = jwt.sign({ id: userId }, serverSecret, {
    expiresIn: 86400 // expires in 24 hours
  });
  return token;
}
/**
 * Verifies the given token by using the server secret. 
 * @param token the token that is to be verified 
 * @returns The decoded token if successful 
 */
exports.verifyToken = function verifyToken(token) {
  var decodedToken = jwt.verify(token, serverSecret);
  return decodedToken;
}

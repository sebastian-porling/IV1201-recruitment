/** 
 * Module used to hash and verify passwords by acting as an interface to the bcryptjs module.
 * @module Token
 */
var bcrypt = require('bcryptjs');
/**
 * Hash the given password 
 * @param password The password that should be hashed
 * @returns The hashed password
 */
exports.hashPassword = function hashPassword(password){
    var hashedPassword =  bcrypt.hashSync(password, 8);
    return hashedPassword;
}
/**
 * Hash the given password 
 * @param password The password that should be hashed
 * @returns The hashed password
 */
exports.verifyPassword = function verifyPassword(password, hashedPassword) {
    var valid = bcrypt.compareSync(password, hashedPassword); 
    return valid  
}
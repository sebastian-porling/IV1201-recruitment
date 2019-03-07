/** Module that defines Enums for different categories of errors that can occur. 
 * @module ErrorEnums
 */

 /**
 * Enum representing general server errors.
 * @enum {String}
 */
const ServerErrors = {
  ERROR_ON_SERVER: 'SE1'
};
exports.ServerErrors = ServerErrors;

/**
 * Enum representing authentication errors.
 * @enum {String}
 */
const AuthenticationErrors = {
  EMAIL_TAKEN: 'AUC1',
  USER_DOESNT_EXIST: 'AUC2',
  WRONG_USERNAME_OR_PASSWORD: 'AUC3'  
};

exports.AuthenticationErrors = AuthenticationErrors;



/**
 * Enum representing database errors
 * @enum {String}
 */
const DatabaseErrors = {
  MONGO_ERROR: 'DB1', 
  MONGO_NETWORK_ERROR: 'DB2',
  MONGO_WRITE_TRANSACTION_ERROR: 'DB3',
  UPDATE_UNSUCCESSFUL: 'DB4',
  NO_APPLICATION_FOUND: 'DB5'
};
exports.DatabaseErrors = DatabaseErrors;

/**
 * Enum representing authorization errors
 * @enum {String}
 */
const AuthorizationErrors = {
  NO_TOKEN_PROVIDED: 'AUZ1',
  INVALID_TOKEN_ERROR: 'AUZ2',
  USER_DOESNT_EXIST: 'AUZ3',
  UNAUTHORIZED_ACCESS_ATTEMPT: 'AUZ4',
  WRONG_PASSWORD: 'AUZ5'
};
exports.AuthorizationErrors = AuthorizationErrors;

/**
 * Enum representing validation errors
 * @enum {String}
 */
const ValidationErrors = {
  INVALID_FORMAT_ID: 'VAL1',
  INVALID_FORMAT_COMPETENCE: 'VAL2',
  INVALID_FORMAT_AVAILABILITY: 'VAL3',
  INVALID_FORMAT_EMAIL: 'VAL4',
  INVALID_FORMAT_PASSWORD: 'VAL5',
  INVALID_FORMAT_NAME: 'VAL6',
  INVALID_FORMAT_STATUS: 'VAL7',
  INVALID_FORMAT_TIMESTAMP: 'VAL8',
  INVALID_FORMAT_SSN: 'VAL9'
};
exports.ValidationErrors = ValidationErrors; 
















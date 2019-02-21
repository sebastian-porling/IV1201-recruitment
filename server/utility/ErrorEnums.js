
const ServerErrors = {
  ERROR_ON_SERVER: 'SE1'
};
exports.ServerErrors = ServerErrors;

const AuthenticationErrors = {
    EMAIL_TAKEN: 'AUC1',
    USER_DOESNT_EXIST: 'AUC2',
    WRONG_USERNAME_OR_PASSWORD: 'AUC3'  
  };
exports.AuthenticationErrors = AuthenticationErrors;

const DatabaseErrors = {
  MONGO_ERROR: 'DB1', 
  MONGO_NETWORK_ERROR: 'DB2',
  MONGO_TRANSACTION_ERROR: 'DB3'
};
exports.DatabaseErrors = DatabaseErrors;


const AuthorizationErrors = {
  NO_TOKEN_PROVIDED: 'AUZ1',
  INVALID_TOKEN_ERROR: 'AUZ2',
  USER_DOESNT_EXIST: 'AUZ3',
  UNAUTHORIZED_ACCESS_ATTEMPT: 'AUZ4',
  WRONG_PASSWORD: 'AUZ5'
};
exports.AuthorizationErrors = AuthorizationErrors;

const ValidationErrors = {
  INVALID_FORMAT_ID: 'VAL1',
  INVALID_FORMAT_COMPETENCE: 'VAL2',
  INVALID_FORMAT_AVAILABILITY: 'VAL3',
  INVALID_FORMAT_EMAIL: 'VAL4',
  INVALID_FORMAT_PASSWORD: 'VAL5',
  INVALID_FORMAT_NAME: 'VAL6',
  INVALID_FORMAT_STATUS: 'VAL7'
};
exports.ValidationErrors = ValidationErrors; 




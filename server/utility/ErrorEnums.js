
const ServerErrors = {
  ERROR_ON_SERVER: '1'
};
exports.ServerErrors = ServerErrors;

const AuthenticationErrors = {
    EMAIL_TAKEN: '1',
    USER_DOESNT_EXIST: '2',
    WRONG_USERNAME_OR_PASSWORD: '3'  
  };
exports.AuthenticationErrors = AuthenticationErrors;

const DatabaseErrors = {
  MONGO_ERROR: '1', 
  MONGO_NETWORK_ERROR: '2',
};
exports.DatabaseErrors = DatabaseErrors;


const AuthorizationErrors = {
  NO_TOKEN_PROVIDED: '1',
  INVALID_TOKEN_ERROR: '2',
  USER_DOESNT_EXIST: '3',
  UNAUTHORIZED_ACCESS_ATTEMPT: '4',
  WRONG_PASSWORD: '5'
};
exports.AuthorizationErrors = AuthorizationErrors;

const ValidationErrors = {
  INVALID_FORMAT_ID: '1',
  INVALID_FORMAT_COMPETENCE: '2',
  INVALID_FORMAT_AVAILABILITY: '3',
  INVALID_FORMAT_EMAIL: '4',
  INVALID_FORMAT_PASSWORD: '5',
  INVALID_FORMAT_NAME: '6'
};
exports.ValidationErrors = ValidationErrors; 




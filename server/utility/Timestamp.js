
/**
 * Module used to generate timestamps
 * @module Timestamp
 */

 /**
  * Gemerate a timestamp representing the current time and date 
  * @return Returns a timestamp representing the current time and date  
  */
exports.generateTimestamp = function generateTimestamp(){
        return new Date().toISOString();
}
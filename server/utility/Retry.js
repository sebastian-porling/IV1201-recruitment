/**
 * Used to retry a function if a specific error is caught 
 * @module Retry
 */

/**
 * @param fn The function that should be retried
 * @param attemptsLeft How many attemps should be made if attemptsLeft equals 1 then no additonal attempts will be made
 * @param error The name of the error that should be caught 
 * @param errormessage String that must be included in the thrown error message. 
 * @return The return value of the function fn if it succeeds. 
 */
module.exports = async function retry(fn, attemptsLeft, error, errormessage) {
  try {
    console.log('Retrying attempt: ' + attemptsLeft);
    return await fn();
  }
  catch (e) {
    if (attemptsLeft === 1) {
      throw e;
    }
    else {
      if (e.name === error && e.message.match(new RegExp(errormessage)) != null) {
        return await retry(fn, attemptsLeft - 1, error, errormessage);
      }
      else {
        throw e;
      }
    }
  }
}
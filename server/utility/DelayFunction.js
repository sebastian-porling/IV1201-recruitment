/**
 * Module used to delay the completion of a calling function 
 * @module DelayFunction
 */


 /**
  * Will delay the caller assuming the calle is awaited
  * @param milisec The delay in miliseconds 
  * @return Returns the message resolved if completed correctly 
  */
exports.resolveAftermilliSeconds = function resolveAftermilliSeconds(milisec) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('resolved');
      }, milisec);
    });
  }
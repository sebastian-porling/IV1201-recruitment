
var fs = require('fs');



function logger(error){
  const logmessage = 'Error occured'+String(error)+ '\nError message: '+ String(error.message) + '\nError stack trace: '+ String(error.stack);
  fs.appendFile("errorlog.txt", logmessage, function(res, err){
    if(err){
      console.log(err);
    }
  });
}
exports.log = logger; 
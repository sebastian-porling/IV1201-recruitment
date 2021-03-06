/**
 * Routes used for handling applications
 * @module applications
 */

const express = require('express');
const VerifyUser = require('../model/VerifyUser');
const VerifyAdmin = require('../model/VerifyAdmin');
const validate = require('../model/ValidateApplications');
const Applications = require('../integration/Applications');
var Err = require('../utility/ErrorEnums');
const Logger = require('../utility/Logger');
const router = express.Router();

/** 
 * @api {get} /all Get applications
*/
router.get('/all', VerifyAdmin, async (req, res) => {

    res.send(await Applications.findAllApplications());
  
});

/**
 * @api {get} / Get the logged in users application
 */
router.get('/', VerifyUser, async (req, res) => {
try{
  res.send(await Applications.findApplicationWithId(req.userId));
  }
  catch(e){
    Logger.log(e);
    switch(e.message) {
      case Err.DatabaseErrors.NO_APPLICATION_FOUND:
        console.log("No application found with given id");
        return res.status(400).send({error: 'No application found with given id.'});
        //return res.status(400).send({error: Err.DatabaseErrors.NO_APPLICATION_FOUND});
      default:
        console.log(e.name +': ' + e.message);
        console.log(e.stack)
        return res.status(400).send({error: 'Error on the server'});
        //return res.status(400).send({error: Err.ServerErrors.ERROR_ON_SERVER});

    }
  }
});

/**
 * @api {get} /:id Get user application
 */
router.get('/:id', VerifyAdmin, validate.validateApplicationsRoute('/:id'), async (req, res) => {
  try{
  res.send(await Applications.findApplicationWithId(req.params.id));
  }
  catch(e){
    Logger.log(e);
    switch(e.message) {
      case Err.DatabaseErrors.NO_APPLICATION_FOUND:
        console.log("No application found with given id");
        return res.status(400).send({error: 'No application found with given id.'});
        //return res.status(400).send({error: Err.DatabaseErrors.NO_APPLICATION_FOUND});
      default:
        console.log(e.name +': ' + e.message);
        console.log(e.stack)
        return res.status(400).send({error: 'Error on the server'});
        //return res.status(400).send({error: Err.ServerErrors.ERROR_ON_SERVER});

    }
  }
});

/** 
 * @api {post} / Create application 
 * 
 * @apiParam {number} id Users unique id
 * @apiParam [{string, number}] competences List with competences and years of experience
 * @apiParam [{Date, Date}] availability    List with dates, {from_date, to_date}
*/
router.post('/', VerifyUser, validate.validateApplicationsRoute('post/'), async (req, res) => {
  await Applications.createApplication(req.userId, req.body.competences, req.body.availability)
  res.status(200).send();
});

/**
 * @api {put} / Update application
 * 
 * @apiParam {number} id Users unique id
 * @apiParam [{string, number}] competences List with competences and years of experience
 * @apiParam [{Date, Date}] availability    List with dates, {from_date, to_date}
 */
router.put('/:id', VerifyUser, validate.validateApplicationsRoute('post/'), async (req, res) => {
  await Applications.updateApplication(req.userId, req.body.competences, req.body.availability)
  res.status(200).send();
});

/** 
 * @api {delete} /:id Delete application 
 * 
 * @apiParam {number} id Users unique id
*/
router.delete('/:id', VerifyAdmin, validate.validateApplicationsRoute('/:id'), async (req, res) => {
  await Applications.deleteApplication(req.params.id);
  res.status(200).send();
});

/** 
 * @api {put} /accept/:id Accept application
 * 
 * @apiParam {number} id Users unique id
*/

router.put('/primedb/:id', async (req, res) =>{
  try{
    await Applications.primedb(req.params.id);
    res.status(200).send('primed');
  }
  catch(e){
    Logger.log(e);
    console.log(e.message);
    console.log(e.stack);
  }


}

)
/** 
 * @api {put} /reject/:id Accept application
 * 
 * @apiParam {number} id Users unique id
 * @apiParam {string} the timestamp of the application when it was accepted
 */
router.put('/accept/:id/:timestamp', VerifyAdmin, validate.validateApplicationsRoute('/:id/:timestamp'), async (req, res) => {
  try{
     await Applications.acceptApplication(req.params.id, req.params.timestamp);
    res.status(200).send('ok');
  }
  catch(e){
    Logger.log(e);
    if(e.message === Err.DatabaseErrors.MONGO_WRITE_TRANSACTION_ERROR){
      res.status(400).send({error: "writeTransactionError"})
    }
    else if(e.message === Err.DatabaseErrors.UPDATE_UNSUCCESSFUL){
      res.status(400).send({error: "clientDataOutdated"});
    }
    else{
      console.log(e.message);
      console.log(e.stack);
      res.status(400).send({error: 'server error'})
    }
  }
});

/** 
 * @api {put} /reject/:id Reject application
 * 
 * @apiParam {number} id Users unique id
 * @apiParam {string} the timestamp of the application when it was rejected
 */
router.put('/reject/:id/:timestamp', VerifyAdmin, validate.validateApplicationsRoute('/:id/:timestamp'), async (req, res) => {
  try{
    await Applications.rejectApplication(req.params.id, req.params.timestamp);
    res.status(200).send('ok');
  }
  catch(e){
    Logger.log(e);
    if(e.message === Err.DatabaseErrors.MONGO_WRITE_TRANSACTION_ERROR){
      res.status(400).send({error: "writeTransactionError"})
    }
    else if(e.message === Err.DatabaseErrors.UPDATE_UNSUCCESSFUL){
      res.status(400).send({error: "clientDataOutdated"});
    }
    else{
      console.log(e.message);
      console.log(e.stack);
      res.status(400).send({error: 'server error'})
    }
    
  }
});


module.exports = router;

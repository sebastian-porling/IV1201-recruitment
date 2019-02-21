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
const router = express.Router();


router.get('/competences', async function (req,res){
  console.log('test');
  res.status(200).send('okok');
})


/** 
 * @api {get} /all Get applications
*/
router.get('/all', async (req, res) => {
  res.send(await Applications.findAllApplications());
});

router.get('/', VerifyUser, async (req, res) => {
  res.send(await Applications.findApplicationWithId(req.userId));
});

/**
 * @api {get} /:id Get user application
 */
router.get('/:id', VerifyUser, validate.validateApplicationsRoute('/:id'), async (req, res) => {
  res.send(await Applications.findApplicationWithId(req.params.id));
});

/** 
 * @api {post} / Create application 
 * 
 * @apiParam {number} id Users unique id
 * @apiParam [{string, number}] competences List with competences and years of experience
 * @apiParam [{Date, Date}] availability    List with dates, {from_date, to_date}
*/
router.post('/', VerifyUser, validate.validateApplicationsRoute('post/'), async (req, res) => {
  await Applications.createApplication(req.body.id, req.body.competences, req.body.availability)
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
    console.log(e.message);
    console.log(e.stack);
  }


}

)

router.put('/accept/:id/:timestamp', VerifyAdmin, validate.validateApplicationsRoute('/:id/:timestamp'), async (req, res) => {
  try{
     await Applications.acceptApplication(req.params.id, req.params.timestamp);
    res.status(200).send('ok');
  }
  catch(e){
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
 */
router.put('/reject/:id/:timestamp', VerifyAdmin, validate.validateApplicationsRoute('/:id/:timestamp'), async (req, res) => {
  try{
    await Applications.rejectApplication(req.params.id, req.params.timestamp);
    res.status(200).send('ok');
  }
  catch(e){
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

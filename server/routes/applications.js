const express = require('express');
const mongodb = require('mongodb');
const db = require('../integration/db');
const VerifyUser = require('../util/middleware/VerifyUser');
const VerifyAdmin = require('../util/middleware/VerifyAdmin');
ValidateApplications = require('../util/middleware/ValidateApplications');
const router = express.Router();

/** 
 * @api {get} / Get applications
*/
router.get('/', async (req, res) => {
    const applications = await db.loadUsersCollection();
    res.send(await applications.find({competences: {$exists : true}, availability: {$exists : true}}, {projection: {role: 0, password: 0, username: 0}}).toArray());
});

/**
 * @api {get} /:id Get user application
 */
router.get('/:id', VerifyUser, ValidateApplications('/:id'), async (req, res) => {
    const applications = await db.loadUsersCollection();
    res.send(await applications.find({_id: new mongodb.ObjectID(req.params.id)}, {projection: {role: 0, password: 0, username: 0}}).toArray());
});

/** 
 * @api {post} / Create application 
 * 
 * @apiParam {number} id Users unique id
 * @apiParam [{string, number}] competences List with competences and years of experience
 * @apiParam [{Date, Date}] availability    List with dates, {from_date, to_date}
*/
router.post('/', VerifyUser, ValidateApplications('post/'), async (req, res) => {
    const applications = await db.loadUsersCollection();
    await applications.updateOne({_id : new mongodb.ObjectID(req.body.id)},{$set: {competences: req.body.competences, availability: req.body.availability}},{ upsert: true });
    res.status(200).send();
});

/** 
 * @api {delete} /:id Delete application 
 * 
 * @apiParam {number} id Users unique id
*/
router.delete('/:id', VerifyAdmin, ValidateApplications('/:id'), async (req, res) => {
    const applications = await db.loadUsersCollection();
    await applications.updateOne({_id: new mongodb.ObjectID(req.params.id)}, {$unset: {competences:1, availability:1, status:1}},{ upsert: true });
    res.status(200).send();
});

/** 
 * @api {put} /accept/:id Accept application
 * 
 * @apiParam {number} id Users unique id
*/
router.put('/accept/:id', VerifyAdmin, ValidateApplications('/:id'), async (req, res) => {
    const applications = await db.loadUsersCollection();
    await applications.updateOne({_id: new mongodb.ObjectID(req.params.id)}, {$set: {status: "accepted"}},{ upsert: true });
    res.status(200).send();
});

/** 
 * @api {put} /reject/:id Reject application
 * 
 * @apiParam {number} id Users unique id
 */ 
router.put('/reject/:id', VerifyAdmin, ValidateApplications('/:id'), async (req, res) => {
    const applications = await db.loadUsersCollection();
    await applications.updateOne({_id: new mongodb.ObjectID(req.params.id)}, {$set: {status: "rejected"}},{ upsert: true });
    res.status(200).send();
});

module.exports = router;

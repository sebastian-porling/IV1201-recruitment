const express = require('express');
const mongodb = require('mongodb');
const db = require('../integration/db');

const router = express.Router();

// Get applications

router.get('/', async (req, res) => {
    const applications = await db.loadUsersCollection();
    res.send(await applications.find({competences: {$exists : true}, availability: {$exists : true}}, {projection: {role: 0, password: 0}}).toArray());
});

// Insert application
router.put('/', async (req, res) => {
    const applications = await db.loadUsersCollection();
    await applications.updateOne({_id : new mongodb.ObjectID(req.body.id)},{$set: {competences: req.body.competences, availability: req.body.availability}},{ upsert: true });
    res.status(200).send();
});

// Delete application
router.delete('/:id', async (req, res) => {
    const applications = await db.loadUsersCollection();
    await applications.updateOne({_id: new mongodb.ObjectID(req.params.id)}, {$unset: {competences:1, availability:1}},{ upsert: true });
    res.status(200).send();
});

// Accept application
router.put('/accept/', async (req, res) => {
    const applications = await db.loadUsersCollection();
    await applications.updateOne({_id: new mongodb.ObjectID(req.body.id)}, {$set: {status: "accepted"}},{ upsert: true });
    res.status(200).send();
});

// Reject application
router.put('/reject/', async (req, res) => {
    const applications = await db.loadUsersCollection();
    await applications.updateOne({_id: new mongodb.ObjectID(req.body.id)}, {$set: {status: "rejected"}},{ upsert: true });
    res.status(200).send();
});



module.exports = router;

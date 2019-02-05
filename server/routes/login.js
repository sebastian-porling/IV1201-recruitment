const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

//Do js stuff
router.get('/', (req, res) => {
 res.send('hello');
});
module.exports = router;



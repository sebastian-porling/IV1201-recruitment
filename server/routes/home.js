const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();



router.get('/', function (req, res) {
  res.send('/client/src/View/home.html');
});

module.exports = router;

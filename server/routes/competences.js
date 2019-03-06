const express = require('express');
const Applications = require('../integration/Applications');
const router = express.Router();

/**
 * @api {get} / Gets competences
 */
router.get('/', async (req, res) => {
	const result = await Applications.getCompetences();
	console.log(result);
  res.send(result);
});

module.exports = router;
const { Review, validate } = require('../models/review');

const express = require('express');
const router = express.Router();

// get all review

// get review by id

// create review
router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  // console.log(error);
  if (error) return res.status(400).send(error.message);
  res.send(req.body);
});

module.exports = router;
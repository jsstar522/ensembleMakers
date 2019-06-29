const { Review, validate } = require('../models/review');

const express = require('express');
const router = express.Router();

// get all review

// get review by id
router.get('/:id', async(req, res, next) => {
  let review = await Review.findOne({"orderNumber": req.params.id}).populate('customerId');
  if(!review) res.send(false);
  res.send(review);
});

// get review by customerId
router.get('/customer/:id', async(req, res, next) => {
  let review = await Review.findOne({"customerId": req.params.id}).populate('customerId');
  if(!review) res.send(false);
  res.send(review);
})

// create review
router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.message);
  let review = new Review(req.body);
  review = await review.save();
  res.send(review);
});

// patch review
router.patch('/:id', async(req, res, next) => {
  let review = await Review.findOne({"orderNumber": req.params.id});
  review["rating"] = req.body.rating;
  review["content"] = req.body.content;
  review.save();
  res.send(review);
})

module.exports = router;

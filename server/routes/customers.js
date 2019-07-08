const express = require('express');
const { Customer, validate } = require('../models/customer');

const router = express.Router();


// get all customerInfo
router.get('/', async(req, res, next) => {
  const customers = await Customer.find();
  res.send(customers);
})

// get customerInfo by id
router.get('/:id', async(req, res, next) => {
  const customer = await Customer.findById(req.params.id);
  if(!customer) return res.status(404).send(`Id ${req.params.id} is not found`);
  res.send(customer);
})

// post customerInfo
router.post('/', async(req, res, next) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.message);
  console.log(req.body);
  // customerInfo 생성
  let customer = new Customer(req.body);
  customer = await customer.save();
  res.send(customer);
})

// change customerInfo state
router.patch('/:id', async(req, res, next) => {
  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    // {"state": "proceessing"} or {"state": "ordered"}...
    req.body
  );
  await res.send(req.body);
})

module.exports = router;
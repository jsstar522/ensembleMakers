const express = require('express');

const { Order, validate } = require('../models/order');

const router = express.Router();

// get all order
router.get('/', async(req, res, next) => {
  const orders = await Order.find();
  res.send(orders);
});

// get order by id
router.get('/:id', async(req, res, next) => {
  // customerId로 조회
  let order = await Order.findOne({"customerId" : req.params.id}).populate('customerId');
  res.send(order);
})

// post order
router.post('/', async(req, res, next) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.message);
  console.log(req.body);
  let order = new Order(req.body);
  order = await order.save();
  res.send(order);
})

module.exports = router;
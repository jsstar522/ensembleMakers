const express = require('express');
const passport = require('passport');

const { hashPassword } = require('../lib/hashPassword');
const { OrderTemplate, validate } = require('../models/orderTemplate');

const router = express.Router();

// get orderTemplate by userNumber
router.get('/byNum/:id', async(req, res) => {
  let orderTemplate = await OrderTemplate.findOne({'userNumber': req.params.id})
  res.send(orderTemplate);
})

// post orderTemplate
router.post('/', async(req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.message);
  let orderTemplate = new OrderTemplate(req.body);
  orderTemplate = await orderTemplate.save();
  res.send(orderTemplate);
})

// patch orderTemplate by userId
router.patch('/byId/:id', async(req, res) => {
  let orderTemplate = await OrderTemplate.findOne({'userId': req.params.id})
  res.send(orderTemplate);
})

module.exports = router;
const mongoose = require('mongoose');
const { Schema } = mongoose;
const Joi = require('joi');

const orderSchema = new Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Customer"
  },
  model: {
    type: String,
  },
  rightSize: {
    type: String,
  },
  leftSize: {
    type: String,
  },
  last: {
    type: String,
  },
  sole: {
    type: String,
  },
  midsole: {
    type: String,
  },
  sockLining: {
    type: String,
  },
  heel: {
    type: String,
  },
  decoration: {
    type: String,
  },
  material: {
    type: String,
  },
  innerMaterial: {
    type: String,
  },
  color: {
    type: String,
  },
  detail: {
    type: String,
  },
  images: {
    type: [ String ]
  }
}, {
  // orderDate는 customerInfo 생성일로 해야함
  timestramps: true
});

const Order = mongoose.model('Order', orderSchema);

function validateOrder(order) {
  const schema = {
    customerId: Joi.string().required(),
    model: Joi.string(),
    rightSize: Joi.string(),
    leftSize: Joi.string(),
    last: Joi.string(),
    sole: Joi.string(),
    midsole: Joi.string(),
    sockLining: Joi.string(),
    heel: Joi.string(),
    decoration: Joi.string(),
    material: Joi.string(),
    innerMaterial: Joi.string(),
    color: Joi.string(),
    detail: Joi.string()
  }
  return Joi.validate(order, schema);
}

exports.orderSchema = orderSchema;
exports.validate = validateOrder;
exports.Order = Order;
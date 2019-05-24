const mongoose = require('mongoose');
const { Schema } = mongoose;
const Joi = require('joi');

const orderSchema = new Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Customer"
  },
  size: {
    type: String,
  }
}, {
  // orderDate는 customerInfo 생성일이다
  timestramps: true
});

const Order = mongoose.model('Order', orderSchema);

function validateOrder(order) {
  const schema = {
    customerId: Joi.string().required(),
    size: Joi.string()
  }
  return Joi.validate(order, schema);
}

exports.orderSchema = orderSchema;
exports.validate = validateOrder;
exports.Order = Order;
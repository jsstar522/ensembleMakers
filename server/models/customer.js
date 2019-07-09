const mongoose = require('mongoose');
const { Schema } = mongoose;
const Joi = require('joi');

const customerSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    type: String,
  },
  // 주문완료(ordered), 제작중(producing), 제작완료(finished)
  state: {
    type: String,
    default: "ordered"
  },
  makerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  }
}, {
  timestamps: true
});

const Customer = mongoose.model('Customer', customerSchema);

function validateCustomer(customer) {
  const schema = {
    name: Joi.string().required(),
    phone: Joi.string().required(),
    address: Joi.string(),
    makerId: Joi.string().required()
  }
  return Joi.validate(customer, schema);
}

exports.customerSchema = customerSchema;
exports.validate = validateCustomer;
exports.Customer = Customer;
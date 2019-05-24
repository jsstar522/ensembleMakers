const mongoose = require('mongoose');
const { Schema } = mongoose;
const Joi = require('joi');

const customerSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  address: {
    type: String,
  },
  // 제작전(ordered), 제작중(producing), 제작완료(finished)
  state: {
    type: String,
    default: "ordered"
  }
}, {
  timestamps: true
});

const Customer = mongoose.model('Customer', customerSchema);

function validateCustomer(customer) {
  const schema = {
    name: Joi.string().required(),
    phone: Joi.number().required(),
    address: Joi.string()
  }
  return Joi.validate(customer, schema);
}

exports.customerSchema = customerSchema;
exports.validate = validateCustomer;
exports.Customer = Customer;
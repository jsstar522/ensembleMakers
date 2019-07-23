const mongoose = require('mongoose');
const { Schema } = mongoose;
const Joi = require('joi');

const modelSchema = new Schema({
  
}, {
  // orderDate는 customerInfo 생성일로 해야함
  timestramps: true
});

const Model = mongoose.model('Model', modelSchema);

function validateOrder(model) {
  const schema = {
  }
  return Joi.validate(model, schema);
}

exports.modelSchema = modelSchema;
exports.validate = validateOrder;
exports.Model = Model;
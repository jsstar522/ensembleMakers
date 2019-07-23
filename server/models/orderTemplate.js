const mongoose = require('mongoose');
const { Schema } = mongoose;
const Joi = require('Joi');

const orderTemplateSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  userNumber: {
    type: Number,
    required: true,
    ref: "User"
  },
  template: {
    type: [ String ],
    default: ['모델', '라스트', '창', '중창', '굽', '장식', '까래', '소재', '내피', '오른발 사이즈', '왼발 사이즈', '색상']
  }
}, {
  timestamps: true
});

const OrderTemplate = mongoose.model('OrderTemplate', orderTemplateSchema);

function validateOrderTemplate(orderTemplate) {
  const schema = {
    userId: Joi.string().required(),
    userNumber: Joi.number().required(),
    template: Joi.array()
  }
  return Joi.validate(orderTemplate, schema);
}
exports.orderTemplateSchema = orderTemplateSchema;
exports.validate = validateOrderTemplate;
exports.OrderTemplate = OrderTemplate;
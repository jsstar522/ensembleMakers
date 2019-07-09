const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const { Schema } = mongoose;
const Joi = require('joi');

const orderSchema = new Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Customer"
  },
  orderNumber: {
    type: Number,
    required: true,
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
  },
  // 공정완료시각
  // 라스트
  lastComplete: {
    type: Date
  },
  // 재단
  cutComplete: {
    type: Date,
  },
  // 갑피
  upperComplete: {
    type: Date,
  },
  // 저부
  soleComplete: {
    type: Date,
  },
  // 진행상태
  processingState: {
    // 0 = 라스트, 1 = 재단, 2 = 갑피, 3 = 저부, 4 = 완료
    type: Number,
    default: 0,
  },
  review: {
    type: String,
  }
}, {
  // orderDate는 customerInfo 생성일로 해야함
  timestramps: true
});

// 주문번호 생성
// autoIncrement 초기화
autoIncrement.initialize(mongoose.connection);
orderSchema.plugin(autoIncrement.plugin, {
  model: 'Order', 
  field: 'orderNumber',
  startAt: 1000,
  incrementBy: 1
})

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
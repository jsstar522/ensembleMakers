const Joi = require('joi');
const mongoose = require('mongoose');

const { Schema } = mongoose;

const reviewSchema = new Schema({
  orderNumber: {
    type: Number,
    required: true,
    ref: "Order"
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Customer"
  },
  rating: {
    type: Number,
    required: true
  },
  content: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const Review = mongoose.model('Review', reviewSchema);

function validateReview(review) {
  const schema = {
    orderNumber: Joi.number().required(),
    customerId: Joi.string().required(),
    rating: Joi.number().required(),
    content: Joi.string().required(),
  }
  return Joi.validate(review, schema);
}

exports.reviewSchema = reviewSchema;
exports.validate = validateReview;
exports.Review = Review;

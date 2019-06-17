const Joi = require('joi');
const mongoose = require('mongoose');

const { Schema } = mongoose;

const reviewSchema = new Schema({
  orderNumber: {
    type: Number,
    required: true,
    ref: "Order"
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
    rating: Joi.number().required(),
    content: Joi.string().required(),
  }
  return Joi.validate(review, schema);
}

exports.reviewSchema = reviewSchema;
exports.validate = validateReview;
exports.Review = Review;
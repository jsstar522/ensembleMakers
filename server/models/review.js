const Joi = require('joi');
const mongoose = require('mongoose');

const { Schema } = mongoose;

const reviewSchema = new Schema({
  post_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true
  },
  // review_auth: {
  //   type: String,
  //   ref: "User",
  //   required: true
  // },
  review_rating: {
    type: String,
    required: true
  },
  review_content: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const Review = mongoose.model('Review', reviewSchema);

function validateReview(review) {
  const schema = {
    // email: Joi.string().required(),
    post_id: Joi.string().required(),
    review_rating: Joi.number().required(),
    review_content: Joi.string().required(),
  }
  return Joi.validate(review, schema);
}

exports.reviewSchema = reviewSchema;
exports.validate = validateReview;
exports.Review = Review;
const Joi = require('joi');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  images: [ String ],
  kinds: [{ size: String, quantity: Number }],
  totalQuantity: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  // host: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "User",
  //   required: true
  // },
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Portion"
  }]
}, {
  timestamps: true
});

const Post = mongoose.model('Post', postSchema);

function validatePost(post) {
  const schema = {
    title: Joi.string().required(),
    description: Joi.string().required(),
    images: Joi.array(),
    kinds: Joi.array(),
    price: Joi.number().min(1000).required(),
    totalQuantity: Joi.number(),
    // host: Joi.array().required(),
    participants: Joi.array()
  }
  return Joi.validate(post, schema);
}

exports.postSchema = postSchema;
exports.validate = validatePost;
exports.Post = Post;
const Joi = require('joi');
const mongoose = require('mongoose');

const { Schema } = mongoose;

const portionSchema = new Schema({
  post_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  quota: [{ size: String, quantity: Number }]
}, {
  timestamps: true
});

portionSchema.index({ post_id: 1, user_id: 1 }, { unique: true });
const Portion = mongoose.model('Portion', portionSchema);

function validatePortion(portion) {
  const schema = {
    post_id: Joi.string().required(),
    user_id: Joi.string().required(),
    quota: Joi.array()
  }
  return Joi.validate(portion, schema);
}

exports.portionSchema = portionSchema;
exports.validate = validatePortion;
exports.Portion = Portion;
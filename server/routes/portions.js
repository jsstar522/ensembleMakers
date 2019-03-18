const { Portion, validate } = require('../models/portion');
const { Post } = require('../models/post');
const { User } = require('../models/user');

const express = require('express');
const router = express.Router();

// get all portions
router.get('/', async (req, res) => {
  const portions = await Portion.find()
    .populate('post_id')
    .populate('user_id')
    .sort('post_id');

  res.send(portions);
});

// get portion by id
router.get('/:id', async (req, res) => {
  const portion = await Portion.findById(req.params.id)
    .populate('post_id')
    .populate('user_id');
  
  if (!portion) return res.status(404).send(`ID ${req.params.id} is not found`);
  
  res.send(portion);
});

// create portion
router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  
  if (error) return res.status(400).send(error.message);

  let portion = new Portion(req.body);
  portion = await portion.save();

  const post = await Post.findByIdAndUpdate(
    portion.post_id,
    { $push: { participants: portion._id }},
    { new: true }
  );

  const user = await User.findByIdAndUpdate(
    portion.user_id,
    { $push: { posts_join: post._id }},
    { new: true }
  );

  res.send(portion);
});

// create portion in post
router.post('/:id', async (req, res) => {
  const rebody = {...req.body, post_id: req.params.id};
  const { error } = validate(rebody);
  
  if (error) return res.status(400).send(error.message);

  let portion = new Portion(rebody);
  portion = await portion.save();

  const post = await Post.findByIdAndUpdate(
    req.params.id,
    { $push: { participants: portion._id }},
    { new: true }
  );

  const user = await User.findByIdAndUpdate(
    portion.user_id,
    { $push: { posts_join: post._id }},
    { new: true }
  );

  res.send(portion);
});

// update portion
router.patch('/:id', async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(400).send(error.message);

  const portion = await Portion.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.send(portion);
});

// delete portion
router.delete('/:id', async (req, res) => {
  let portion = await Portion.findByIdAndDelete(req.params.id);

  await Post.update( { _id: portion.post_id }, { $pullAll: { participants: portion._id } } );

  res.send(portion);
});

module.exports = router;
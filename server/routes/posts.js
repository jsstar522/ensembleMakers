const { Post, validate } = require('../models/post');
const { User } = require('../models/user');
const { Portion } = require('../models/portion');

const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// upload image
// create upload folder on disk
fs.readdir('uploads', (error) => {
  // disk에 uploads 폴더가 없을 시 생성
  if(error){
    fs.mkdirSync('uploads');
  }
});
// upload file on disk
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb){
      cb(null, 'uploads/');
    },
    filename(req, file, cb){
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + new Date().valueOf() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 }
});

router.post('/img', upload.single('images'), (req, res) =>{
  console.log(req.file);
  res.send(`/img/${req.file.filename}`);
})


// get all posts
router.get('/', async (req, res) => {
  const posts = await Post.find()
    .populate('host')
    .populate('participants')
    .sort('host');

  res.send(posts);
});

// get post by id
router.get('/:id', async (req, res) => {
  const post = await Post.findById(req.params.id)
    .populate('host')
    .populate('participants');
  
  if (!post) return res.status(404).send(`ID ${req.params.id} is not found`);
  
  res.send(post);
});

// multer 미들웨어를 끼지 않으면 req.body가 비어있다.
const multerMiddleware = multer({
  storage: multer.memoryStorage(),
});

// ** multerMiddleware 빼도 됨

// create post
router.post('/', multerMiddleware.single('images'), async (req, res) => {

  const { error } = validate(req.body);
  console.log(error);
  if (error) return res.status(400).send(error.message);
  console.log(req.body);
  let post = new Post(req.body);
  post = await post.save();

  await User.findByIdAndUpdate(
    post.host,
    { $push: { posts_host: post._id } },
    { new: true }
  );
  res.send(post);
});

// update post
router.patch('/:id', async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(400).send(error.message);

  const post = await Post.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.send(post);
});

// delete post
router.delete('/:id', async (req, res) => {
  let post = await Post.findByIdAndDelete(req.params.id);

  await User.update({ posts_host: post.host }, { $pullAll: { posts_host: post.host } });
  await Portion.deleteMany({ post_id: post._id  });

  res.send(post);
});

module.exports = router;
const { Model, validate } = require('../models/model');

const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// get all model
router.get('/', async(req, res, next) => {
  const models = await Model.find();
  res.send(models);
});

// get model by userId
router.get('/byId/:id', async(req, res, next) => {
  const models = await Model.find({makerId: req.params.id});
  res.send(models);
});

// image content patch
fs.readdir('uploads', (error) => {
  // uploads 폴더 생성
  if(error){
    fs.mkdirSync('uploads');
  }
});

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'uploads/');
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + new Date().valueOf() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 }
});

// post model
router.post('/', upload.single('modelImage'), async(req, res, next) => {
  let rebody = {};
  rebody.makerId = req.body.makerId;
  rebody.contents = JSON.parse(req.body.contents);
  if(req.file){
    rebody.modelImage = `/img/${req.file.filename}`;
  }

  const { error } = validate(rebody);
  if (error) return res.status(400).send(error.message);
  let model = new Model(rebody);
  model = await model.save();
  await res.send(model);
})

// patch model by Id
router.patch('/:id', async(req, res, next) => {
  const model = await Model.findById(req.params.id)
  model.contents = req.body;
  await model.save();
  await res.send({id: req.params.id, contents: req.body});
})

module.exports = router;
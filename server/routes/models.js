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

// get model by modelName
router.get('/byName/:name', async(req, res, next) => {
  const models = await Model.find({
    "contents.template": { $elemMatch: { "label": "모델", "value": req.params.name}}
  });
  // res.send(models);
  res.send(models[0])
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

router.delete('/:id', async(req, res, next) => {
  fs.unlink(`uploads/${req.body.modelImage}`, async(err) => {
    // db내용 삭제
    const model = await Model.deleteOne({
      "_id": req.params.id
    })
  })
  const deletedIndex = await req.body.index
  await res.send(JSON.stringify(deletedIndex))
})

// post model image
router.patch('/modelImg/:id', upload.single('modelImage'), async(req, res) => {
  // 이전에 있던 이미지 삭제
  fs.unlink(`uploads/${req.body.preImgName}`, async(err) =>{
    // 새로운 이미지 db 등록
    const model = await Model.findByIdAndUpdate(
      req.params.id,
      {
        "modelImage": `/img/${req.file.filename}`
      },
      { new: true }
    )
    await res.send({ id: req.params.id, imgName: `/img/${req.file.filename}`});
  })
})

// delete model image
router.delete('/modelImg/:id', async(req, res) => {
  // uploads/파일 삭제
  fs.unlink(`uploads/${req.body.preImgName}`, async(err) => {
    // db내용 삭제
    const model = await Model.findByIdAndUpdate(
      req.params.id,
      {
        "modelImage": null
      },
      { new : true }
    )
    await res.send({ id: req.params.id, imgName: null});
  })
})

module.exports = router;
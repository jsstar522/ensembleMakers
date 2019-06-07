const { Order, validate } = require('../models/order');

const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// get all order
router.get('/', async(req, res, next) => {
  const orders = await Order.find();
  res.send(orders);
});

// get order by id
router.get('/:id', async(req, res, next) => {
  // customerId로 조회
  let order = await Order.findOne({"customerId" : req.params.id}).populate('customerId');
  res.send(order);
})

// post order
router.post('/', async(req, res, next) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.message);
  console.log(req.body);
  let order = new Order(req.body);
  order = await order.save();
  res.send(order);
})

// input order contents (by patch)
router.patch('/:id', async(req, res, next) => {
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    req.body
  );
  await console.log(req.body)
  await res.send(req.body);
})

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

// post images
router.patch('/img/:id', upload.array('images', 10), async(req, res) => {
  let fileList = [];
  for(let i = 0; i < req.files.length; i++) {
    fileList.push(`/img/${req.files[i].filename}`)
  }
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    {
      $push: {"images": fileList}
    }
  )
  await res.send(fileList);
})

// delete images
router.delete('/img/:id', async(req, res) => {
  console.log(req.params.id);
  console.log(req.body.imgName)

  // uploads/파일 삭제
  fs.unlink(`uploads/${req.body.imgName}`, async(err) => {
    // db내용 삭제
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        // $pull: {"images": `/img/${req.body}`}
        $pull: { images: { $in: [`/img/${req.body.imgName}`] }}
      }
    )
    await res.send(req.body.imgName);
  })
  
})


module.exports = router;
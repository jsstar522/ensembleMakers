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
  let order = await Order.findOne({"customerId": req.params.id}).populate('customerId');
  res.send(order);
})

// get order by orderNumber
router.get('/byNum/:id', async(req, res, next) => {
  let order = await Order.findOne({"orderNumber": req.params.id}).populate('customerId');
  res.send(order);
})

// get order by orderNumber
router.get('/byNum/:id', async(req, res, next) => {
  let order = await Order.findOne({"orderNumber": req.params.id}).populate('customerId');
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
    req.body,
    { new: true }
  );
  // await console.log(req.body);
  await res.send(req.body);
})

// patch processing date
router.patch('/processingDate/:id/:processing', async(req, res, next) => {
  const processing = req.params.processing;
  const order = await Order.findById(req.params.id);
  order[processing] = new Date();
  await order.save();
  // await console.log(order);
  await res.send({"processing": processing, "date": order[processing]});
})

router.delete('/processingDate/:id/:processing', async(req, res, next) => {
  const processing = req.params.processing;
  let obj = {};
  obj[processing] = '';
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { $unset : obj }
  );
  await res.send(processing);
})

// change processing state
router.patch('/processingState/:id/:state', async(req, res, next) => {
  const state = req.params.state;
  const order = await Order.findById(req.params.id);
  if(state == 'next') {
    if(order['processingState'] > 3) {
      return res.status(400).send('제작 종료된 주문입니다.')
    }else {
      order['processingState'] += 1;
    }
  }else {
    if(order['processingState'] < 1 ) {
      return res.status(400).send('이전 단계로 돌아갈 수 없습니다.')
    }else {
      order['processingState'] -= 1;
    }
  }
  await order.save();
  // await console.log(order);
  await res.send(order);
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
  limits: { fileSize: 50 * 1024 * 1024 }
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
    },
    { new: true }
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
        // 해당 이름을 가지고 있는 image db에서 삭제 (직접적인 delete 쿼리가 없어 pull로 처리해야 함)
        $pull: { images: { $in: [`/img/${req.body.imgName}`] }}
      },
      { new : true }
    )
    await res.send(req.body.imgName);
  })
})

module.exports = router;

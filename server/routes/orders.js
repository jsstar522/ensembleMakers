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
  let order = await Order.findOne({"_id": req.params.id});
  res.send(order);
})

// get order by orderNumber
router.get('/byNum/:id', async(req, res, next) => {
  let order = await Order.findOne({"orderNumber": req.params.id})
  res.send(order);
})

// get orders by by makerId
router.get('/byMakerId/:id', async(req, res, next) => {
  // customerInfo, state, _id만 반환
  let order = await Order.find({"makerId": req.params.id},{customerInfo: true, state: true, _id: true});
  res.send(order);
})

// post order
router.post('/', async(req, res, next) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.message);
  let newOrder = req.body;
  // if order by model manager
  // copy model image
  if(req.body.modelImage) {
    // new model image name
    const ext = path.extname(req.body.modelImage);
    const newModelImage = path.basename(req.body.modelImage, ext) + '_copied_' + new Date().valueOf() + ext;

    await fs.copyFile(`uploads/${req.body.modelImage.split('/')[2]}`, `uploads/${newModelImage}`,(err) => {
      if (err) throw err;
    })

    newOrder.modelImage = `/img/${newModelImage}`;
  }

  let order = new Order(newOrder);
  order = await order.save();
  await res.send(order);
})

// input order contents (by patch)
router.patch('/:id', async(req, res, next) => {
  const order = await Order.findById(req.params.id)
  order.contents = req.body;
  await order.save();
  await res.send(req.body);
})

// delete order by id
router.delete('/:id', async(req, res, next) => {
  // image 삭제
  fs.unlink(`uploads/${req.body.modelImage}`, async(err) => {
    const order = await Order.deleteOne({
      "_id": req.params.id
    })
  })
  const deleteIndex = await req.body.index
  await res.send(JSON.stringify(deleteIndex))
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

// change state
router.patch('/changeState/:id', async(req, res, next) => {
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    // {"state": "proceessing"} or {"state": "ordered"}...
    req.body
  );
  await res.send(req.body);
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
    },
    { new: true }
  )
  await res.send(fileList);
})

// delete images
router.delete('/img/:id', async(req, res) => {
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

// post model image
router.patch('/modelImg/:id', upload.single('modelImage'), async(req, res) => {
  // 이전에 있던 이미지 삭제
  fs.unlink(`uploads/${req.body.preImgName}`, async(err) =>{
    // 새로운 이미지 db 등록
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        "modelImage": `/img/${req.file.filename}`
      },
      { new: true }
    )
    await res.send(`/img/${req.file.filename}`);
  })
})

// delete model image
router.delete('/modelImg/:id', async(req, res) => {
  // uploads/파일 삭제
  fs.unlink(`uploads/${req.body.preImgName}`, async(err) => {
    // db내용 삭제
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        "modelImage": null
      },
      { new : true }
    )
    await res.send(null);
  })
})

module.exports = router;
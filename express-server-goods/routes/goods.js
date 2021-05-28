let goodsService = require('../service/GoodsService.js').goodsService;

var express = require('express');
var router = express.Router();

/* GET GoodsList */
// 查询商品数据
router.get('/', async (req, res, next) => {
  let queryDTO = req.query;
  console.log(`queryDTO=${queryDTO}`);
  let result = await goodsService.findGoodsList(queryDTO);
  console.log(`result=${result}`);
  res.send(new ResponseResult().ok(result));
});

router.get('/byId/:id', async (req, res, next) => {
  let id = req.params.id
  console.log(`find by goods id=${id}`);
  let result = await goodsService.findById(id);
  console.log(`result=${result}`);
  // res.send(result);
  res.send(new ResponseResult().ok(result));
})

// 新增 商品数据
router.post('/', async (req, res, next) => {
  let addGoodsDTO = req.body;
  console.log(`addGoodsDTO=${addGoodsDTO}`);
  let result = await goodsService.addGoods(addGoodsDTO);
  console.log(`result=${result}`);
  // res.send(result);
  res.send(new ResponseResult().ok(result));
});

// 删除商品数据
router.delete('/:id', async (req, res, next) => {
  let id = req.params.id
  console.log(`delete goods id=${id}`);
  let result = await goodsService.deleteGoods(id);
  console.log(`result=${result}`);
  // res.send(result);
  res.send(new ResponseResult().ok(result));
});

// 更新商品数据
router.put('/:id', async (req, res, next) => {
  let id = req.params.id
  let updateDTO = req.body;
  console.log(`updateDTO=${updateDTO}`);
  let result = await goodsService.updateGoods(id, updateDTO);
  console.log(`result=${result}`);
  // res.send(result);
  res.send(new ResponseResult().ok(result));
});


class ResponseResult {
  constructor() {
    this.code = 2000;
    this.msg = 'OK';
    this.isSuccess = true;
    this.data = '';
  }
  ok(data) {
    this.data = data;
    return this;
  }
}

module.exports = router;
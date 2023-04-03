var express = require('express');
var router = express.Router();
const { Record } = require('../models/index');

/**
 * 添加打卡信息
 * /record
 */
router.post('/', function(req, res) {
  console.log(req.body)
  Record.create({
    ...req.body,
  })
  .then((r) => {
    res.json({
      code: 1,
      msg: '打卡成功',
      data: r
    })
  })
  .catch((err)=> {
    res.json({
      code: 0,
      msg: '添加打卡信息失败'
    })
  })
})

/**
 * 获取打卡信息
 * /record/${_id}
 */
router.get('/:date/:uid', function(req, res) {
  Record.findOneAndUpdate(
    { date: req.params.date,
      userId: req.params.uid
    },
    { ...req.body },
    {new: true}
  )
  .then((r) => {
    res.json(r)
  })
  .catch((err)=> {
    res.json({
      code: 0,
      msg: '失败'
    })
  })
})

/**
 * 可视化
 * /record/${_id}
 */
router.get('/:uid', function(req, res) {
  Record.find({'userId': req.params.uid})
  .then((r) => {
    res.json(r)
  })
  .catch((err)=> {
    res.json({
      code: 0,
      msg: '失败'
    })
  })
})
/**
 * 根据日期和用户id修改状态
 */
router.patch('/:date/:uid', function(req, res) {
  console.log(req.params.uid)
  Record.findOneAndUpdate(
    { date: req.params.date,
      userId: req.params.uid
    },
    { ...req.body },
    {new: true}
    )
  .then((r) => {
    res.json(r)
  })
  .catch((err)=> {
    res.json({
      msg: '失败',
      data:err
    })
  })
})

module.exports = router;

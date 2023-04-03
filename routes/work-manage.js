var express = require('express');
var router = express.Router();
const { Leave } = require('../models/index');

/**
 * 添加请假条信息
 * /work/leave
 */
router.post('/leave', function(req, res) {
  console.log(req.body)
  Leave.create({
    ...req.body,
  })
  .then((r) => {
    res.json({
      code: 1,
      msg: '添加请假信息成功',
      data: r
    })
  })
  .catch((err)=> {
    res.json({
      code: 0,
      msg: '添加请假信息失败'
    })
  })
})

/**
 * 审核请假条
 * /work/${lstate}
 */
router.get('/:state', function(req, res) {
  Leave.find({ auditState: req.params.state})
  .populate("categoryId")
  .then((r) => {
    res.json(r)
  })
  .catch((err)=> {
    res.json({
      code: 0,
      msg: '获取文章列表失败'
    })
  })
})

/**
 * 请假列表
 */
router.get('/list/:username/:roleType/:region', function(req, res) {
  console.log(req.params);
  if(req.params.roleType === '1'){
    Leave.find().populate("categoryId").sort({"auditState":1})
    .then((r) => {
      res.json(r)
      return 
    })
    
  }else if (req.params.roleType === '2'){
    Leave.find({ region: req.params.region}).populate("categoryId").sort({"auditState":1})
    .then((r) => {
      res.json(r)
    })
  }else if (req.params.roleType === '3') {
    Leave.find({ username: req.params.username}).populate("categoryId").sort({"auditState":1})
    .then((r) => {
      res.json(r)
    })
  }
  
})

/**
 * 根据请假条id修改状态
 */
router.patch('/:wid', function(req, res, next) {
  console.log(req.params)
  Leave.findByIdAndUpdate(
    req.params.wid,
    { ...req.body },
    { new: true}
    )
    .then((r) => {
      res.json(req)
    })
    .catch((err)=> {
      res.json({
        code: 0,
        msg: '失败'
      })
    })
})

module.exports = router;

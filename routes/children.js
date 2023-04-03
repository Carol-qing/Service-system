var express = require('express');
var router = express.Router();
var { Children } = require("../models/index")


router.get('/', function(req, res, next) {
    Children.find()
    // .populate("rightId")//关联children列表
    .then((r) => {
      res.json(r)
    })
    .catch((err)=> {
      res.json({
        code: 0,
        msg: '获取左侧列表失败',
        err:err
      })
    })
})

/**
 * id删除children列表
 * /children/${item.id}
 */
router.delete('/:cid', function(req, res, next) {
  console.log(req.params)
  Children .findByIdAndDelete(
    req.params.cid,
    )
    .then((r) => {
      res.json({
        code: 1,
        msg: '删除成功',
      })
    })
    .catch((err)=> {
      res.json({
        code: 0,
        msg: '删除失败'
      })
    })
})

/**
 * 根据id修改左侧列表
 * /rights/${item.id}
 */
router.patch('/:cid', function(req, res, next) {
  console.log(req.params)
  Children.findByIdAndUpdate(
    req.params.cid,
    { ...req.body },
    { new: true}
    )
    .then((r) => {
      res.json(r)
    })
    .catch((err)=> {
      res.json({
        code: 0,
        msg: '修改失败'
      })
    })
})

module.exports = router;

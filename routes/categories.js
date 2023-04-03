var express = require('express');
var router = express.Router();
var { Categories } = require("../models/index")

router.get('/', function(req, res, next) {
  Categories.find()
  .then((r) => {
    res.json(r)
  })
  .catch((err)=> {
    res.json({
      code: 0,
      msg: '查询分类列表失败'
    })
  })
})

/**
 * 根据id修改分类类型
 * /:cid
 */
router.patch('/:cid', function(req, res, next) {
    console.log(req.params)
    let r = Categories.findByIdAndUpdate(
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
          msg: '类型已被修改'
        })
      })
})

/**
 * 根据id删除类型
 * /delete/：cid
 */
router.delete('/delete/:cid', function(req, res, next) {
    console.log(req.params)
    Categories.findByIdAndDelete(
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

module.exports = router;

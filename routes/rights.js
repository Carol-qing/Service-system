var express = require('express');
var router = express.Router();
var { Rights } = require("../models/index")

/**
 * 获取左侧列表
 * /rights?_embed=children
 */
router.get('/', function(req, res, next) {
  Rights.aggregate([
    {
        $lookup: {
            from: "childrens", // 要关联查询的集合
            localField: "type", // rights集合中的_id
            foreignField: "right_type", // 要查询的集合的 关联id
            as: "children"
        }
    }
  ])
  // .populate("rightId")//关联children列表
  .then((r) => {
    res.json(r)
  })
  .catch((err)=> {
    res.json({
      code: 0,
      msg: '获取左侧列表失败'
    })
  })
})

router.get('/list', function(req, res, next) {
  Rights.find()
  .then((r) => {
    res.json(r)
  })
  .catch((err)=> {
    res.json({
      code: 0,
      msg: '获取左侧列表失败'
    })
  })
})

/**
 * id删除左侧列表
 * /rights/${item.id}
 */
router.delete('/:rid', function(req, res, next) {
  console.log(req.params)
  Rights.findByIdAndDelete(
    req.params.rid,
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
router.patch('/:rid', function(req, res, next) {
  console.log(req.params)
  Rights.findByIdAndUpdate(
    req.params.rid,
    { ...req.body },
    { new: true}
    )
    .then((r) => {
      res.json({
        code: 1,
        msg: '修改成功',
        data: r
      })
    })
    .catch((err)=> {
      res.json({
        code: 0,
        msg: '修改失败'
      })
    })
})

module.exports = router;

var express = require('express');
var router = express.Router();
var { Roles } = require("../models/index")


/* GET home page. */
router.get('/', function(req, res, next) {
  Roles.find()
  .then((r) => {
    res.json(r)
  })
  .catch((err)=> {
    res.json({
      code: 0,
      msg: '获取权限列表失败'
    })
  })
})

router.delete('/:rid', function(req, res, next) {
    console.log(req.params)
    Roles.findByIdAndDelete(
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

router.patch('/:rid', function(req, res, next) {
    console.log(req.params)
    let r = Roles.findByIdAndUpdate(
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

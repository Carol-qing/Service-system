var express = require('express');
var router = express.Router();
var { Artcles } = require("../models/index")

/**
 * 获取文章列表
 * /audit-manage/audit
 */
router.get('/audit-manage/audit', function(req, res, next) {
  Artcles.find({ author: req.params.uid})
  .populate("author", { password: 0})
  .then((r) => {
    res.json({
      code: 1,
      msg: '根据用户id获取文章列表成功',
      data: r,
    })
  })
  .catch((err)=> {
    res.json({
      code: 0,
      msg: '根据用户id获取文章列表失败'
    })
  })
})

module.exports = router;

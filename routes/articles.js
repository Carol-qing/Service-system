var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
  console.log(req.body);
  res.json({
    code: 1,
    msg: '发布文章成功'
  })
});

/**
 * 根据用户id查看用户文章列表
 */
router.get('/user:/:uid', function(req, res, next) {
  console.log(req.params);
  res.json({
    code: 1,
    msg: '获取文章查看内容成功'
  })
})

/**
 * 根据文章id查看用户文章详情
 */
router.get('/:aid', function(req, res, next) {
  console.log(req.params);
  res.json({
    code: 1,
    msg: '获取文章id查看用户文章详情'
  })
})

/**
 * 根据文章id删除文章
 */
router.delete('/:aid', function(req, res, next) {
  console.log(req.params);
  res.json({
    code: 1,
    msg: '获取文章id删除文章'
  })
})

/**
 * 根据文章id编辑文章
 */
router.patch('/:aid', function(req, res, next) {
  console.log(req.params);
  console.log(req.body);
  res.json({
    code: 1,
    msg: '获取文章id编辑文章'
  })
})

module.exports = router;

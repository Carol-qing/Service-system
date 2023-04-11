var express = require('express')
var router = express.Router()
var { Artcles } = require("../models/index")

/**
 * 撰写发布文章
 * /news
 */
router.post('/', function(req, res) {
  console.log(req.body)
  Artcles.create({
    ...req.body,
  })
  .then((r) => {
    res.json({
      code: 1,
      msg: '撰写文章成功'
    })
  })
  .catch((err)=> {
    res.json({
      code: 0,
      msg: '撰写文章失败',
      err:err
    })
  })
})

/**
 * 首页
 * /news
 */
router.get('/', function(req, res) {
  Artcles.aggregate([
    {
      $match:{
        "auditState": 2
      }
    },
    {
      $lookup: {
          from: "categories", 
          localField: "categoryId", 
          foreignField: "_id", 
          as: "data"
      }
    },
    {
      $match:{
        "data.type": 2
      }
    },
    {
      $sort: {
        view: -1
      }
    },
    {
      $limit: 5
    }
  ])
  .then((r) => {
    res.json(r)
  })
  .catch((err)=> {
    res.json({
      code: 0,
      msg: '根据用户id获取文章列表失败'
    })
  })
})

router.get('/elist', function(req, res) {
  Artcles.find({auditState: 2})
  .populate("categoryId")
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

router.get('/homelist', function(req, res) {
  Artcles.aggregate([
    {
      $match:{
        "auditState": 2
      }
    },
    {
      $lookup: {
          from: "categories", 
          localField: "categoryId", 
          foreignField: "_id", 
          as: "data"
      }
    },
    {
      $match:{
        "data.type": 1
      }
    },
    {
      $sort: {
        createTime: -1
      }
    },
    {
      $limit: 10
    }
  ])
  .then((r) => {
    res.json(r)
  })
  .catch((err)=> {
    res.json({
      code: 0,
      msg: '根据用户id获取文章列表失败'
    })
  })
})

/**
 * 草稿箱
 * /news?author=${username}&auditState=0&_expand=category
 */
router.get('/:uid', function(req, res) {
  Artcles.find({ userId: req.params.uid, auditState: 0})
  .populate("categoryId")//关联文章类型列表
  .then((r) => {
    res.json(r)
  })
  .catch((err)=> {
    res.json({
      code: 0,
      msg: '根据用户id获取文章列表失败'
    })
  })
})

/**
 * 审核列表
 * /news?author=${username}&auditState=0&_expand=category
 */
router.get('/list/:uid/:roleType/:region', function(req, res) {
  console.log(req.params);
  if(req.params.roleType === '1'){
    Artcles.find().populate("categoryId").sort({"auditState":1})
    .then((r) => {
      res.json(r)
      return 
    }) 
  }else if (req.params.roleType === '2'){
    Artcles.find({ region: req.params.region}).populate("categoryId").sort({"auditState":1})
    .then((r) => {
      res.json(r)
    })
  }else {
    Artcles.find({ userId: req.params.uid}).populate("categoryId").sort({"auditState":1})
    .then((r) => {
      res.json(r)
    })
  } 
})

/**
 * 根据文章状态获取文章列表(审核文章)
 */
router.get('/aduit/:auditState', function(req, res) {
  Artcles.find({ auditState: 1})
  .populate("categoryId")
  .populate("roleId") 
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
 * 个人文章审核状态
 */
router.get('/statelist/:uid', function(req, res) {
  console.log(req.params);
    Artcles.find({ userId: req.params.uid}).populate("categoryId").sort({"auditState":1})
    .then((r) => {
      res.json(r)
    })
})

/**
 * 发布管理
 */
router.get('/publish/:uid/:auditState', function(req, res) {
  console.log(req.params);
  Artcles.find({ userId: req.params.uid, auditState: req.params.auditState})
  .populate("categoryId")//关联文章类型列表
  .then((r) => {
    console.log('11fds');
    res.json({code: 1,
      msg: '删除文章成功',})
  })
  .catch((err)=> {
    res.json(err)
  })
})

/**
 * 根据用户id获取文章列表
 */
router.get('/:uid', function(req, res) {
  Artcles.find({ userId: req.params.uid})
  .populate("categoryId")
  .populate("roleId")
  .then((r) => {
    res.json(r)
  })
  .catch((err)=> {
    res.json({
      code: 0,
      msg: '根据用户id获取文章列表失败'
    })
  })
})

/**
 * 根据文章id获取文章详情信息
 * /news/${props.match.params.id}?_expand=category&_expand=role
 */
router.get('/preview/:aid', function(req, res, next) {
  console.log('dd',req.params.aid);
  Artcles.findByIdAndUpdate(
    req.params.aid,
    { $inc:{ view: 1 }}, //views+1
    { new: true } //查询最新的结果
    ) 
    .then((r) => {
      res.json(r)
      console.log(r);
    })
    .catch((err)=> {
      res.json({
        code: 0,
        msg: '根据文章id获取文章详情信息失败'
      })
    })
})

/**
 * 根据文章id删除文章
 * /news-manage/：aid
 */
router.delete('/:aid', function(req, res, next) {
  console.log(req.params)
  Artcles.findByIdAndDelete(
    req.params.aid,
    )
    .then((r) => {
      res.json({
        code: 1,
        msg: '删除文章成功',
      })
    })
    .catch((err)=> {
      res.json({
        code: 0,
        msg: '文章已被删除'
      })
    })
})

/**
 * 根据文章id修改文章
 * /news-manage/update/：aid
 */
router.patch('/:aid', async function(req, res, next) {
  console.log(req.params)
  let r = await Artcles.findByIdAndUpdate(
    req.params.aid,
    { ...req.body },
    { new: true}
    )
    .then((r) => {
      res.json(req)
    })
    .catch((err)=> {
      res.json({
        code: 0,
        msg: '文章已被修改'
      })
    })
})





module.exports = router;

var express = require('express');
const { User } = require('../models/index');
var router = express.Router();

// let { User } = require("../models/index")

/* 注册请求 */
// router.post('/', function(req, res, next) {
//   let username = req.body.username
//   let password = req.body.password
//   console.log(req.body)
//   if(!username || !password) {
//     res.json({
//       code:0,
//       msg:'注册失败-缺少参数'
//     })
//   }else {
//     // 创建用户，插入数据库
//     User.create(req.body)
//     .then(r => {
//       console.log(req.body);
//       res.json({
//         code:1,
//         msg:'注册成功'
//       })
//     }).catch(err => {
//       console.log(req.body)
//       res.json({
//         code: 0,
//         msg: '注册失败',
//         err: err
//       })
//     })
//   }
 
// })

/**
 * 获取所有用户
 * /user-manage/list
 */
router.get('/', function(req, res, next) {
   User.find().populate("roleId") //关联权限表
  .sort({"roleId": 1})
  .then((r) => {
    res.json(r)
  })
  .catch((err)=> {
    res.json({
      code: 0,
      msg: '获取用户列表失败'
    })
  })
})

/**
 * 添加用户
 * /users
 */
router.post('/', function(req, res, next) {
  console.log(req.body)
  User.create({
    ...req.body,
  })
  .then((r) => {
    res.json({
      code: 1,
      msg: '添加用户成功'
    })
  })
  .catch((err)=> {
    res.json({
      code: 0,
      msg: '添加用户失败'
    })
  })
})

/**
 * 根据用户id删除用户
 * /：uid
 * 前台：/${item.id}
 */
router.delete('/:uid', function(req, res, next) {
  console.log(req.params)
  User.findByIdAndDelete(
    req.params.uid,
    )
    .then((r) => {
      res.json({
        code: 1,
        msg: '删除用户成功',
      })
    })
    .catch((err)=> {
      res.json({
        code: 0,
        msg: '用户已被删除'
      })
    })
})

/**
 * 根据用户id修改用户信息
 * /users/${item._id}
 */
router.patch('/:uid',function(req, res, next) {
  console.log(req.params)
  let r = User.findByIdAndUpdate(
    req.params.uid,
    { ...req.body },
    { new: true}
    )
    .then((r) => {
      res.json({
        code: 1,
        msg: '修改用户信息成功',
        data: r
      })
    })
    .catch((err)=> {
      res.json({
        code: 0,
        msg: '用户信息已被修改'
      })
    })
})

module.exports = router;

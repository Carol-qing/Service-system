var express = require('express');
const jwt = require("jsonwebtoken");
var router = express.Router();
const { User } = require('../models/index');

/* GET home page. */
router.get('/', function(req, res) {
    console.log(req.body)
    let {username, password } = req.query;
    User.findOne({"username": username,"password": password}, (err, doc) => {
        if(username && password) {
            if (doc) {
                // 如果登陆成功，放回jwt，并且在token中存入用户名
                const token = jwt.sign({username:doc.username, _id: doc._id},'test12345',{
                    expiresIn:"30d",
                    algorithm:'HS256'
                })
                return res.json({ 
                    code: 0,
                    msg: '登录成功',
                    token,
                    doc
                })
            } else {
            console.log("登录失败");
            return res.send({ 
                code: 1, 
                err: '用户名或者密码错误' 
            });
            }
        }    
    })
    .populate("roleId", { password: 0})//关联文章列表
    // .then((r) => {
    //     res.json({
    //         code: 1,
    //         msg: '获取用户信息成功',
    //         data: r,
    //     })
    // })
    // .catch(()=> {
    //     res.json({
    //         code: 0,
    //         msg: '获取用户信息失败',
    //     })
    // })
});

module.exports = router;

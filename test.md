nodemon app.js //自动更新

## 脚手架
npm install express express-generator -g

## 接口开发restfulAPI-前后端分离
### 注册
请求方式：post
### 上传文件


## 关联查询（一对多）
添加虚拟字段

## Token （生成token）
jwt 代表JSON Web Token

npm install jsonwebtoken
const jwt = require("jsonwebtoken");
let token = jwt.sign({username; 'zhangsan'},'test123456',{expiresIn:'30d',algorithm:'HS356})

### jwt校验
npm install express-jwt
解析jwt
var { expressjwt } = require("express-jwt")
app.use()
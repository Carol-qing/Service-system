var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')

var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var usersRouter = require('./routes/user-manage');
var articlesRouter = require('./routes/news-manage');
var rightsRouter = require('./routes/rights');
var childrenRouter = require('./routes/children');
var publishRouter = require('./routes/publish-manage');
var workRouter = require('./routes/work-manage');
var regionsRouter = require('./routes/regions');
var rolesRouter = require('./routes/roles');
var categoriesRouter = require('./routes/categories');
var recordRouter = require('./routes/record')
// var { expressjwt } = require("express-jwt")

var app = express();

// 设置跨域访问
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin',req.headers.origin || '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');
  req.header('Access-Control-Allow-Credentials', true)
  next();
});


app.use(cors())
// app.post('/api/get',(req, res) => {
//   // 通过 req.query 获取客户端通过查询字符串，发送到服务器的数据
//   const query = req.query;
//   // 调用 res.send() 方法，向客户端响应处理的结果
//   res.send({
//     status: 0, // 0 表示处理成功，1 表示处理失败
//     msg: "GET 请求成功！", // 状态的描述
//     data: query, // 需要响应给客户端的数据
//   })
// })


// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 解析jwt
// app.use(
//   expressjwt({
//   secret:"test12345",
//   algorithms:['HS256'],
//   credentialsRequired: false,
// }).unless({
//   path: [
//     '/login',
//     '/\/users\/\w+/',
//     '/news',
//     '/rights',
//     '/regions',
//     '/children',
//     '/categories',
//   ]
// })
// )

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/users', usersRouter);
app.use('/roles', rolesRouter);
app.use('/news', articlesRouter);
app.use('/rights', rightsRouter);
app.use('/work', workRouter);
app.use('/record', recordRouter);
app.use('/regions', regionsRouter);
app.use('/children', childrenRouter);
app.use('/publish-manage', publishRouter);
app.use('/categories', categoriesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(8080,()=>{
  console.log('app listening on port 8080');
})

module.exports = app;

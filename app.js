var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();
var jwtUtil = require('./utils/jwtUtil')
// 匹配路由
var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var inoculatorRouter = require('./routes/inoculator');
var vaccineRouter = require('./routes/vaccine');
var institutionRouter = require('./routes/institution');
var orderRouter = require('./routes/order');
var feedbackRouter = require('./routes/feedback')
// 允许跨域
app.all('*', (req, res, next) => {
  // 设置允许跨域的域名
  res.header('Access-Control-Allow-Origin', '*')
  // 允许的header类型
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Token, Accept, X-Requested-With, X_Requested_With')
  // 跨域允许的请求方式
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
  //允许接收的请求头上加上一个Authorization，这样我们才能够将数据发送过去
  res.header('X-Powered-By', '3.2.1')
  // OPTIONS类型的请求 复杂请求的预请求
  if (req.method == 'OPTIONS') {
    res.sendStatus(200)
  } else {
    /*让options请求快速返回*/
    next()
  }
})
// 验证Token代码
app.use('*', (req, res, next) => {
  jwtUtil.verify(req.headers['authorization'], global.globalKey,
    // 验证成功执行
    decoded => {
      req.user = decoded
      next()
    },
    // 验证不通过执行
    () => {
      // 无需验证token白名单
      if (req.baseUrl === "/user/login" || req.baseUrl === '/user/register') return next()
      res.status(401).json({ status: false, error: 'Token is not valid' })
    }
  )
})


var cors = require('cors');
// body解析中间件
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/inoculator', inoculatorRouter);
app.use('/vaccine', vaccineRouter);
app.use('/institution', institutionRouter);
app.use('/order', orderRouter);
app.use('/feedback', feedbackRouter);




// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

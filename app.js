var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require("mongoose");
var pug = require('pug');
var session = require("express-session");
var MongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');
var multer  = require('multer');   // 上传文件中间件
// var upload = multer({dest: 'uploads/'})


mongoose.connect('mongodb://localhost/test');

pug.filters = {
  'truncate': function(str, num) {
    return str.replace(/<[^<>]*>/g, '').slice(0, 200) + "..."
  }
}



var index = require('./routes/index');
var posts = require('./routes/posts');
var auth = require('./routes/auth');
var admin = require('./routes/admin');
var users = require('./routes/users');


var models = require("./models/post");
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// session中间件
app.use(session({
  name: 'SESSION_KEY',   // 设置 cookie 中保存 session id 的字段名称
  secret: 'SECRET_KEY', // 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
  cookie: {
    maxAge: 3600000 // 过期时间，过期后 cookie 中的 session id 自动删除
  },
  store: new MongoStore({url : 'mongodb://localhost/test'}),
  resave: false,
  saveUninitialized: true
}));

// flash() 用来显示通知
app.use(flash());

// 设置模板全局常量
// app.locals.blog = {title: "hello", desc: "world"}
// 添加模板必需的三个变量
app.use(function(req, res, next) {
  res.locals.user = req.session.user;
  res.locals.success = req.flash('success').toString();
  res.locals.error = req.flash('error').toString();
  next();
})

app.use('/', index);
app.use('/posts', posts);
app.use('/auth', auth);
app.use('/admin', admin);
app.use('/users', users);

// 404 错误处理
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// 500 错误处理
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

// route module
var common = require('./routes/common');
var index = require('./routes/index');
var users = require('./routes/users');
var main = require('./routes/main');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 세션 처리
app.set('trust proxy', 1); // trust first proxy
app.use(session({
  secret: 'qqqpppqqq', // 적당히 만들어 넣기
  resave: false,
  saveUninitialized: true
  // cookie: { secure: true }
}));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', users);
// 요청 필터 등록하여 세션 처리, 세션이 존재할때만 하위 url 통과
app.use(function(req, res, next) {
  console.log( req.method, req.url, req.ip );
  if( common.isEmpty(req.session.uid) ) {
    res.redirect('/users/login');
  } else {
    next();
  }
});
app.use('/', index);
app.use('/main', main);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

module.exports = app;

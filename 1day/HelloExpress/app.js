
/**
 * Module dependencies.
 */

// 모듈 가져오기!! (express, http, path)
// 페이지 처리 모듈 가져오기
var express = require('express')
  , routes 	= require('./routes')  // 없는 경우 index
  , user 	= require('./routes/user') // 확장자를 안쓴 경우
  , http 	= require('http')
  , path 	= require('path');

// 모듈을 가져온다 => require('모듈명')
var mysql = require('mysql');

//익스프레스 생성
var app = express(); // 생성자를 부르는 것

// all environments
// 포트
console.log('포트 => ' + process.env.PORT);
app.set('port', process.env.PORT || 3000);
// 뷰 파일들의 위치
// 전역변수 : __dirname 현재위치까지 물리적 경로
console.log('현재위치 경로=> ' + __dirname);
app.set('views', __dirname + '/views');
// 뷰 랜더링 엔진 설정
app.set('view engine', 'ejs');

app.use(express.favicon()); //url 아이콘
app.use(express.logger('dev')); //로그 디버깅 모드
// get방식, post방식 데이터 파싱!!
app.use(express.bodyParser());
app.use(express.methodOverride());
// 라우터 사용
app.use(app.router);
// 정적 파일 위치 설정 (js, html, css, image, ...업로드된 파일들)
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// 라우트!! 라우팅!!
app.get('/', routes.index); // get 방식의 (url, method)
app.get('/users', user.list);
// 로그인 폼 생성 : get, /login
app.get('/login', user.login);
app.post('/login', user.loginProc);

// 회원가입 폼 : /join,   get
app.get('/join', user.join);
// 회원가입 처리 : /join, post, 데이터(uid, upw, name) : 성공하면 '/'로 이동
app.post('/join', user.joinProc);
// INSERT INTO `nodedb`.`users` (`uid`, `upw`, `name`, `regdate`) VALUES ('ncia', '1', '양재', '2018-02-06 15:38:25');

// express가 들어간다.
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

var express = require('express');
var router = express.Router();
const sql = require('./db/d6');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
// /users/login
router.get('/login', function(req, res, next) {
  // 로그인 폼
  res.render('page/login', { title: "로그인" });
});

router.post('/login', function(req, res, next) {
  // res.send('login!!!!!!!!!!!!!!!!!!!!');
  // 로그인 처리
  sql.login(req.body, (err, rows) => {
    if( err ) {
      res.render('common/alert', { msg: "시스템장애", url: "back"});
    } else {
      if( rows != null && rows.length > 0) {
        // 성공하면 세션 생성
        req.session.uid = req.body.uid;
        req.session.name = rows[0].name;
        // 메인 페이지로 이동
        res.redirect('/');
      } else {
        res.render('common/alert', { msg: "로그인 실패. 회원가입 후 이용하세요", url: "back"});
      }
    }
  });
  // 성공하면 세션 생성
  // 메인 페이지로 이동
});

// /users/logout
router.get('/logout', function(req, res, next) {
  req.session.name = null;
  // 세션 제거
  if( req.session.uid ) {
    req.session.uid = null;
    req.session.destroy((err) => {
      res.redirect('login');  
    });
  } else {
    req.session.uid = null;
    // 로그인으로 이동
    // 동일 프리픽스를 사용하는 url에서는 해당 이름을 생략가능
    // /user/login or login 가능하다.
    res.redirect('login');  
  }
  // 필요 기타 작업
  // 로그인으로 이동
});

module.exports = router;

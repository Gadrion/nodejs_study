var express = require('express');
var router = express.Router();
var common = require('./common');

/* GET home page. */
router.get('/', function(req, res, next) {
  // 세션 체크
  // console.log(req.session.uid);
  // if( common.isEmpty(req.session.uid) ) {
  //   res.redirect('/users/login');
  //   return;
  // }
  res.render('index', { title: '평창 관리자 프로그램 v1.0', name:req.session.name });
});

router.get('/chat', function(req, res, net) {
  res.render('page/chat', { title: '평창 관리자 프로그램 v1.0', name:req.session.name });
});
module.exports = router;

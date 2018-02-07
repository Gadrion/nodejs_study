var express = require('express');
var router = express.Router();
var user 	= require('./controller/user') // 확장자를 안쓴 경우

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', user.login);
router.post('/login', user.loginProc);
router.get('/join', user.join);
router.post('/join', user.joinProc);
router.get('/selectUser/:uid', user.selectUser);
router.put('/updateUser', user.updateUser);
//router.delete('/deleteUser', user.deleteUser);

module.exports = router;
var express = require('express');
var router = express.Router();

/* GET users listing. */
// /users/~
// /users
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// /users/login
router.get('/login', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;


/*
 * GET users listing.
 */
//var sql = require('./db/d5');
var sql = require('./db/d6');

exports.list = function(req, res){
  res.send("respond with a resource");
};

// 로그인 폼 페이지 처리
// /login
exports.login = function(req, res){
  res.render('loginForm', { name:'로그인'});
};
// 로그인 실제 처리
exports.loginProc = function(req, res) {
	// post 데이터 획득하기
	console.log( req.body );
	// 아이디 비번인 (1,1) 인 경우만 통과
	/*
	if ( req.body.uid === '1' && req.body.upw === '1') {
		res.send('login success');
	} else {
		res.send("<script>alert('login fail');history.back();</script>");
	}
	*/
	sql.loginEx(req.body, (err, rows)=>{
		if( err ) {
//			console.log('쿼리중 오류 : 실패');
			res.send("<script>alert('login fail');history.back();</script>");
		} else {
			if( rows != null && rows.length > 0 )
//				console.log('조회 성공 : 로그인 성공', rows[0].name);
				res.send('login success : ' + rows[0].name + '님 반갑습니다.');
			else
//				console.log('조회 결과 없음 : 로그인 실패');
				res.send("<script>alert('login fail');history.back();</script>");
		}
	});
};

// 회원가입 폼 페이지 처리
exports.join = function(req, res) {
	res.render('joinForm', { name: '회원가입' });
};

exports.joinProc = function(req, res) {
	console.log( req.body );
	
	sql.join(req.body, (err, result)=>{
		if( err ) {
			res.send("<script>alert('join fail');history.back();</script>");
			console.log('join fail11111111111111!!!!',err);
		} else {
			if( result != null && result.length > 0 ) {
//				res.send('join success : ' + req.body.name + '님 반갑습니다.');
				console.log('join success!!!!');
				res.render('index');
			} else {
				res.send("<script>alert('join fail');history.back();</script>");
				console.log('join fail2222222222222!!!!',err);
			}				
		}
	})
};
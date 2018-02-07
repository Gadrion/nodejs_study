
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

// 회원가입 폼
exports.join = function(req, res) {
	res.render('joinForm', { name: '회원가입' });
};

// 회원가입 처리
exports.joinProc = function(req, res) {
	console.log( req.body );
	
	sql.join(req.body, (err, result)=>{
		if( err ) {
			res.render('alert', { msg:'join fail', url:'back' });
		} else {
			console.log('else',result);
			if( result != null & result.affectedRows > 0 ) {
				res.render('alert', { msg:req.body.name + '님 반갑습니다.', url:'/' });
			} else {
				res.render('alert', { msg:'join fail', url:'back' });
			}				
		}
	});
};

// 회원 불러오기
// /selectUser/(uid)
exports.selectUser = (req, res) => {
	// get : req.query
	// post : req.body
	// 동적 파라미터 : req.params
	console.log( req.params.uid );
	
	// 필요하면 파라미터를 가공하여 구조를 맞춘다.
	sql.selectUser({ uid: req.params.uid }, (err, rows) => {
		if( err ) {
			res.render('alert', { msg: "회원 정보 불러오기 실패", url: "back" });
		} else {
			if( rows != null && rows.length > 0 )
				res.render('updateForm', { title: "회원정보수정", user: rows[0] });
			else
				res.render('alert', { msg: "회원 정보 불러오기 실패", url: "back" });
		}
	});
};

exports.updateUser = (req, res) => {
	console.log( req.body, req.method );
//	res.send('ok');
	sql.updateUser(req.body, (err, result) => {
		if( err ) {
			res.render('alert', { msg:'updateUser fail', url:'back' });
		} else {
			console.log('else',result);
			if( result != null & result.affectedRows > 0 ) {
				res.render('alert', { msg:req.body.name + '님 반갑습니다.', url:'/' });
			} else {
				res.render('alert', { msg:'updateUser fail', url:'back' });
			}				
		}
	});
};

exports.deleteUser = (req, res) => {
	console.log( req.body, req.method );
	res.send('ok');
};
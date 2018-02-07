// 디비 테스트 1
// 모듈가져오기, 연결, 해제
var mysql = require('mysql');

exports.login = function(uid, upw) {
	//디비 연결 정보 리터럴 객체
	var config = {
		host	: 'localhost',
		user	: 'root',
	    password: '1234',
	    database:'nodedb'
	};

	//디비 연결
	var connection = mysql.createConnection(config);
	// 연결
	connection.connect((err)=>{
		if( err ) console.log('연결 실패', err);
		else {
			console.log('연결 성공');
			console.log('커리 수행');
			var sql = "select * from users where uid=? and upw=?;";
			connection.query(sql, [uid, upw], (err, results, fields) => {
				// 접속 종료
				connection.end((err)=> {
					console.log('연결 종료' + err);
				});
//				console.log( err, results, fields );
				if( err ) {
					console.log('쿼리중 오류 : 실패');
				} else {
					if( results != null && results.length > 0 )
						console.log('조회 성공 : 로그인 성공', results[0].name);
					else
						console.log('조회 결과 없음 : 로그인 실패');
				}
			});
		}
	});
};

// 내부에서 부를때는 exports. 붙여야 한다. (모듈화 된 요소는)
//exports.login('ncia','1');

exports.loginEx = function( param, cb ) {
	//디비 연결 정보 리터럴 객체
	var config = {
		host	: 'localhost',
		user	: 'root',
	    password: '1234',
	    database:'nodedb'
	};

	//디비 연결
	var connection = mysql.createConnection(config);
	// 연결
	connection.connect((err)=>{
		if( err ) console.log('연결 실패', err);
		else {
			console.log('연결 성공');
			console.log('커리 수행');
			var sql = "select * from users where uid=? and upw=?;";
			connection.query(sql, [param.uid, param.upw], (err, results, fields) => {
				// 접속 종료
				connection.end((err)=> {
					console.log('연결 종료' + err);
				});
//				console.log( err, results, fields );
				// 결과 돌려주기
				cb( err, results );
			});
		}
	});
};
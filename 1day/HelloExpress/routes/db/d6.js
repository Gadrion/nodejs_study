// 디비 테스트 1
// 모듈가져오기, 연결, 해제
var pool = require('./pool');

exports.loginEx = function( param, cb ) {
	
	// 커넥션을 빌린다.
	pool.acquire((err, conn)=>{
		if( err ) {
			cb( err, [] );
		} else {
			// 쿼리수행
			var sql = "select * from users where uid=? and upw=?;";
			conn.query(sql, [param.uid, param.upw], (err, results, fields) => {
				// 커넥션 반납
				pool.release(conn);
				// 쿼리 결과 반납
				cb( err, results );
			});
		}
	});
};

exports.join = function( param, cb ) {
	pool.acquire((err, conn) =>{
		if( err ) {
			cb( err, []);
		} else {
			var sql = "INSERT INTO `nodedb`.`users` (`uid`, `upw`, `name`, `regdate`) VALUES (?, ?, ?, '2018-02-06 15:38:25')";
			conn.query(sql, [param.uid, param.upw, param.name], (err, results, fields) => {
				// 커넥션 반납
				pool.release(conn);
				// 쿼리 결과 반납
				cb( err, results );
			});
		}
	})
}
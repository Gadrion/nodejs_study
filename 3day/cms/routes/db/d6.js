// 디비 테스트 1
// 모듈가져오기, 연결, 해제
var pool = require('./pool');

exports.login = function( param, cb ) {
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
	pool.acquire((err, conn) => {
		if( err ) {
			cb( err, []);
		} else {
			var sql = "INSERT INTO `nodedb`.`users` (`uid`, `upw`, `name`) VALUES (?, ?, ?)";
			conn.query(sql, [param.uid, param.upw, param.name], (err, results, fields) => {
				// 커넥션 반납
				pool.release(conn);
				// 쿼리 결과 반납
				cb( err, results );
			});
		}
	})
};

exports.selectUser = function( param, cb ) {
	pool.acquire((err, conn) => {
		if( err ) {
			cb(err, []);
		} else {
			var sql = "select * from users where uid=?";
			conn.query(sql, [param.uid], (err, results, fields) => {
				// 커넥션 반납
				pool.release(conn);
				// 쿼리 결과 반납
				cb( err, results );
			})
		}
	})
};

exports.updateUser = function( param, cb ) {
	pool.acquire((err, conn) => {
		if( err ) {
			cb(err, []);
		} else {
			var sql = "UPDATE users SET upw=?, name=? where uid=?;";
			conn.query(sql, [param.upw, param.name, param.uid], (err, results, fields) => {
				// 커넥션 반납
				pool.release(conn);
				// 쿼리 결과 반납
				cb( err, results );
			})
		}
	})
};
/**
 * tbl_epl 관련 쿼리
 */

var pool = require('./pool');

// epl 순위 리스트 정보 획득
exports.mainHome = function( param, cb ) {
	
	// 커넥션을 빌린다.
	pool.acquire((err, conn)=>{
		if( err ) {
			cb( err, [] );
		} else {
			// 쿼리수행
			var sql = "select * from tbl_epl;";
			conn.query(sql, ( err, rows ) => {
				// 커넥션 반납
				pool.release(conn);
				// 쿼리 결과 반납
				cb( err, rows );
			});
		}
	});
};

//epl 순위 리스트 정보 획득
exports.search = function( param, cb ) {	
	pool.acquire((err, conn)=>{
		if( err ) {
			cb( err, [] );
		} else {
			var sql = "select * from tbl_epl where name like '%" + param.searchTeam + "%';";
			conn.query(sql, ( err, rows ) => {
				pool.release(conn);
				cb( err, rows );
			});
		}
	});
};
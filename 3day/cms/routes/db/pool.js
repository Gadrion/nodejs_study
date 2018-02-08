// mysql 디비 풀링
var Pool = require('generic-pool').Pool;
var mysql = require('mysql');

// 풀링 생성
var pool = new Pool({
	name:'mysql conn pool',
	create: function(cb){
		var config = {
			host	: 'node-study.cmzlrga5twes.us-east-2.rds.amazonaws.com',
//			host	: 'localhost',
			user	: 'root',
		    password: '12341234',
		    database:'nodedb'
		};
		var connection = mysql.createConnection(config);
		connection.connect((err)=>{
			// 연결후 결과 반환
			cb( err, connection );
		});
	},
	destroy:function(conn){
		conn.end((err)=> {
			console.log('연결 종료' + err);
		});
	},
	max: 10,
	min: 5,
	log: false,
	idleTimeoutMillis: 1000*600
});

// 종료시 연결 해제 처리 (이벤트 등록)
process.on('exit', (code)=> {
	// 디비 연결을 모두 끊어라
	pool.drain(()=>{
		pool.destroyAllNow();
	});
});

// 예외시 처리 (app.js에 좀 더 맞음)
process.on('uncaughtExceptions', (err) => {
	console.log('오류', err);
});

// 객체 모듈화
module.exports = pool;

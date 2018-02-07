// 디비 테스트 1
// 모듈가져오기, 연결, 해제
var mysql = require('mysql');

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
		connection.end((err)=> {
			console.log('연결 종료' + err);
		});
	}
});
// 로그인 모듈 가져다 사용
var d5 = require('./d5');

// 불가능함 : 비동기라서
//var nRtn = d5.login('ncia','1');

// 비동기 코드인데 언제나올지 모르는 결과를 받아야 한다. 받으면 다음 단계를 진행
d5.loginEx({uid:'ncia',upw:'1'}, (err, rows)=>{
	if( err ) {
		console.log('쿼리중 오류 : 실패');
	} else {
		if( rows != null && rows.length > 0 )
			console.log('조회 성공 : 로그인 성공', rows[0].name);
		else
			console.log('조회 결과 없음 : 로그인 실패');
	}
});
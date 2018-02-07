/*
 *  모듈 만들기
 *  var ~, function ~ => private 변수, 함수
 *  모듈 내부에서만 사용 가능하다
 *  외부에서도 사용이 가능하도록 모듈화 시키는 방법 => exports
 */

var name = 'ncia';
exports.name2 = 'ncia';

function getName() {
	return name;
}

//var getAge   = function( age );
exports.getAge = function ( age ) {
	return '나이는: ' + age;
};
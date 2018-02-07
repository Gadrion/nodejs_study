// 페이지 처리
// 로그인폼 (get, /login)
var fs = require('fs');

exports.getLoginForm = function (req, res) {
//	res.writeHead(200, {'Content-Type': 'text/plain; charset=utf8'});
	res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'}); // html을 읽겠다는 의미이다.
	fs.readFile('loginForm.html', (err, data) => { // 처음에 err, 2번째 data는 통상적으로 표현한다.
		if (err) throw err;
		else 	 res.end(data);;
	});
	// 동적 구성을 하기가 쉽지 않다. 클라이언트가 해줘야 하는 부분이 생김.
//	res.end('login form page\n');
};
// 로그인  처리 (post, /login)
exports.getLoginProcess = function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/plain; charset=utf8'});
	res.end('login process page\n');
};

// 페이지 없음 (무관(method), 무관(url))
exports.notFound = function (req, res) {
	res.writeHead(404, {'Content-Type': 'text/plain; charset=utf8'});
	res.end('404 not found \n');
};
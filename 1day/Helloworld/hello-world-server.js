// http 모듈을 획득, 생성
// require('http') 1회 생성 후 캐싱되어서 여러 코드에서 적용되어 사용된다.
var http = require('http');
var page = require('./t3');

function handler(req, res) {
	console.log( req );
	// 요청을 분석하여 원하는 페이지를 돌려주고 데이터를 추출하는 등 응답의 앞부분에서 요청을 분석하여 나누는 코드
	// 역할 => 라우트 route, 행위 : 라우팅
//	if( req.url === '/login') { ------------------------------------------------------------------------------------- 1
//	res.writeHead(404, {'Content-Type': 'text/plain; charset=utf8'}); ------------------------------------------------------------------------------------- 1
	if( req.url.indexOf('/login') >= 0) {
		if( req.method === 'GET') {
//			res.end('login form page\n'); ------------------------------------------------------------------------------------- 2
			page.getLoginForm(req, res);
		} else {
//			res.end('login process page\n'); ------------------------------------------------------------------------------------- 2
			page.getLoginProcess(req, res);
		}
//		res.writeHead(200, {'Content-Type': 'text/plain; charset=utf8'});
//	    res.end('login page 로그인 페이지\n'); ------------------------------------------------------------------------------------- 1
	} else {
//	    res.end('404 not found \n'); ------------------------------------------------------------------------------------- 2
		page.notFound(req, res);
	}
//    res.writeHead(200, {'Content-Type': 'text/plain'}); ------------------------------------------------------------------------------------- 1
//    res.end('Hello World\n'); ------------------------------------------------------------------------------------- 1
}

http.createServer(handler).listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');

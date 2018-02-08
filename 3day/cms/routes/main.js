var express = require('express');
var router = express.Router();
var epl_sql = require('./db/epl_sql');

/* url : /main
 * comment : epl 순위 리스트를 뿌려준다.
 */
router.get('/', (req, res, next) => {
	epl_sql.mainHome({}, (err, rows) => {
		console.log(rows);
		res.render('page/main', { title: '평창 관리자 프로그램 v1.0', name:req.session.name, data: rows });
	});
});

/* url : /main/search
 * comment : epl 검색
 */
router.get('/search', (req, res, next) => {
	epl_sql.search(req.query, (err, rows) => {
//		console.log(rows);
//		res.render('main', { data: rows });
//		res.json(rows);
//		res.json({code:1, data:rows});
		var code = 0;
		if( rows!=null && rows.length > 0) {
			code = 1;
		}
		res.json({code:code, data:rows});
	});
});

module.exports = router;

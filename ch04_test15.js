
/**
 * 4장 Test 15
 * 
 * 로그 남기기 : winston 모듈을 이용해 로그 남기기
 */

var winston = require('winston');    				// 로그 처리 모듈
var winstonDaily = require('winston-daily-rotate-file');    	// 로그 일별 처리 모듈
var moment = require('moment');    				// 시간 처리 모듈

function timeStampFormat() {
    return moment().format('YYYY-MM-DD HH:mm:ss.SSS ZZ'); // '2016-05-01 20:14:28.500 +0900'
};

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
      //
      // - Write to all logs with level `info` and below to `combined.log` 
      // - Write all logs error (and below) to `error.log`.
      //
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'combined.log' })
    ]
  });

  if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
      format: winston.format.simple()
    }));
  }

logger.info('기존 파일 삭제함.');

var fs = require('fs');

// var inname = './output.txt';
// var outname = './output2.txt';

// fs.exists(outname, function (exists) {
//     if (exists) {
//     	fs.unlink(outname, function (err) {
//     		if (err) throw err;
//     		logger.info('기존 파일 [' + outname +'] 삭제함.');
//     	});
//     }
    
//     var infile = fs.createReadStream(inname, {flags: 'r'} );
// 	var outfile = fs.createWriteStream(outname, {flags: 'w'});

// 	infile.pipe(outfile);
// 	logger.info('파일 복사 [' + inname + '] -> [' + outname + ']');
// });



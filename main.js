const url = require('url');

const curURL = url.parse('https://search.naver.com/search.naver?sm=top_hty&fbm=0&ie=utf8&query=steve+jobs');

const curStr = url.format(curURL);

console.log('주소 문자열 : ', curStr);
console.dir(curURL);

const queryString = require('querystring');
const param = queryString.parse(curURL.query);

console.log('query', param.query);
console.log('original', queryString.stringify(param));

// process.on('exit', () => {
//     console.log('exit');
// });


// console.log('2 second after exit');

// setTimeout(() => {
//     process.exit();
// }, 2000);


process.on('test', fuck => {
    console.log('fuck!!!!!', fuck);
    process.exit();
});

console.log('test is comming');
setTimeout(() => {
    process.emit('test', 'siba!!!!');
}, 2000);

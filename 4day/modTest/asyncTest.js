/**
 * async module, 비동기 작업들을 모와서 일괄처리
 * 콜백이 깊어지는 문제를 해결할 수 있다.
 * 모델
 *  - waterfull
 *   수행 => 결과를 들고 다음 수행 => 결과를 들고, ....-> 최종 처리
 *  - series
 *   수행 => 결과를 들고 다음 수행 => 결과를 들고, ....-> 최종 처리
 *  - parelel
 *   각자 수행(멀티쓰레드 같은) => 최종에 취합
 */

 var async = require('async');
 var fs = require('fs');

 // 원본 코드
//  fs.readFile("a.txt", function(arr, data) {
//      if(err) {

//      } else {
//         console.log(data);
//         var r1 = data.toString();
//         fs.readFile("a.txt", function(err1, data1){
//             var r2 = data1.toString();
//             fs.readFile("a.txt", function(err2, data2){
//                var r3 = data2.toString();
//                console.log(r1 + " " + r2 + " " + r3);
//            });
//         });
//      }
//  });

 // waterfull
 // 읽고, 읽고, ... => 최종
//  exports.aa
//  async.waterfall(
//      [
//         function(cb){
//             console.log(1);
//             fs.readFile("a.txt", function(err, data){
//                 cb( null, data.toString());
//             });
//         },
//         function(data, cb){
//             console.log(2);
//             fs.readFile("a.txt", function(err, data1){
//                 cb( null, data + ',' + data1.toString());
//             });
//         }
//      ], function(err, results){
//          console.log(3);
//          console.log(err, results);
//         //  ccb
//  });

 // 결과를 모은다!!
//  async.series(
//      [
//         function(cb){
//             console.log(1);
//             fs.readFile("a.txt", cb);
//         },
//         function(cb){
//             console.log(2);
//             fs.readFile("a.txt", cb);
//         },
//         function(cb){
//             console.log(3);
//             fs.readFile("a.txt", cb);
//         },
//      ], function(error, result){
//         if(error) console.log(error);
//         result.map(r => {
//             console.log(r.toString());
//         });
//     //  for(i of result) {
//     //     console.log( i.toString() );
//     //  }
//  });


// 자유 경쟁을 통해 각각 실행되서 취합된다.
// 순서는 중요하지 않다. 전체 총 수행시간이 중요하면 적합
async.parallel(
    [
       function(cb){
           console.log(1);
           for(var i=0;i<10; i++)
           {
               console.log();
           }
           fs.readFile("a.txt", cb);
       },
       function(cb){
           console.log(2);
           fs.readFile("a.txt", cb);
       },
       function(cb){
           console.log(3);
           fs.readFile("a.txt", cb);
       },
       function(cb){
        console.log(4);
        fs.readFile("a.txt", cb);
    },
    function(cb){
        console.log(5);
        fs.readFile("a.txt", cb);
    },
    function(cb){
        console.log(6);
        fs.readFile("a.txt", cb);
    },
    function(cb){
        console.log(7);
        fs.readFile("a.txt", cb);
    },
    function(cb){
        console.log(8);
        fs.readFile("a.txt", cb);
    },
    ], function(error, result){
        if(error) console.log(error);
        result.map(r => {
            console.log(r.toString());
        });
   //  for(i of result) {
   //     console.log( i.toString() );
   //  }
});
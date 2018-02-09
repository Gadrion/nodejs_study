// 싱글쓰레드 기반 nodejs 운영시 하드웨어의 cpu를 모두 사용하지 않는 경우가 존재함
// 멀티코어, 쿼드쿼어 등등...
var cluster  = require('cluster');
var http     = require('http');
// cpu 개수
var cpu_num  = require('os').cpus().length;
console.log("cpu_num", cpu_num);

if( cluster.isMaster ){
    console.log( process.pid+"[0] cluster.isMaster", cluster.isMaster );  
    console.log( process.pid+"[0] cluster.isWorker", cluster.isWorker );  
    // 개별 워커 준비
    for(var i=0; i<cpu_num; i++){
        console.log( i, "fork()" );
        cluster.fork();
    }
    // 종료처리
    cluster.on("exit", function(worker, code, signal){
        console.log( "worker", worker.process.pid, " 종료" );
    });
}else{  
    console.log( process.pid+"[1] cluster.isMaster", cluster.isMaster );  
    console.log( process.pid+"[1] cluster.isWorker", cluster.isWorker );  
    http.createServer(function(req, res){
        var str = '';
        for(var i=0; i<100000000; i++){
            str += i+",";
        }
        res.writeHead(200);
        res.end("test req : " + process.pid + str );
    }).listen(81);
    console.log( "서버 가동 81 :", "http://localhost:81" );
}




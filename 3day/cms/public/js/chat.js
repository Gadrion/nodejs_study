// 문서가 준비되었다 => html이 메모리에 로드 되었다 => DOM 완성되었다. => 문서 조작 가능한 타이밍
$(document).ready(function() {
    var socket = io.connect("http://localhost:3000");
    console.log("소켓 : ", socket);
});
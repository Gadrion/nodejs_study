// 문서가 준비되었다 => html이 메모리에 로드 되었다 => DOM 완성되었다. => 문서 조작 가능한 타이밍
var user_id = '';
$(document).ready(function() {
    var socket = io.connect("http://192.168.30.12:3000");
    console.log("소켓 : ", socket);
    // 연결되었으면 연결 이벤트가 전송된다.
    socket.on('connect',function(){
        user_id = prompt("인스턴스 닉네임을 입력하세요.");
        // 사용자가 입력않 할 경우는 임시 값을 부여하여 전송
        if( isEmpty(user_id) ) {
            user_id = "unkwonwn"; // "<%= name %>";
        }
        console.log('user_id', user_id);
        // 아이디를 입력받으면 서버로 전송한다. (유저를 구분 할 수 있는 값을 전송)
        socket.emit("sendUserId", user_id);
    });
    // 서버가 보내는 메시지 이벤트 처리
    socket.on('sendMsg', (senderID, recvMsg) => {
        // 서버가 보내는 메시지를 사용자를 구분하여 추가한다.
        var dir = senderID == user_id ? 'right' : 'left';
        console.log("sendMsg", senderID, dir);
        // var dir = 'right';
        createMsgUI(dir, senderID, recvMsg);
    });
    // 방정보 메시지 이벤트 처리
    socket.on('sendRoomInfo', (rooms, myRoom) => {
        // 기존방 목록 비우기
        $("#roomList").empty();
        $.each( rooms, function( idx, room ){
            $("#roomList").append(`<li>${room}</li>`);
            if( room == myRoom ) { // 내방
                $("#roomList>li:last").css("background","lightgreen");
            } else {
                // 방바꾸기!!
                $("#roomList>li:last").on('click', function(){
                    socket.emit("changeRoom", room); 
                    // 기존방 대화 내용 삭제
                    $('ul.chat').empty();           
                });
            }
        });
    });

    // 메시지 전송
    $('#btn-chat').on('click', () => {
        const userMsg = $('#btn-input').val();
        socket.emit("userMsg", userMsg);
        // 입력창 초기화
        $('#btn-input').val('');
    });
    $('#btn-input').on('keypress', (evt) => {
        if(evt.keyCode == 13) { // enter key
            const userMsg = $('#btn-input').val();
            socket.emit("userMsg", userMsg);
            // 입력창 초기화
            $('#btn-input').val('');
        }
    });
});

function createMsgUI( dir, senderID, recvMsg ) {
    const icon = dir === "left" ? "fa-github-alt" : "fa-github";
    var html = `<li class="${dir} clearfix">
                    <span class="chat-img pull-${dir}">
                        <i class="fa ${icon}" style="font-size: 50px;"></i>
                    </span>
                    <div class="chat-body clearfix">
                        <div class="header">
                            <small class="pull-right text-muted">
                                <i class="fa fa-clock-o fa-fw"></i> 12 mins ago
                            </small>
                        </div>
                        <div class="body pull-${dir}">    
                            <strong class="primary-font">${senderID}</strong>
                            <p>
                                ${recvMsg}
                            </p>
                        </div>
                    </div>
                </li>`;
    $('ul.chat').append(html);

    // if(dir == 'right') { // 내 메시지
    //     $('ul.chat>li:last').attr("class", "right clearfix");
    //     $('ul.chat>li:last>span').attr("class", "chat-img pull-right");
    //     $('ul.chat>li:last>span>i').attr("class", "fa fa-github");
    // }
    // // 데이터 세팅
    // $('ul.chat>li:last strong').html(senderID);
    // $('ul.chat>li:last p').html(recvMsg);
}

function isEmpty(value)
{
	if( value=='null' || typeof(value) === 'undefined'  || value == "" || value == null || value == undefined || ( value != null && typeof value == "object" && !Object.keys(value).length ) )
	{
		return true;
	}else{
		return false;
    }
}

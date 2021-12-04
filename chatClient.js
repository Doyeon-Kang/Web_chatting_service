window.onload = function(){ 
  //클라이언트 소켓 생성 및 연결 
  const socket = io.connect('ws://127.0.0.1:3000');
  //DOM 참조
  const roomList = document.getElementById('roomList');
  const div = document.getElementById('message');
  const txt = document.getElementById('txtChat');
  const foot = document.getElementById('footer');
  //텍스트 박스에 포커스 주기 
  txt.focus();
  
  socket.emit('serverEntrance');
  //텍스트 박스에 이벤트 바인딩
  txt.onkeydown = sendMessage.bind(this); 
  function sendMessage(event){     
    if(event.keyCode == 13){  // keyCode 13 == enter
      //메세지 입력 여부 체크   
      let message = event.target.value;
      if(message){
        //소켓서버 함수 호출  
        socket.emit('serverReceiver', message);
        //텍스트박스 초기화
        txt.value = '';
      }
    }
  };

  socket.on('clientEntrance', function(data) {
    let mention = "**'" + data.nickname + "'님이 입장하셨습니다**";
    div.innerText += mention + '\r\n';
    div.scrollTop = div.scrollHeight;   
    foot.innerHTML = "<span>참여자:" + data.member + "</span>"; 
  });

  //클라이언트 receive 이벤트 함수(서버에서 호출할 이벤트)
  socket.on('clientReceiver', function(data){    
    //채팅창에 메세지 출력하기
    let message = '['+ data.nickname + '] ' + data.message;
    div.innerText += message + '\r\n';
    //채팅창 스크롤바 내리기  
    div.scrollTop = div.scrollHeight;   
  });

  socket.on('clientDisconnect', function(data){    
    //채팅창에 메세지 출력하기
    let message = "**'" + data.nickname + "'님이 퇴장하셨습니다**";
    div.innerText += message + '\r\n';
    //채팅창 스크롤바 내리기  
    div.scrollTop = div.scrollHeight; 
    console.log('disconnect!!');
    foot.innerHTML = "<span>참여자:" + data.member + "</span>"; 
  });
};

  
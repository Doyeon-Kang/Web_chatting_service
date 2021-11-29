window.onload = function(){ 
  //클라이언트 소켓 생성
  const socket = io.connect('ws://127.0.0.1:3000');
  //DOM 참조
  const div = document.getElementById('message');
  const txt = document.getElementById('txtChat');
  //텍스트 박스에 포커스 주기 
  txt.focus();
  
  socket.emit('serverEntrance', 'hello');
  //텍스트 박스에 이벤트 바인딩
  txt.onkeydown = sendMessage.bind(this); 
  function sendMessage(event){     
    if(event.keyCode == 13){
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
  
  socket.on('clientEntrance', function(ID) {
    let mention = '[' + ID + '님이 입장하셨습니다]';
    div.innerText += mention + '\r\n';
    div.scrollTop = div.scrollHeight;   
    console.log('check2!');
  });

  //클라이언트 receive 이벤트 함수(서버에서 호출할 이벤트)
  socket.on('clientReceiver', function(data){  
    console.log('서버에서 전송:', data.message);   
    //채팅창에 메세지 출력하기
    let message = '['+ data.clientID + '님의 말' + '] ' + data.message;
    div.innerText += message + '\r\n';
    //채팅창 스크롤바 내리기  
    div.scrollTop = div.scrollHeight;   
  });
};

  
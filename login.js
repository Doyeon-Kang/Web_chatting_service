window.onload = function(){ 
  //클라이언트 소켓 생성 및 연결 
  const socket = io.connect('ws://127.0.0.1:3000');
  //DOM 참조
  const roomList = document.getElementById('roomList');

  socket.emit('serverRoomList');

  socket.on('clientRoomList', function(list) {
    console.log("check");
    for(let i=0; i<list.length; i++) {
      roomList.innerHTML += "<span>" + list[i] + " </span>"; 
    }
  })

};

  
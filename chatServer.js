const app = require("express")();  // express를 이용하여 Http 서버 생성
const url = require("url");
const qs = require("querystring");
let queryData, queryData2, index;
let roomList = [];  // 채팅방 리스트
let roomMember = [];  // 채팅방 인원수
roomMember.fill(0);
let total = 0;  // 채팅방 개수

//루트 url에 대한 라우트 정의
app.get("/", function(req, res){
  //console.log("get:login.html");
  //최초 루트 get 요청에 대해, 서버에 존재하는 login.html 파일 전송
  res.sendFile("./login.html", {root: __dirname});
});

app.get("/chatServer", function(req, res) {
  queryData = url.parse(req.url, true).query.nickname;
  queryData2 = url.parse(req.url, true).query.roomname;
  //console.log("room: " +queryData2);
  res.sendFile("chatClient.html", {root: __dirname});
})

app.post("/", function(req, res) {
  res.send(roomList);
})

const uniqueID = function(name) {
  return name;
}

const uniqueRoom = function(room) {
  for(let i=0; i<=total; i++) {  // 해당 채팅방 존재여부 검사 
    if (roomList[i] == room) {
      roomMember[i]++;  // 인원 추가
      index = i;
      return roomList[i];
    }   
  }
  // 새로운 채팅방 생성
  roomList[total] = room;
  roomMember[total] = 1; 
  index = total;
  total++;
  return roomList[total-1];
}


//기타 웹 리소스 요청에 응답
app.use(function(req, res){ // html, js, css 등
  const fileName = url.parse(req.url).pathname.replace("/","");
  res.sendFile(fileName, {root: __dirname});
  //console.log("use:", fileName); 
});

const server = require('http').Server(app);  // express를 이용하여 http 서버 생성
server.listen(3000, () => {
  console.log("listening at http://127.0.0.1:3000...");
});

const socket = require('socket.io')(server);  // 생성된 http 서버를 socket.io server로 upgrade.

//소켓 Connection 이벤트 함수
// 클라이언트가 socket.io 서버에 접속했을 때 connection 이벤트 발생
socket.on('connection', function(client){  // 인자로 socket 객체 전달 - 접속한 클라이언트 소켓
  const nickname = uniqueID(queryData);
  const roomname = uniqueRoom(queryData2);
  //console.log("nickname: " + nickname + " roomname: " +queryData2);
  let member = roomMember[index];  // 채팅방 인원수
  let today = new Date();   
  let hours = today.getHours(); // 시
  let minutes = today.getMinutes();  // 분
  let seconds = today.getSeconds();  // 초
  
  client.on('serverRoomList', function() {
    socket.sockets.emit('clientRoomList', roomList);
  })

  client.join(roomname);
  console.log('Connection: '+ nickname + '| Room: '+roomname);
  console.log('time: ' + hours + ':' + minutes + ':' + seconds);

  // 소켓으로부터 메시지를 수신받을 때 사용하는 메소드: on()
  client.on('serverEntrance', function() {  
    //console.log("entrance member: " +member);
    //메시지를 전송한 클라이언트에게 메시지를 송신할 때 사용하는 메소드: socket.emit()
    socket.to(roomname).emit('clientEntrance', {nickname: nickname, roomname: roomname, member: member});
  });

  //서버 receive 이벤트 함수(클라이언트에서 호출 할 이벤트)    
  client.on('serverReceiver', function(value){
    //클라이언트 이벤트 호출     
    socket.to(roomname).emit('clientReceiver', {nickname: nickname, roomname: roomname,message: value});  
  });

  client.on('disconnect', function(reason) {  // 접속이 종료되었을 경우
    console.log('disconnect');
    roomMember[index]--;
    member = roomMember[index];
    console.log("member: " +member);
    socket.to(roomname).emit('clientDisconnect', {nickname: nickname, roomname: roomname, member: member});
    //console.log('접속종료 ID: ' +nickname);
  })
});

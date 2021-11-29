const app = require("express")();
const url = require("url");
//루트에 대한 get 요청에 응답
app.get("/", function(req, res){
  console.log("get:chatClient.html");
  //최초 루트 get 요청에 대해, 서버에 존재하는 chatClient.html 파일 전송
  res.sendFile("chatClient.html", {root: __dirname});
});

//기타 웹 리소스 요청에 응답
app.use(function(req, res){
  const fileName = url.parse(req.url).pathname.replace("/","");
  res.sendFile(fileName, {root: __dirname});
  console.log("use:", fileName); 
});

//http 서버 생성
const server = require('http').Server(app);
server.listen(3000, () => {
  console.log("listening at http://127.0.0.1:3000...");
});

//클로저를 사용해, private한 유니크 id를 만든다
const uniqueID = (function(){
  let id = 0;
  return function(){ return id++; };
})();

//서버 소켓 생성
const socket = require('socket.io')(server);
//소켓 Connection 이벤트 함수
socket.on('connection', function(client){
  //클라이언트 고유값 생성 
  const clientID = uniqueID();
  console.log('Connection: '+ clientID);
  client.on('serverEntrance', function(data) {
    //클라이언트 이벤트 호출  
    socket.sockets.emit('clientEntrance', clientID);
  });

  //서버 receive 이벤트 함수(클라이언트에서 호출 할 이벤트)    
  client.on('serverReceiver', function(value){
    //클라이언트 이벤트 호출     
    socket.sockets.emit('clientReceiver', {clientID: clientID, message: value});  
  });
});

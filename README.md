# Web_chatting_service
web chatting service with nodejs

## 프로젝트 명
Node.js 소켓통신을 이용한 랜덤채팅 웹서비스

## 프로젝트 멤버 및 역할
팀원 - 강도연(개인 프로젝트) 

## 프로젝트 소개 및 개발 내용 소개
+ 프로젝트 소개 
  + 사용자가 닉네임을 사용하여 다른 사용자와 동시 다발적으로 소통할 수 있는 웹 채팅 서비스

* 개발 내용 
  * Nods.js를 기반으로 한 웹서버 구축
  * socket.io를 이용한 실시간 웹 구현
  * 채팅방 이름을 GET 방식으로 입력받아 채팅방 구분
  * 채팅방 생성 리스트 화면표시(메인페이지)
  * 해당 채팅방 사용인원(참여자) 실시간 반영 및 표시
  * 사용자 접속 및 접속해제에 따른 이벤트 처리

## 프로젝트 개발 결과물 소개(+ 다이어그램)
+ 웹서버 정보
  + CentOS Linux 8 x64 
+ 통신 다이어그램
![다이어그램](https://user-images.githubusercontent.com/56114680/144743617-f80f7197-3afa-4f0b-8a8d-af9cae84e4c6.png)
  
  
## 개발 결과물 사용방법 (+ 프로그램 구동 화면 스크린 샷)
+ IP 접속
  + 143.198.215.251:3000 입력 및 접속
![ip입력](https://user-images.githubusercontent.com/56114680/144742499-97838cd8-8f62-453d-b702-4a345038d387.png)
+ 로그인
  + 메인페이지
![메인페이지](https://user-images.githubusercontent.com/56114680/144742525-e4e63fc4-b1aa-4eb4-9176-ebd590c07cba.png) 
  + 입장하고 싶은 채팅방 입력(아래에 개설된 채팅방 참고)
![채팅방입력(1)](https://user-images.githubusercontent.com/56114680/144742530-2a37a4ff-c684-4539-b005-46d7bf955c8c.png)
  + 닉네임 입력 
![닉네임입력(2)](https://user-images.githubusercontent.com/56114680/144742534-ecdb813c-11e5-4af6-bc78-bea5cd650e0f.png)
  + '입력' 버튼 클릭
+ 채팅방 입장
  + 입장 메시지 출력 
![입장이벤트(4)](https://user-images.githubusercontent.com/56114680/144742528-59925580-649e-4e62-a8c9-fe1a4776b0fe.png)
  + 페이지 하단 참여자 수 확인 가능
  + ![참여자확인(5)](https://user-images.githubusercontent.com/56114680/144742529-8f5e9fd8-e9e9-49be-9b6e-9ce3ee78ad2f.png)
  + 채팅창에 메시지 입력 및 Enter 누르기
![메시지입력(6)](https://user-images.githubusercontent.com/56114680/144742537-c508b9af-deb7-4c60-803d-53a9ff678971.png)
![enter클릭(7)](https://user-images.githubusercontent.com/56114680/144742533-1c0d8915-182e-4f85-b197-37b94bf73647.png)
+ 채팅방 퇴장
  + 페이지 탭 종료 or 페이지 상단 하이퍼링크(메인페이지) 클릭
  + ![하이퍼링크(8)](https://user-images.githubusercontent.com/56114680/144742721-49b2a29d-dd51-4b10-b4e0-be976dcbc21e.png)  
  + 퇴장 메시지 출력(다른 사용자 화면)

## 개발 결과물의 필요성 및 활용방안
+ 웹 서비스를 이용하는 다양한 환경의 사용자들간 소통을 가능케 한다. 
+ 많은 정보를 노출하지 않는 상황에서의 채팅을 원하는 사용자들에게 필요한 서비스이다.

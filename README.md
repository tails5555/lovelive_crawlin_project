# Love Live(ラブライブ) Inven Crawlin' App<br/><small>With  django REST Framework</small>

Web Crawling 을 실질적으로 학습하기 위해 크롤링 서버의 데이터를 가져와 Native Application 과 Web Application 을 만들어 봅니다. 

참고로 이번 REST API 는 Spring Boot 가 아닌 django 를 이용해서 구축하겠습니다.

## Issues
- Python django 를 이용한 간단한 REST API를 구축합니다.
- Python Beautiful Soup 를 이용해 한 웹 사이트의 HTML 문서를 파싱하여 데이터베이스에 구축합니다.
- ~~React Native 를 이용하여 REST API 와 Redux 를 연동 시킵니다.~~ - 잠정 취소.

## Development Environments

모든 개발의 IDE는 Visual Studio Code 를 이용하였습니다.

- Server - Python 3.7, django REST Framework 3.9, Beautiful Soup 4
- Web - React.js v16.4, Redux, Axios
- ~~App - React Native~~ - 잠정 취소.

## About Native App

React Native 으로 구현 하는 작업을 2018년 11월 15일 이후로 잠정 중단하기로 했습니다.

현재 서버는 배포 되지 않은 상태여서 NGROK 를 이용하여 제작하고 있습니다.

부득이하게도 NGROK 의 접속 양에 따른 부하가 존재하여 Native App 작동 확인 여부를 확인할 수 없는 상태입니다.

그리고 Android Emulator 를 사용하여 구현하는 방법도 시도를 하였으나, RAM 의 용량을 너무 차지하여 결국에는 취소 하였습니다.

React Native 를 이용한 App 구현 방법에 대해 더욱 공부 해 보고 난 후에 계속 진행하겠습니다.

## Thanks To
- [django REST API 구축 방법](http://jamanbbo.tistory.com/43)
- [Lovelive 인벤](http://lovelive.inven.co.kr/)
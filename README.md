# 리얼 핸드메이드 React-Router-Dom

## 프로젝트 1일 차

힌트를 가지고 검색을 해보았다. window.onpopstate, window.location.pathname , History API(pushState) 등등

자연스럽게 MDN사이트에 들어가 저것들이 어디에 쓰는 건지 살펴 보았고,

```
window.onpopstate = function (event) {
    console.log(
      `location: ${document.location}, state: ${JSON.stringify(event.state)}`
    );
```

위 함수는 location이 바뀔 때 작동하는 함수였다. 처음에 history.pushState로 현재 url을 바꿀 수 있었지만 window.onpopstate 함수가 동작하지 않아 당황 스러웠다.

그러나 history.go(), back(), forward() 같은 메소들이 작동하면 함수가 동작해서 console들이 보였다.
저기 있는 메소드들은 페이지를 직접 이동하는 메소드들이여서 동작을 하게 된거 같다.

```
history.pushState(state, title, url);
```

위 메소드는 3개의 인자 값을 받는데
state가 변경 될 때 popstate 이벤트가 발생하고, 이것을 사용해서 다른 동작을 할 수 있다
예를들어 나같은 경우 pushState를 초기화 시키서 다시 home page로 가게끔 만들었다.

그리고 title은 역사적으로 생략은 못하고 빈문자열로 두면 안전하다고 MDN에 나와있다.

url은 내가 보낼 pathname이다. 이값을 활용하면 a 태그처럼 url값을 바꿀 수 있다.

```
window.location.pathname
```

위 메소드는 현재 페이지의 경로와 파일 이름을 반환한다.

나는 이 값으로 state를 관리를 통해 마치 router가 이동한 것 처럼 보이게 한거 같다.

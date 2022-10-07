# 리얼 핸드메이드 React-SPA-Router

## History API, window 메소드들 탐색 및 기본 기능 구현

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

## context API, Router, Route 컴포넌트 구현 완료

처음 구현 할때는 useState를 사용해서
pathname과 state가 일치하는 컴포넌트만 보여주면 된다고 생각을 했고,
app.tsx에 안에다가 구현을 했다. 하지만 Hook과, Router, Route 컴포넌트를
생성해 props로 받아 실제 우리가 react-router-dom 라이브러리를 사용할 수 있도록
구현을 해야 했다.

```
  const [page, setPage] = useState("");
  window.onpopstate = function (event) {
    console.log(
      `location: ${document.location}, state: ${JSON.stringify(event.state)}`
    );
    history.pushState("", "", "");
    setPage(event.state);
  };

  const useRouter = (state = "", url = "") => {
    history.pushState(state, "", url);
    setPage(window.location.pathname);
  };
```

app.tsx 안에 로직은 이렇다. state로 pathname을 받고, onpopstate 이벤트가 발생하면 state를 setPage에 저장해서 그 값으로 컴포넌트들을 판단하고 있다.

```
interface RouterProps {
  children: ReactNode;
}

export const RouterContext = createContext({
  path: window.location.pathname,
  setPath: (() => null) as Dispatch<SetStateAction<string>>,
});

export const Router = ({ children }: RouterProps) => {
  const [path, setPath] = useState(window.location.pathname);

  return (
    <RouterContext.Provider value={{ path, setPath }}>
      <section>{children}</section>
    </RouterContext.Provider>
  );
};
```

먼저 Router.tsx 컴포넌트는 context api를 사용해서 props를 내려준다.[context api 설명 블로그](https://velog.io/@velopert/react-context-tutorial)  
여기서 dispatch를 해주는 이유은 onpopstate 이벤트를 발생 시키려면 histoy api 에서 go, back, forward 같은 메소드가 실행 되고 실제 페이지가 이동 될때 발생하는데, dispatch를 이용해 수동으로 이벤트를 발생 시켜주기 위해서다.

```
interface RouteProps {
  path: string;
  component: JSX.Element;
}

export const Route = ({ path, component }: RouteProps) => {
  const { path: currentPath, setPath } = useContext(RouterContext);

  window.onpopstate = () => {
    setPath(window.location.pathname);
  };

  if (currentPath !== path) {
    return (<></>) as JSX.Element;
  }
  return component;
};
```

이제 Router에서 받아온 props를 바탕으로 현재 pathname과 비교를 통해, 그에 맞는 page를 보여준다.

```
export const useRouter = () => {
  const push = (path: string) => {
    history.pushState(undefined, "", path);
    const popStateEvent = new PopStateEvent("popstate", { state: path });
    dispatchEvent(popStateEvent);
  };

  return { push };
};
```

그리고 useRouter hook으로 각 page 마다 push 값을 입력해 page 이동이 가능하다.

위에 코드들은 내가 완전히 작성한 것들이 아니라서 코드를 보고 이해하려고 노력 했고,
그 과정에서 context api의 사용방법도 알게 되고, csr이 어떤식으로 작동하는건지 조금 더 이해가 된거같다.

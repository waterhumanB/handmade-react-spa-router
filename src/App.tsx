import { useState } from "react";
import About from "./routes/About";
import "./App.css";

function App() {
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

  console.log(page);
  return (
    <div id="App">
      {page === "" && (
        <div>
          <h1>Root</h1>
          <button onClick={() => useRouter("1", "/About")}>About</button>
        </div>
      )}
      {page === "/About" && <About></About>}
    </div>
  );
}

export default App;

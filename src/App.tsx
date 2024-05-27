import "./App.css";
import { useState } from "react";
import Editor from "./Editor";
import { preload } from "./lib/usePreload";
import { aThirdState, anotherState, usersState } from "./state";

const usePreload = preload(usersState, anotherState, aThirdState);

function App() {
  const [visible, setVisible] = useState(false);
  // usePreload(usersState, anotherState, aThirdState);
  usePreload();

  return (
    <>
      <button onClick={() => setVisible(true)}>Load</button>
      {visible ? <Editor /> : null}
    </>
  );
}

export default App;

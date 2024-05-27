import "./App.css";
import { useState } from "react";
import Editor from "./Editor";
import { usePreload } from "./lib/usePreload";

function App() {
  const [visible, setVisible] = useState(false);
  usePreload();

  return (
    <>
      <button onClick={() => setVisible(true)}>Load</button>
      {visible ? <Editor /> : null}
    </>
  );
}

export default App;

import "./App.css";
import { useState } from "react";
import Editor from "./Editor";

function App() {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <button onClick={() => setVisible(true)}>Load</button>
      {visible ? <Editor /> : null}
    </>
  );
}

export default App;

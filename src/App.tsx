import "./App.css";
import { Suspense, useState } from "react";
import Editor from "./Editor";

function App() {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <button onClick={() => setVisible(true)}>Load</button>
      <Suspense fallback={<span>Editor...</span>}>
        {visible ? <Editor /> : null}
      </Suspense>
    </>
  );
}

export default App;

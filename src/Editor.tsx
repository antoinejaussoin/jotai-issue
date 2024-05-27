import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useAtomValue } from "jotai";
import { aThirdState, anotherState, usersState } from "./state";
import { UserDisplay } from "./UserDisplay";
import { useResetAtom } from "jotai/utils";
import { useReload } from "./lib/useReload";

function Editor() {
  const users = useAtomValue(usersState);
  const reset = useResetAtom(usersState);
  const resetAll = useReload(usersState, aThirdState, anotherState);

  return (
    <>
      <header className="App-header">
        <img src={reactLogo} className="App-logo" alt="logo" />
        <img src={viteLogo} className="App-logo" alt="logo" />

        <ul>
          <button onClick={reset}>Reload One</button>
          <button onClick={resetAll}>Reload all</button>
          <UserDisplay user={users[0]} />
          {/* {users.map((user) => (
            
          ))} */}
        </ul>
      </header>
    </>
  );
}

export default Editor;

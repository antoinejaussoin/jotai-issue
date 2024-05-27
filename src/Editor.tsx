import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useAtomValue } from "jotai";
import { usersState } from "./state";
import { UserDisplay } from "./UserDisplay";
import { useResetAtom } from "jotai/utils";

function Editor() {
  const users = useAtomValue(usersState);
  const reset = useResetAtom(usersState);

  return (
    <>
      <header className="App-header">
        <img src={reactLogo} className="App-logo" alt="logo" />
        <img src={viteLogo} className="App-logo" alt="logo" />

        <ul>
          <button onClick={reset}>Reload all</button>
          <UserDisplay user={users[0]} />
          {/* {users.map((user) => (
            
          ))} */}
        </ul>
      </header>
    </>
  );
}

export default Editor;

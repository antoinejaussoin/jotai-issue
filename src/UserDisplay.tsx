import { useSetAtom } from "jotai";
import { User } from "./types";
import { usersState } from "./state";

type UserDisplayProps = {
  user: User;
};

export function UserDisplay({ user }: UserDisplayProps) {
  const setName = useSetAtom(usersState);
  console.log("Name: ", user.name);
  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <p>{user.phone}</p>
      <button
        onClick={() => {
          setName((prev) => {
            const newState = prev.map((u) => {
              if (u.id === user.id) {
                return { ...u, name: Math.random().toString(36).substring(7) };
              }
              return u;
            });
            return newState;
          });
        }}
      >
        Modify Name
      </button>
    </div>
  );
}

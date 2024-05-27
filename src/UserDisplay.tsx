import { useAtomValue } from "jotai";
import { User } from "./types";
import { firstNameSelector } from "./state";
import { usePersistUsers } from "./useUsers";

type UserDisplayProps = {
  user: User;
};

export function UserDisplay({ user }: UserDisplayProps) {
  // const setName = useSetAtom(usersState);
  const firstName = useAtomValue(firstNameSelector);
  const updateUser = usePersistUsers();
  console.log("Name: ", user.name);
  console.log("First Name: ", firstName);
  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <p>{user.phone}</p>
      <button
        onClick={() => {
          updateUser({
            ...user,
            name: Math.random().toString(36).substring(7),
          });
          // setName((prev) => {
          //   const newState = prev.map((u) => {
          //     if (u.id === user.id) {
          //       return { ...u, name: Math.random().toString(36).substring(7) };
          //     }
          //     return u;
          //   });
          //   return newState;
          // });
        }}
      >
        Modify Name
      </button>
    </div>
  );
}

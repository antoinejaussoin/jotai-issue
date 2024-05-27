import { useAtomValue } from "jotai";
import { User } from "./types";
import { firstNameSelector } from "./state";
// import { usePersistUsers } from "./useUsers";
import { Suspense } from "react";
import { UpdateButton } from "./UpdateButton";

type UserDisplayProps = {
  user: User;
};

export function UserDisplay({ user }: UserDisplayProps) {
  // const setName = useSetAtom(usersState);
  const firstName = useAtomValue(firstNameSelector);
  // const updateUser = usePersistUsers();
  console.log("Name: ", user.name);
  console.log("First Name: ", firstName);
  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <p>{user.phone}</p>
      <Suspense fallback={<span>Updating name...</span>}>
        <UpdateButton user={user} />
        {/* <button
          onClick={() => {
            updateUser({
              ...user,
              name: Math.random().toString(36).substring(7),
            });
          }}
        >
          Modify Name
        </button> */}
      </Suspense>
    </div>
  );
}

import { useSetAtom } from "jotai";
import { persistUser, usersState } from "./state";
import { useCallback } from "react";
import { User } from "./types";

export function usePersistUsers() {
  const setUsers = useSetAtom(usersState);

  return useCallback(
    async (user: User) => {
      // Optimistic
      // Elle est là la couille dans le potage ! // await
      await setUsers((prev) => {
        const newState = prev.map((u) => (u.id === user.id ? user : u));
        return newState;
      });

      // Update
      await setUsers(async (prev) => {
        // Persist
        const modified = await persistUser(user);

        const newState = prev.map((u) => (u.id === user.id ? modified : u));
        return newState;
      });
    },
    [setUsers]
  );
}

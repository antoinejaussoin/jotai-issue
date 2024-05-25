import { atomWithLazy } from "jotai/utils";
import { User } from "./types";
import { SetStateAction, atom } from "jotai";

const usersStateInner = atomWithLazy<User[] | Promise<User[]>>(fetchUsers);

export const usersState = atom(
  async (get) => {
    const users = await get(usersStateInner);
    return users;
  },
  async (get, set, newValue: SetStateAction<User[]>) => {
    if (newValue instanceof Function) {
      const prev = await get(usersStateInner);
      const computed = newValue(prev);
      set(usersStateInner, computed);
    } else {
      set(usersStateInner, newValue);
    }
  }
);

async function fetchUsers(): Promise<User[]> {
  console.log("Fetching users");
  return fetch("https://jsonplaceholder.typicode.com/users").then((response) =>
    response.json()
  );
}

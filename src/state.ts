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

export const firstNameSelector = atom(async (get) => {
  const users = await get(usersState);
  return users[0].name;
});

let CACHE: User[] | null = null;

async function fetchUsers(): Promise<User[]> {
  if (!CACHE) {
    console.log("Fetching users");
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = await response.json();
    CACHE = users;
    return users;
  }
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(CACHE as User[]);
    }, 2000);
  });
}

export async function persistUser(user: User): Promise<User> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const fromBackend = { ...user };
      if (CACHE) {
        CACHE = CACHE.map((u) =>
          u.id === user.id
            ? {
                ...fromBackend,
                id: fromBackend.id < 0 ? Math.random() : fromBackend.id,
              }
            : u
        );
      }
      resolve(fromBackend);
    }, 2000);
  });
}

import { User } from "./types";
import { atom } from "jotai";
import { lazyAtom } from "./lib/lazyAtom";

// const usersStateInner = atomWithLazy<User[] | Promise<User[]>>(fetchUsers);

// export const usersState = atom(
//   async (get) => {
//     const users = await get(usersStateInner);
//     return users;
//   },
//   async (get, set, newValue: SetStateAction<User[]> | typeof RESET) => {
//     if (newValue === RESET) {
//       set(usersStateInner, fetchUsers);
//       return;
//     }
//     if (newValue instanceof Function) {
//       const prev = await get(usersStateInner);
//       const computed = newValue(prev);
//       set(usersStateInner, computed);
//     } else {
//       set(usersStateInner, newValue);
//     }
//   }
// );

export const usersState = lazyAtom(fetchUsers);
export const anotherState = lazyAtom(fetchUsers);
export const aThirdState = lazyAtom(fetchUsers);

export const firstNameSelector = atom(async (get) => {
  const users = await get(usersState);
  return users[0].name;
});

const fakeUsers: User[] = [
  {
    id: 1,
    username: "ajaussoin",
    address: {
      city: "London",
      geo: { lat: "0", lng: "0" },
      street: "17 Jedburgh Street",
      suite: "",
      zipcode: "SW11 5QA",
    },
    company: {
      catchPhrase: "We are a team",
      bs: "?",
      name: "BAM",
    },
    email: "antoine@jaussoin.com",
    name: "Antoine Jaussoin",
    phone: "+44 77 22 55 77 39",
    website: "https://www.jaussoin.com",
  },
];

let CACHE: User[] | null = null;

async function fetchUsers(): Promise<User[]> {
  return new Promise((resolve) => {
    console.log("Fetching users");
    setTimeout(async () => {
      if (!CACHE) {
        try {
          const response = await fetch(
            "https://jsonplaceholder.typicode.com/users"
          );
          const users = await response.json();
          CACHE = users;
        } catch {
          CACHE = fakeUsers;
        }
      }
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

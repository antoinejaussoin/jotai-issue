import { Atom, atom, useAtomValue } from "jotai";
// import { useMemo } from "react";

export function preload(...atoms: Atom<unknown>[]) {
  // console.log("Building all atom");
  const all = atom((get) => {
    return Promise.all(atoms.map(get));
  });

  return function usePreload() {
    useAtomValue(all);
  };
}

// const all = atom((get) =>
//   Promise.all([get(usersState), get(aThirdState), get(anotherState)])
// );

// export function usePreload(...atoms: Atom<unknown>[]) {
//   const all = useMemo(() => allAtom(...atoms), []);
//   useAtomValue(all);
// }

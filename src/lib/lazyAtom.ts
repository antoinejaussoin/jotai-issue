import { SetStateAction, atom } from "jotai";
import { RESET, atomWithLazy } from "jotai/utils";

export function lazyAtom<T>(init: () => Promise<T>) {
  const initAtom = atomWithLazy<T | Promise<T>>(init);
  const baseAtom = atom(
    async (get) => {
      const users = await get(initAtom);
      return users;
    },
    async (get, set, newValue: SetStateAction<T> | typeof RESET) => {
      if (newValue === RESET) {
        set(initAtom, init);
        return;
      }
      if (newValue instanceof Function) {
        const prev = await get(initAtom);
        const computed = newValue(prev);
        set(initAtom, computed);
      } else {
        set(initAtom, newValue);
      }
    }
  );
  return baseAtom;
}

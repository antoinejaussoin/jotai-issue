import { atom, useAtomValue } from "jotai";
import { aThirdState, anotherState, usersState } from "../state";

const all = atom((get) =>
  Promise.all([get(usersState), get(aThirdState), get(anotherState)])
);

export function usePreload() {
  useAtomValue(all);
}

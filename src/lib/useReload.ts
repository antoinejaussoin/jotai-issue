import { WritableAtom, atom, useSetAtom } from "jotai";
import { RESET } from "jotai/utils";
import { useCallback, useMemo } from "react";

function reloadAtom(
  ...atoms: WritableAtom<unknown, [typeof RESET], Promise<void>>[]
) {
  return atom(null, (_, set) => {
    atoms.forEach((atom) => {
      set(atom, RESET);
    });
  });
}

export function useReload(
  ...atoms: WritableAtom<unknown, [typeof RESET], Promise<void>>[]
) {
  const resetAtom = useMemo(() => reloadAtom(...atoms), [atoms]);
  const reset = useSetAtom(resetAtom);

  return useCallback(() => {
    reset();
  }, [reset]);
}

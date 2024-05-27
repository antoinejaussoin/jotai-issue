import { usePersistUsers } from "./useUsers";
import { User } from "./types";

type UpdateButtonProps = {
  user: User;
};

export function UpdateButton({ user }: UpdateButtonProps) {
  const updateUser = usePersistUsers();
  return (
    <button
      onClick={() => {
        updateUser({
          ...user,
          name: Math.random().toString(36).substring(7),
        });
      }}
    >
      Modify Name
    </button>
  );
}

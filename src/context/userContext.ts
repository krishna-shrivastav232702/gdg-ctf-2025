import { createContext } from "react";

export const UserContext = createContext<{
  user: { name?: string };
  updateUser: (name: string) => void;
}>({ user: {}, updateUser: () => {} });

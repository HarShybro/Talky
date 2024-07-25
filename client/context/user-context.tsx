import React, { createContext, useState } from "react";
import { UserData } from "../types";

export const UserContext = createContext<{
  user: UserData | null;
  setUser: React.Dispatch<React.SetStateAction<UserData>>;
} | null>(null);

export default function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<UserData | null>(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

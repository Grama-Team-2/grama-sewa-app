import React from "react";
import { createContext, useState } from "react";

const UserContext = createContext();

function ContextProvider({ children }) {
  const [role, setRole] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const valueToShare = {
    role,
    setRole,
    accessToken,
    setAccessToken,
    test: "test",
  };
  return (
    <UserContext.Provider value={valueToShare}>{children}</UserContext.Provider>
  );
}

export { ContextProvider };
export default UserContext;

import React from "react";
import { createContext, useEffect, useRef, useState } from "react";

const UserContext = createContext();

function ContextProvider({ children }) {
  const [role, setRole] = useState("");

  const valueToShare = {
    role,
    setRole,
  };
  return (
    <UserContext.Provider value={valueToShare}>{children}</UserContext.Provider>
  );
}

export { ContextProvider };
export default UserContext;

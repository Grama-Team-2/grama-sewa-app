import React, { useContext } from "react";
import { useAuthContext } from "@asgardeo/auth-react";
import { Navigate } from "react-router-dom";
import UserContext from "./context/UserContext";
function ProtectedRoute({ children, redirectPath, authRole }) {
  const { role, setRole } = useContext(UserContext);
  const { state } = useAuthContext();
  if (!state.isAuthenticated && role !== authRole) {
    return <Navigate to={redirectPath} replace />;
  }
  return children;
}

export default ProtectedRoute;

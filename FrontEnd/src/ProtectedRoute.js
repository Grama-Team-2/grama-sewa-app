import React from "react";
import { useAuthContext } from "@asgardeo/auth-react";
import { Navigate } from "react-router-dom";
function ProtectedRoute({ children, redirectPath }) {
  const { state } = useAuthContext();
  if (!state.isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }
  return children;
}

export default ProtectedRoute;

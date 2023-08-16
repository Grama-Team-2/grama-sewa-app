import React from "react";
import "./Restrict.css";
import { useAuthContext } from "@asgardeo/auth-react";
function Restrict() {
  const { signOut } = useAuthContext();
  return (
    <div className="err-heading">
      <button onClick={() => signOut()} className="btn btn-logout">
        SignOut
      </button>
      <h3>You don't have permission to access this page</h3>
    </div>
  );
}

export default Restrict;

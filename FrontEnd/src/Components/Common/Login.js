import React from "react";
import { useAuthContext } from "@asgardeo/auth-react";

function Login() {
  const { state } = useAuthContext();
  const { signIn } = useAuthContext();
  return (
    <div className="desktop">
      <div className="overlap">
        <div className="frame">
          <img
            className="logo"
            alt="Logo"
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
          />
        </div>
        <div className="text-wrapper">GRAMA ASSIST</div>
      </div>
      <div className="overlap-group">
        <div className="signup-button" />
        <div
          className="div"
          style={{ cursor: "pointer" }}
          onClick={() => signIn()}
        >
          SIGN IN
        </div>
      </div>
    </div>
  );
}

export default Login;

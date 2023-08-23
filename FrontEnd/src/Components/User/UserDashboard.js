import React from "react";
import Header from "../Common/UserHeader";
import { useAuthContext } from "@asgardeo/auth-react";
import "./style.css";

function UserDashBoard() {
  return (
    <>
    
    <main>
        <div className="dashboard-container">
          <div className="logo-wrapper">
            <img
              className="logo"
              alt="Logo"
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
            />
            

          </div>
          
        </div>
      </main>
      <Header></Header>
    </>
  );
}

export default UserDashBoard;

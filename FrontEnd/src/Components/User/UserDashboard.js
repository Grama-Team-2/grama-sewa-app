import React from "react";
import Header from "../Common/UserHeader";
import { useAuthContext } from "@asgardeo/auth-react";


function UserDashBoard() {
  return (
    <>
    
      <main >
        
        <div className={`desktop`}>
          <div className="overlap">
            <div className="frame">
              <img
                className="logo"
                alt="Logo"
                style={{marginTop:"70px"}}
                
                
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
              />
            </div>
            <div className="text-wrapper" style={{marginTop:"50px"}}>GRAMA ASSIST</div>
          </div>
          <div className="overlap-group"></div>
        </div>
      </main>
      <Header></Header>
    </>
  );
}

export default UserDashBoard;

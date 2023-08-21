import React from "react";
import GSHeader from "../Common/GSHeader";
import { useAuthContext } from "@asgardeo/auth-react";

function GramaDashboard() {
  return (
    <>
        <main>
          <div className={`desktop`}>
            <div className="overlap">
              <div className="frame">
                <img
                  className="logo"
                  alt="Logo"
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                  style={{ marginTop: "80px" }}
                />
              </div>
              <div className="text-wrapper" style={{marginTop:"90px"}}>GRAMA ASSIST</div>
            </div>
            <div className="overlap-group"></div>
          </div>
        </main>
        <GSHeader></GSHeader>
      
    </>
  );
}

export default GramaDashboard;

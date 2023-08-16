import React from "react";
import GSHeader from "./GSHeader";
import { useAuthContext } from "@asgardeo/auth-react";

function UserDashBoard() {
  return (
    <>
      <div>
        <GSHeader></GSHeader>

        <main>
          <div className={`desktop`}>
            <div className="overlap">
              <div className="frame" style={{ marginTop: "10rem" }}>
                <img
                  className="logo"
                  alt="Logo"
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                />
              </div>
              <div className="text-wrapper">GRAMA ASSIST</div>
            </div>
            <div className="overlap-group"></div>
          </div>
        </main>
      </div>
    </>
  );
}

export default UserDashBoard;

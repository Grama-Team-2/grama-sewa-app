import React from "react";
import Header from "./UserHeader";

function UserDashBoard() {
  return (
    <>
      <div>
        <Header></Header>

        <main>
          <div>
            <img
              id="lo"
              src={
                "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
              }
              alt="back-img"
            />
          </div>
        </main>
      </div>
    </>
  );
}

export default UserDashBoard;

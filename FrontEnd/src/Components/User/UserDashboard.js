import React from "react";
import Header from "./UserHeader";
import { useAuthContext } from "@asgardeo/auth-react";

function UserDashBoard() {
  const { getBasicUserInfo } = useAuthContext();
  getBasicUserInfo()
    .then((basicUserDetails) => {
      console.log(basicUserDetails);
    })
    .catch((error) => {
      // Handle the error
    });
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

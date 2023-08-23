import React from "react";
import Header from "../Common/UserHeader";
import { useAuthContext } from "@asgardeo/auth-react";
import "./style.css";

function UserDashBoard() {
  return (
    <>
    
    <main >
        
    <div className="desktop" style={{backgroundColor:"grey",width:"100%",margin: 0,padding: 0,justifyContent:"center"}}>
      <div className="overlap"style={{backgroundColor:"grey",width:"100%",alignItems: "center",padding: 0,marginRight:-100,marginLeft:-80}}>
        <div className="frame"style={{alignItems:"center"}}>
          <img
                className="logo"
                alt="Logo"
                style={{alignContent:"center",marginTop:"70px"}}
                
                
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
              />
              <div className="text-wrapper" style={{marginTop:"50px"}}>GRAMA ASSIST</div>
            </div>
            

          </div>
          
        </div>
      </main>
      <Header></Header>
    </>
  );
}

export default UserDashBoard;

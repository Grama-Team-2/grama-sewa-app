import React from "react";
import Header from "./UserHeader";


function Status() {
  
  return (
    <div>
      <Header></Header>
      <br />
      <br />
      <br />
      <div className="container mt-4 mb-4 p-3 d-flex justify-content-center">
        <div className="card p-4" style = {{marginLeft : "55px",backgroundColor:"#483248",color:"white"}} >
          <div className=" image d-flex flex-column justify-content-center">
            <h3>Pending</h3>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      
    </div>
  );
}

export default Status;

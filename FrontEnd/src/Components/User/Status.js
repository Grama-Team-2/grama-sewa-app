import React from "react";
import Header from "./UserHeader";


function Status() {
  return (
    <div>
      <Header></Header>
      <div>
        <div>
          <main style={{backgroundColor:"#b31af01f"}}>
            <div className="container1">
              <div className="row justify-content-center">
                <div className="col-lg-5">
                  <br />
                 
                  <div className="card shadow-lg border-0 rounded-lg ">
                    <div className="card-header">
                      <h3 className="text-center font-weight-light my-4">
                        Request Status
                      </h3>
                      <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp" class="img-fluid" alt="Phone image" />
                    </div>
                    <div className="card-body">
                    <div className="card p-4" style = {{backgroundColor:"#483248",color:"white",marginLeft:"100px",marginRight:"100px"}} >
          
            <h5>More Information Required</h5>
          
        </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      
    </div>
  );
  

}

export default Status;

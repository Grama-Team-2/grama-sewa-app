import React from "react";


function SignUp() {

  return (
    <div>
      <div id="layoutAuthentication">
        <div id="layoutAuthentication_content">
          <main>
            <div className="container2">
              <div className="row justify-content-center">
                <div className="col-lg-5">
                  <br />
                  <div className="card shadow-lg border-0 rounded-lg mt-5">
                    <div className="card-header">
                      <h3 className="text-center font-weight-light my-4">
                         Sign Up
                      </h3>
                      <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp" class="img-fluid" alt="Phone image" />
                    </div>
                    <div className="card-body">
                      <form method="post">
                        <div className="form-floating mb-3">
                          <label>Full Name :</label>
                          <br />
                          <br />
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Type your full name"
                            
                          />
                        </div>

                        <div className="form-floating mb-3">
                          <label>Email :</label>
                          <br />
                          <br />
                          <input
                            className="form-control"
                            type="email"
                            id="em"
                            placeholder="Type your email"
                           
                          />
                        </div>

                        <div className="form-floating mb-3">
                          <label>Password :</label>
                          <br />
                          <br />
                          <input
                            className="form-control"
                            type="password"
                            id="pswd"
                            placeholder="Type your password"
                           
                          />
                        </div>

                        <div className="form-floating mb-3">
                          <label>Re-Type Password :</label>
                          <br />
                          <br />
                          <input
                            className="form-control"
                            type="password"
                            placeholder="Type your password"
                            
                          />
                        </div>

                        <div className="d-grid">
                          <input
                            type="submit"
                            className="btn1"
                            
                            value="Create Account"
                          ></input>
                        </div>

                        <br />

                       
                      </form>
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

export default SignUp;
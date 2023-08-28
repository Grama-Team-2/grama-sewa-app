/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from "react";
import Header from "../Common/UserHeader";
import { useAuthContext } from "@asgardeo/auth-react";
import { checkStatus } from "../../api/UserRequests";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getIdentityReport } from "../../api/GSRequests";

function Status() {
  const [nic, setNic] = useState("");
  const [request, setRequests] = useState(null);
  const [senderId, setSenderId] = useState("");
  const [loading, setLoading] = useState(false);
  const { getDecodedIDToken } = useAuthContext();
  const { httpRequest } = useAuthContext();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const checkStatusConfig = { ...checkStatus };
      checkStatusConfig.url =
        checkStatusConfig.url + "/" + nic + "/" + senderId;
      console.log(checkStatusConfig.url);
      const { data } = await httpRequest(checkStatusConfig);
      const identityReportConfig = { ...getIdentityReport };
      identityReportConfig.url = identityReportConfig.url + "/" + nic;

      const { data: personalData } = await httpRequest(identityReportConfig);

      setRequests({ ...personalData, ...data });
      setLoading(false);
    } catch (err) {
      window.alert("Enter a correct NIC!!!");
      console.log(err);
      setLoading(false);
    }
  };
  const fetchUserData = async () => {
    try {
      const { sub } = await getDecodedIDToken();
      setSenderId(sub);
      console.log(sub);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);
  return (
    <div>
      <Header></Header>
      <div>
        <div>
          <main style={{ backgroundColor: "#b31af01f" }}>
            <div className="container1">
              <div className="row justify-content-center">
                <div className="col-lg-5">
                  <br />
                  <br />
                  <br />

                  <br/>
                 
                  <div className="card shadow-lg border-0 rounded-lg ">
                    <div className="card-header">
                      <h3 className="text-center font-weight-light my-4">
                        Request Status
                      </h3>
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                        class="img-fluid"
                        alt="Phone image"
                      />
                    </div>
                    <div className="card-body">
                      <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
                        <div
                          className="input-group"
                          style={{ marginLeft: "70px" }}
                        >
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Type NIC No here"
                            aria-label="Search for..."
                            aria-describedby="btnNavbarSearch"
                            onChange={(e) => setNic(e.target.value)}
                          />
                          <input
                            type="button"
                            className="btn1"
                            id="btnNavbarSearch"
                            value="Search"
                            onClick={handleSubmit}
                          ></input>
                        </div>
                      </form>
                      <br />
                      <br />
                      <br />
                      <div
                        className="form-floating mb-3"
                        style={{ marginLeft: "50px" }}
                      >
                        Identity Verification Status
                        <input
                          className="textBox"
                          type="text"
                          value={
                            request?.identityVerificationStatus
                              ? "Verified"
                              : "Failed"
                          }
                          readOnly
                          style={{
                            backgroundColor:
                              request?.identityVerificationStatus === true
                                ? "#7fff00"
                                : request?.identityVerificationStatus === false
                                ? "red"
                                : "white",
                            marginLeft: "50px",
                            width: "150px",
                          }}
                        />
                      </div>
                      <br />

                      <div
                        className="form-floating mb-3"
                        style={{ marginLeft: "50px" }}
                      >
                        Address Verification Status
                        <input
                          className="textBox"
                          type="text"
                          readOnly
                          value={
                            request?.addressVerificationStatus
                              ? "Verified"
                              : "Failed"
                          }
                          style={{
                            backgroundColor:
                              request?.addressVerificationStatus === true
                                ? "#7fff00"
                                : request?.addressVerificationStatus === false
                                ? "red"
                                : "white",
                            marginLeft: "43px",
                            width: "150px",
                          }}
                        />
                      </div>
                      <br />

                      <div
                        className="form-floating mb-3"
                        style={{ marginLeft: "50px" }}
                      >
                        Police Verification Status
                        <input
                          className="textBox"
                          type="text"
                          value={
                            request?.policeVerificationStatus
                              ? "Verified"
                              : "Failed"
                          }
                          readOnly
                          style={{
                            backgroundColor:
                              request?.policeVerificationStatus === true
                                ? "#7fff00"
                                : request?.policeVerificationStatus === false
                                ? "red"
                                : "white",
                            marginLeft: "57px",
                            width: "150px",
                          }}
                        />
                      </div>
                      <br />

                      <div
                        className="form-floating mb-3"
                        style={{ marginLeft: "50px" }}
                      >
                        Validation Status
                        <input
                          className="textBox"
                          type="text"
                          value={request?.validationResult}
                          readOnly
                          style={{
                            backgroundColor:
                              request?.validationResult === "REJECTED"
                                ? "red"
                                : request?.validationResult === "PENDING"
                                ? "#0abab5"
                                : request?.validationResult === "COMPLETED"
                                ? "#7fff00"
                                : "white",
                            marginLeft: "115px",
                            width: "150px",
                            
                            fontWeight: "bold",
                            fontSize: "1.2rem",
                          }}
                        />
                      </div>
                    </div>
                    {request && request?.validationResult !== "PENDING" && (
                      <Button
                        variant="contained"
                        onClick={() =>
                          navigate("/user/report/download", {
                            state: {
                              data: request,
                            },
                          })
                        }
                        size="small"
                        style={{
                          width: "100px",
                          margin: "auto",
                          marginBottom: "1rem",
                          marginTop: "-1rem",
                          padding: "0.2rem 1rem",
                        }}
                      >
                        Download
                      </Button>
                    )}
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
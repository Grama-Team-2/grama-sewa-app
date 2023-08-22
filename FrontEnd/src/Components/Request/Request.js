import React, { useState, useEffect } from "react";

import Header from "../Common/UserHeader";
// import React, { useState } from 'react';
import { useAuthContext } from "@asgardeo/auth-react";
import { newRequest } from "../../api/UserRequests";

function Request() {
  const [nic, setNic] = useState("");
  const [no, setNo] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [senderId, setSenderId] = useState("");
  const { getDecodedIDToken } = useAuthContext();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const { httpRequest } = useAuthContext();

  const fetchUserData = async () => {
    try {
      const { sub } = await getDecodedIDToken();
      setSenderId(sub);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);
  // const history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const formData = {
        sender: senderId,
        NIC: nic,
        address: {
          no,
          street,
          city,
        },
      };
      const submitRequestConfig = { ...newRequest };
      submitRequestConfig.data = formData;
      const { data } = await httpRequest(submitRequestConfig);
      setRequests(data);
      setLoading(false);

      window.location.replace("/user/me");
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

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

                  <div className="card shadow-lg border-0 rounded-lg mt-5">
                    <div className="card-header">
                      <h3 className="text-center font-weight-light my-4">
                        Request letter
                      </h3>
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                        className="img-fluid"
                        alt="Phone image"
                      />
                    </div>
                    <div className="card-body">
                      <form method="post" onSubmit={handleSubmit}>
                        <div className="form-floating mb-3">
                          <label>NIC No :</label>
                          <br />
                          <br />
                          <input
                            className="form-control"
                            type="text"
                            onChange={(e) => setNic(e.target.value)}
                            required
                          />
                        </div>
                        <hr />
                        <label style={{ marginLeft: "150px" }}>
                          Address Details
                        </label>
                        <div className="form-floating mb-3">
                          <label>No :</label>
                          <br />
                          <br />
                          <input
                            className="form-control"
                            type="text"
                            onChange={(e) => setNo(e.target.value)}
                            required
                          />
                        </div>
                        <div className="form-floating mb-3">
                          <label>Street :</label>
                          <br />
                          <br />
                          <input
                            className="form-control"
                            type="text"
                            onChange={(e) => setStreet(e.target.value)}
                            required
                          />
                        </div>
                        <div className="form-floating mb-3">
                          <label>City :</label>
                          <br />
                          <br />
                          <input
                            className="form-control"
                            type="text"
                            onChange={(e) => setCity(e.target.value)}
                            required
                          />
                        </div>

                        <br />

                        <div className="d-grid">
                          <input
                            type="submit"
                            className="btn1"
                            value="Request"
                          ></input>
                        </div>
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

export default Request;

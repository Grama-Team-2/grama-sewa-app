import React, { useState } from "react";
import axios from "axios";
import Header from "./UserHeader";

function Request() {
  const [nic, setNic] = useState("");
  const [no, setNo] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const requestData = {
      NIC: nic,
      no: no,
      street: street,
      city: city,
    };
  
    console.log("Sending request data:", requestData);
  
    try {
      const response = await axios.post(
        
        "https://cf3a4176-54c9-4547-bcd6-c6fe400ad0d8-dev.e1-us-east-azure.choreoapis.dev/maoe/grama-api-service/requests-915/1.0.0/newRequest",
        requestData,
        {
          headers: {
            "Content-Type": "application/json",

            "Access-Control-Allow-Origin": "*",
             "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
          },
        }
      );
      console.log("Response data:", response.data);
    } catch (error) {
      console.error("Error sending data: ", error);
    }
  };
  

  return (
    <div>
      <Header />
      <div>
        <main>
          <div className="container1">
            <div className="row justify-content-center">
              <div className="col-lg-5">
                <br />
                <div className="card shadow-lg border-0 rounded-lg mt-5">
                  <div className="card-header">
                    <h3 className="text-center font-weight-light my-4">
                      Request letter
                    </h3>
                  </div>
                  <div className="card-body">
                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label>NIC No:</label>
                        <input
                          className="form-control"
                          type="text"
                          onChange={(e) => setNic(e.target.value)}
                          required
                        />
                      </div>
                      <hr />
                      <label>Address Details</label>
                      <div className="mb-3">
                        <label>No:</label>
                        <input
                          className="form-control"
                          type="text"
                          onChange={(e) => setNo(e.target.value)}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label>Street:</label>
                        <input
                          className="form-control"
                          type="text"
                          onChange={(e) => setStreet(e.target.value)}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label>City:</label>
                        <input
                          className="form-control"
                          type="text"
                          onChange={(e) => setCity(e.target.value)}
                          required
                        />
                      </div>
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
  );
}

export default Request;

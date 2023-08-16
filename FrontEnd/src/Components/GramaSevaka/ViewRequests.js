import React, { useState, useEffect } from "react";
import axios from "axios";
import GSHeader from "./GSHeader";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useAuthContext } from "@asgardeo/auth-react";
export default function ViewRequest() {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState([]);
  const { httpRequest } = useAuthContext();

  const requestConfig = {
    headers: {
      Accept: "application/json",
    },
    method: "GET",
    url: "https://cf3a4176-54c9-4547-bcd6-c6fe400ad0d8-dev.e1-us-east-azure.choreoapis.dev/maoe/grama-api-service/requests-915/1.0.0/getAllRequests",
  };

  useEffect(() => {
    httpRequest(requestConfig)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <GSHeader></GSHeader>
      <div className="mt-5">
        <div className="add_btn mt-2 mb-2" style={{ marginRight: "50px" }}>
          <div className="row justify-content-center">
            <h2 style={{ marginLeft: "100px" }}>Request List</h2>
          </div>
          <br />
        </div>

        <table className="table">
          <thead>
            <tr className="table-dark">
              <th scope="col">NIC</th>
              <th scope="col">Address</th>
              <th scope="col">Police Check</th>
              <th scope="col">Identity Check</th>
              <th scope="col">Address Check</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((Request) => (
              <tr>
                <td>{Request.nic}</td>
                <td>
                  {Request.no}
                  <br />
                  {Request.street}
                  {Request.city}
                  <br />
                </td>
                <td>
                  {" "}
                  <button className="btn">
                    <CheckCircleIcon />
                  </button>
                  <input type="text" value="verified"></input>
                </td>
                <td>
                  <button className="btn">
                    <CheckCircleIcon />
                  </button>
                  <input type="text" value="verified"></input>
                </td>
                <td>
                  <button className="btn">
                    <CheckCircleIcon />
                  </button>
                  <input type="text" value="verified"></input>
                </td>
                <td
                  className="d-flex justify-content-between"
                  style={{ marginTop: "20px" }}
                >
                  <button className="btn btn-danger">Pending</button>

                  <button className="btn btn-info">Processing</button>
                  <br />
                  <br />

                  <button className="btn btn1">MIR</button>
                  <br />

                  <button className="btn btn-success">Completed</button>
                  <br />
                </td>
                <br />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

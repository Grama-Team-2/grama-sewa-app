import React, { useState, useEffect } from "react";
import GSHeader from "./GSHeader";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useAuthContext } from "@asgardeo/auth-react";
import { getAllRequests } from "../../api/GSRequests";
import { updateStatus } from "../../api/GSUpdateStatus";
export default function ViewRequest() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const { httpRequest } = useAuthContext();


  const handleStatus = async (NIC,Status) => {
    try {
      setLoading(true);
      await httpRequest(updateStatus(NIC,Status));
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const { data } = await httpRequest(getAllRequests);
      setRequests(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchRequests();
  }, []);

  const renderedRequests = requests.map((req) => (
    <tr>
      <td>{req?.NIC}</td>
      <td>
        {"No " +
          req?.address?.no +
          ", " +
          req?.address?.street +
          ", " +
          req?.address?.city}
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
        <button className="btn btn-danger" onClick={() => handleStatus(req.NIC, "Pending")}>Pending</button>

        <button className="btn btn-info" onClick={() => handleStatus(req.NIC, "Processing")}>Processing</button>
        <br />
        <br />

        <button className="btn btn1" onClick={() => handleStatus(req.NIC, "More Information Required")}>MIR</button>
        <br />

        <button className="btn btn-success" onClick={() => handleStatus(req.NIC, "Completed")}>Completed</button>
        <br />
      </td>
      <br />
    </tr>
  ));
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
          <tbody>{renderedRequests}</tbody>
        </table>
      </div>
    </div>
  );
}

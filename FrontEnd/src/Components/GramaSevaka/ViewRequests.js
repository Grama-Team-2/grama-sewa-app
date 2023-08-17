import React, { useState, useEffect } from "react";
import GSHeader from "./GSHeader";
import { useAuthContext } from "@asgardeo/auth-react";
import {
  getAllRequests,
  validateAGramaRequest,
  updateStatus,
} from "../../api/GSRequests";
import VerificationRequest from "../VerificationRequest/VerificationRequest";
export default function ViewRequest() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const { httpRequest } = useAuthContext();

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

  const handleValidate = async (nic, address) => {
    const reqBody = {
      NIC: nic,
      address,
    };
    try {
      setLoading(true);
      validateAGramaRequest.data = reqBody;
      const { data } = await httpRequest(validateAGramaRequest);
      console.log(data);

      setRequests(
        requests.map((req) => {
          if (req.NIC === nic) {
            return { ...req, status: data.validationResult };
          } else return req;
        })
      );
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const renderedRequests = requests.map((req) => (
    <VerificationRequest
      nic={req?.NIC}
      address={req?.address}
      key={req?.NIC}
      status={req?.status}
      onValidate={() => handleValidate(req?.NIC, req?.address)}
    />
  ));
  return (
    <div>
      <GSHeader></GSHeader>
      <div className="mt-5">
        <div className="add_btn mt-2 mb-2" style={{ marginRight: "50px" }}>
          <div className="row justify-content-center">
            <h2 style={{ marginLeft: "100px" }}>Request List</h2>
          </div>
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

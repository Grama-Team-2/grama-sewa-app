import React, { useState, useEffect } from "react";
import GSHeader from "../Common/GSHeader";
import { useAuthContext } from "@asgardeo/auth-react";
import {
  getAllRequests,
  validateAGramaRequest,
  updateStatus,
} from "../../api/GSRequests";

import VerificationRequest from "../VerificationRequest/VerificationRequest";
import Loader from "../Common/Loader";

export default function ViewRequest() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [validationLoading, setValidationLoading] = useState(false);
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

  const handleValidate = async (nic) => {
    try {
      setValidationLoading(true);
      const requestValidateConfig = { ...validateAGramaRequest };
      requestValidateConfig.url = requestValidateConfig.url + "/" + nic;
      const { data } = await httpRequest(requestValidateConfig);

      setRequests(
        requests.map((req) => {
          if (req.NIC === nic) {
            return {
              ...req,
              identityVerificationStatus: data.identityVerificationStatus,
              addressVerificationStatus: data.addressVerificationStatus,
              policeVerificationStatus: data.policeVerificationStatus,
              validationResult: data.validationResult,
            };
          } else return req;
        })
      );
      setValidationLoading(false);
    } catch (error) {
      console.log(error);
      setValidationLoading(false);
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
      validationResult={req?.validationResult}
      onValidate={() => handleValidate(req?.NIC)}
      identityVerificationStatus={req?.identityVerificationStatus}
      addressVerificationStatus={req?.addressVerificationStatus}
      policeVerificationStatus={req?.policeVerificationStatus}
      validationPending={validationLoading}
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
        {loading ? (
          <Loader />
        ) : (
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
        )}
      </div>
    </div>
  );
}

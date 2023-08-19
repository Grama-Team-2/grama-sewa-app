import React, { useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { requestStatus } from "../../utils/config";

function VerificationRequest({
  nic,
  address,
  validationResult,
  onValidate,
  identityVerificationStatus,
  addressVerificationStatus,
  policeVerificationStatus,
}) {
  return (
    <tr>
      <td>{nic}</td>
      <td>
        {"No " + address?.no + ", " + address?.street + ", " + address?.city}
      </td>
      <td>
        <button className="btn">
          {policeVerificationStatus ? (
            <CheckCircleIcon style={{ color: "green" }} />
          ) : (
            <CancelIcon style={{ color: "tomato" }} />
          )}
        </button>
      </td>
      <td>
        <button className="btn">
          {identityVerificationStatus ? (
            <CheckCircleIcon style={{ color: "green" }} />
          ) : (
            <CancelIcon style={{ color: "tomato" }} />
          )}
        </button>
      </td>
      <td>
        <button className="btn">
          {addressVerificationStatus ? (
            <CheckCircleIcon style={{ color: "green" }} />
          ) : (
            <CancelIcon style={{ color: "tomato" }} />
          )}
        </button>
      </td>
      <td
        className="d-flex justify-content-between"
        // style={{ marginTop: "20px" }}
      >
        {validationResult === requestStatus.pending ? (
          <button className="btn btn-info" onClick={onValidate}>
            VALIDATE
          </button>
        ) : validationResult === requestStatus.rejected ? (
          <button className="btn btn-danger" disabled>
            REJECTED
          </button>
        ) : (
          <button className="btn btn-success" disabled>
            APPROVED
          </button>
        )}
      </td>
    </tr>
  );
}

export default VerificationRequest;

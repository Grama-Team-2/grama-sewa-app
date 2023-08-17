import React, { useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { requestStatus } from "../../utils/config";

function VerificationRequest({ nic, address, status, onValidate }) {
  return (
    <tr>
      <td>{nic}</td>
      <td>
        {"No " + address?.no + ", " + address?.street + ", " + address?.city}
      </td>
      <td>
        <button className="btn">
          <CheckCircleIcon style={{ color: "green" }} />
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
        {status === requestStatus.pending ? (
          <button className="btn btn-info" onClick={onValidate}>
            VALIDATE
          </button>
        ) : status === requestStatus.rejected ? (
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

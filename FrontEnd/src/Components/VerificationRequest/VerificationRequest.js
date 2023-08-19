import React, { useEffect, useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { requestStatus } from "../../utils/config";
import { useAuthContext } from "@asgardeo/auth-react";
import { getIdentityReport, getPoliceReport } from "../../api/GSRequests";
import IdentityReportModal from "../Common/IdentityReportModal";
import { Tooltip } from "@mui/material";
import PoliceReportModal from "../Common/PoliceReportModal";
import Loader from "../Common/Loader";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
function VerificationRequest({
  nic,
  address,
  validationResult,
  onValidate,
  identityVerificationStatus,
  addressVerificationStatus,
  policeVerificationStatus,
  validationPending,
}) {
  const [openIdentityModal, setOpenIdentityModal] = useState(false);
  const [openPoliceModal, setOpenPoliceModal] = useState(false);
  const [identityLoading, setIdentityLoading] = useState(false);
  const [policeLoading, setPoliceLoading] = useState(false);
  const { httpRequest } = useAuthContext();
  const [identityData, setIdentityData] = useState(null);
  const [policeData, setPoliceData] = useState(null);
  const fetchIdentityReport = async (nic) => {
    try {
      const identityReportConfig = { ...getIdentityReport };
      identityReportConfig.url = identityReportConfig.url + "/" + nic;
      const { data } = await httpRequest(identityReportConfig);
      setIdentityData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPoliceReport = async (nic) => {
    try {
      const policReportConfig = { ...getPoliceReport };

      policReportConfig.url = policReportConfig.url + "/" + nic;

      const identityReportConfig = { ...getIdentityReport };
      identityReportConfig.url = identityReportConfig.url + "/" + nic;
      const { data: personalData } = await httpRequest(identityReportConfig);
      const { data } = await httpRequest(policReportConfig);
      setPoliceData({ ...data, ...personalData });
      setIdentityData(personalData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleIdentityReport = async () => {
    setIdentityLoading(true);
    await fetchIdentityReport(nic);
    setIdentityLoading(false);
    setOpenIdentityModal(true);
  };
  const handlePoliceReport = async () => {
    setPoliceLoading(true);
    await fetchPoliceReport(nic);
    setPoliceLoading(false);
    setOpenPoliceModal(true);
  };
  return (
    <>
      {openIdentityModal && (
        <IdentityReportModal
          open={openIdentityModal}
          setOpen={setOpenIdentityModal}
          data={identityData}
        />
      )}
      {openPoliceModal && (
        <PoliceReportModal
          open={openPoliceModal}
          setOpen={setOpenPoliceModal}
          data={policeData}
        />
      )}
      <tr>
        <td>{nic}</td>
        <td>
          {"No " + address?.no + ", " + address?.street + ", " + address?.city}
        </td>
        <td>
          {validationResult !== requestStatus.pending ? (
            !policeLoading ? (
              <button className="btn">
                {policeVerificationStatus ? (
                  <CheckCircleIcon
                    style={{ color: "green" }}
                    onClick={() => handlePoliceReport(nic)}
                  />
                ) : (
                  <CancelIcon
                    style={{ color: "tomato" }}
                    onClick={() => handlePoliceReport(nic)}
                  />
                )}
              </button>
            ) : (
              <Loader />
            )
          ) : (
            <HourglassBottomIcon />
          )}
        </td>
        <td>
          {validationResult !== requestStatus.pending ? (
            !identityLoading ? (
              <button className="btn">
                {identityVerificationStatus ? (
                  <CheckCircleIcon
                    style={{ color: "green" }}
                    onClick={() => handleIdentityReport(nic)}
                  />
                ) : (
                  <Tooltip
                    title={
                      <h1
                        style={{
                          color: "#e32f0f",
                          fontSize: "1.2rem",
                          background: "#fff",
                        }}
                      >
                        Failed to generate identity report. Identity
                        verification failed!
                      </h1>
                    }
                    arrow
                  >
                    <CancelIcon
                      style={{ color: "tomato", cursor: "not-allowed" }}
                    />
                  </Tooltip>
                )}
              </button>
            ) : (
              <Loader />
            )
          ) : (
            <HourglassBottomIcon />
          )}
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
            !validationPending ? (
              <button className="btn btn-info" onClick={onValidate}>
                VALIDATE
              </button>
            ) : (
              <Loader />
            )
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
    </>
  );
}

export default VerificationRequest;

import React, { useEffect, useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { requestStatus } from "../../utils/config";
import { useAuthContext } from "@asgardeo/auth-react";
import {
  getAddressReport,
  getIdentityReport,
  getPoliceReport,
} from "../../api/GSRequests";
import IdentityReportModal from "../Common/IdentityReportModal";
import { Tooltip } from "@mui/material";
import PoliceReportModal from "../Common/PoliceReportModal";
import Loader from "../Common/Loader";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import AddressReportModal from "../Common/AddressReportModal";
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
  const [addressLoading, setAddressLoading] = useState(false);
  const [policeLoading, setPoliceLoading] = useState(false);
  const { httpRequest } = useAuthContext();
  const [identityData, setIdentityData] = useState(null);
  const [policeData, setPoliceData] = useState(null);
  const [addressData, setAddressData] = useState(null);
  const [openAddressModal, setOpenAddressModal] = useState(false);

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

  const fetchAddressReport = async (nic, address) => {
    try {
      setAddressLoading(true);
      const addressReportConfig = { ...getAddressReport };
      addressReportConfig.data = {
        NIC: nic,
        address: address,
      };
      const { data } = await httpRequest(addressReportConfig);

      setAddressData(data);
      setAddressLoading(false);
    } catch (error) {
      console.log(error);
      setAddressLoading(false);
    }
  };

  const handleIdentityReport = async (nic) => {
    setIdentityLoading(true);
    await fetchIdentityReport(nic);
    setIdentityLoading(false);
    setOpenIdentityModal(true);
  };
  const handlePoliceReport = async (nic) => {
    setPoliceLoading(true);
    await fetchPoliceReport(nic);
    setPoliceLoading(false);
    setOpenPoliceModal(true);
  };
  const handleAddressReport = async (nic, address) => {
    await fetchAddressReport(nic, address);
    setOpenAddressModal(true);
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
      {openAddressModal && (
        <AddressReportModal
          open={openAddressModal}
          setOpen={setOpenAddressModal}
          data={addressData}
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
          {validationResult !== requestStatus.pending ? (
            !addressLoading ? (
              <button className="btn">
                {addressVerificationStatus ? (
                  <CheckCircleIcon
                    style={{ color: "green" }}
                    onClick={() => handleAddressReport(nic, address)}
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
                        Failed to generate address report. Address verification
                        failed!
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

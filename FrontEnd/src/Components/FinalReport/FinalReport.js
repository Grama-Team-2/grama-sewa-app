import React from "react";
import Box from "@mui/material/Box";
import html2canvas from "html2canvas";

import Grid from "@mui/material/Grid";
import { useRef } from "react";
import jsPDF from "jspdf";
import { useLocation } from "react-router-dom";
import { Button } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function FinalReport() {
  const {
    state: { data },
  } = useLocation();
  const reportTemplateRef = useRef(null);

  const handleGeneratePdf = () => {
    html2canvas(reportTemplateRef.current).then((canvas) => {
      let imgWidth = 208;
      let imgHeight = (canvas.height * imgWidth) / canvas.width;
      const imgData = canvas.toDataURL("img/png");
      const pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      // pdf.output('dataurlnewwindow');
      pdf.save("download.pdf");
    });
  };

  return (
    <Box sx={style} ref={reportTemplateRef}>
      <h2 variant="h6" component="h2" className="identity-report-heading">
        Grama Sevaka Report
      </h2>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4 }}>
        <Grid item xs={2} sm={2} md={2}>
          <h3 className="identity-report-item">NIC</h3>
        </Grid>
        <Grid item xs={2} sm={2} md={2}>
          <h3 className="identity-report-item">{data?.NIC}</h3>
        </Grid>
        <Grid item xs={2} sm={2} md={2}>
          <h3 className="identity-report-item">First Name</h3>
        </Grid>
        <Grid item xs={2} sm={2} md={2}>
          <h3 className="identity-report-item">{data?.firstName}</h3>
        </Grid>
        <Grid item xs={2} sm={2} md={2}>
          <h3 className="identity-report-item">Last Name</h3>
        </Grid>
        <Grid item xs={2} sm={2} md={2}>
          <h3 className="identity-report-item">{data?.lastName}</h3>
        </Grid>
        <Grid item xs={2} sm={2} md={2}>
          <h3 className="identity-report-item">Address</h3>
        </Grid>
        <Grid item xs={2} sm={2} md={2}>
          <h3 className="identity-report-item identity-report-item-address">
            <div>{data?.address?.no}</div>
            <div>{data?.address?.street}</div>
            <div>{data?.address?.city}</div>
          </h3>
        </Grid>
        <Grid item xs={2} sm={2} md={2}>
          <h3 className="identity-report-item">Civil Status</h3>
        </Grid>
        <Grid item xs={2} sm={2} md={2}>
          <h3 className="identity-report-item">{data?.civilStatus}</h3>
        </Grid>
        <Grid item xs={2} sm={2} md={2}>
          <h3 className="identity-report-item">Police Verification</h3>
        </Grid>
        <Grid item xs={2} sm={2} md={2}>
          <h3 className="identity-report-item">
            {data?.policeVerificationStatus ? (
              <span style={{ color: "green" }}>Verified</span>
            ) : (
              <span style={{ color: "red" }}>Failed</span>
            )}
          </h3>
        </Grid>
        <Grid item xs={2} sm={2} md={2}>
          <h3 className="identity-report-item">Address Verification</h3>
        </Grid>
        <Grid item xs={2} sm={2} md={2}>
          <h3 className="identity-report-item">
            {data?.addressVerificationStatus ? (
              <span style={{ color: "green" }}>Verified</span>
            ) : (
              <span style={{ color: "red" }}>Failed</span>
            )}
          </h3>
        </Grid>
        <Grid item xs={2} sm={2} md={2}>
          <h3 className="identity-report-item">Identity Verification</h3>
        </Grid>
        <Grid item xs={2} sm={2} md={2}>
          <h3 className="identity-report-item">
            {data?.identityVerificationStatus ? (
              <span style={{ color: "green" }}>Verified</span>
            ) : (
              <span style={{ color: "red" }}>Failed</span>
            )}
          </h3>
        </Grid>
        <Grid item xs={4} sm={2} md={2}>
          <h3
            className="identity-report-item identity-report-item-status"
            style={{ border: "2px solid #e32f0f" }}
          >
            {data?.validationResult === "REJECTED" ? (
              <span style={{ color: "red" }}>REJECTED</span>
            ) : (
              <span style={{ color: "red" }}>APPROVED</span>
            )}
          </h3>
        </Grid>
        <Grid item xs={1.7} sm={2} md={2}></Grid>
        <Grid item xs={2} sm={2} md={2}>
          <Button
            variant="contained"
            color="success"
            onClick={handleGeneratePdf}
          >
            Download
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

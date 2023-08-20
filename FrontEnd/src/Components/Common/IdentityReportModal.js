import React, { useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import "./IdentityReportModal.css";
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

export default function IdentityReportModal({ open, setOpen, data }) {
  // const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <h2 variant="h6" component="h2" className="identity-report-heading">
              Identity Report
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
              <Grid item xs={4} sm={2} md={2}>
                <h3
                  className="identity-report-item identity-report-item-status"
                  style={{ border: "2px solid #e32f0f" }}
                >
                  Verified
                </h3>
              </Grid>
            </Grid>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

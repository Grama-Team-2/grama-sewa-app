import React from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useAuthContext } from "@asgardeo/auth-react";
import { useNavigate } from "react-router-dom";

function GSHeader() {
  const { signOut } = useAuthContext();
  const navigate = useNavigate();
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light ">
        <a className="navbar-brand" href="/" style={{ color: "white" }}>
          Grama Assist
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li
              className="nav-item active"
              onClick={() => navigate("/gs/me/requests")}
              style={{ cursor: "pointer" }}
            >
              <span className="nav-link" style={{ color: "white" }}>
                View Requests <span className="sr-only">(current)</span>
              </span>
            </li>
          </ul>
        </div>
        <div className="navbar-notification" style={{ marginRight: "15px" }}>
          <span className="notification-icon">
            <NotificationsIcon />
          </span>
        </div>
        <div className="navbar-actions" style={{ marginRight: "15px" }}>
          <span className="logout-icon" onClick={() => signOut()}>
            <LogoutIcon />
          </span>
        </div>
      </nav>
    </div>
  );
}

export default GSHeader;

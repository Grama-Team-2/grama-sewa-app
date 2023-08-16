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
      <nav class="navbar navbar-expand-lg navbar-light ">
        <a class="navbar-brand" href="/gshome" style={{ color: "white" }}>
          Grama Assist
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item active">
              <span
                class="nav-link"
                onClick={() => navigate("/gs/me/requests")}
                style={{ color: "white" }}
              >
                View Requests <span class="sr-only">(current)</span>
              </span>
            </li>
          </ul>
        </div>
        <div class="navbar-notification" style={{ marginRight: "15px" }}>
          <span class="notification-icon">
            <NotificationsIcon />
          </span>
        </div>
        <div class="navbar-actions" style={{ marginRight: "15px" }}>
          <span class="logout-icon" onClick={() => signOut()}>
            <LogoutIcon />
          </span>
        </div>
      </nav>
    </div>
  );
}

export default GSHeader;

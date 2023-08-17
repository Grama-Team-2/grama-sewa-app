import React from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useAuthContext } from "@asgardeo/auth-react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import Request from "./Request";
{
  /* <Route path="/request" component={Request} /> */
}
function Header() {
  const { signOut } = useAuthContext();
  const navigate = useNavigate();
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light ">
        <a class="navbar-brand" href="/user/me" style={{ color: "white" }}>
          Grama Assist
        </a>

        {/* <a class="navbar-brand" href="/user/me/request-cert" style={{ color: "white" }}>
          Request letter
        </a>

        <a  class="navbar-brand" href="/status" style={{ color: "white" }} >
          Check Status
        </a>

        <a class="navbar-brand" href="#" style={{ color: "white" }}>
          Help
        </a> */}

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
              <Link
                class="nav-link"
                to="/user/me/request-cert"
                style={{ color: "white" }}
              >
                Request letter{" "}
              </Link>
              {/* <a
                class="nav-link"
                href="/user/me/request-cert"
                style={{ color: "white" }}
              >
                Request letter 
                <span class="sr-only" href="/user/me/request-cert">(current)</span>
               </a> */}
            </li>
            <li class="nav-item">
              <Link
                class="nav-link"
                to="/user/me/status"
                style={{ color: "white" }}
              >
                Check Status{" "}
              </Link>
              {/* <a class="nav-link" href="/status" style={{ color: "white" }}>
                Check Status
              </a> */}
            </li>
            <li class="nav-item">


            <Link
                class="nav-link"
                to="/user/me/contact"
                style={{ color: "white" }}
              >
                Contact{" "}
              </Link>
              {/* <a class="nav-link" href="/user/me/contact" style={{ color: "white" }}>
                Contact
              </a> */}
            </li>
          </ul>
        </div>
        <div class="navbar-notification" style={{ marginRight: "15px" }}>
          <span class="notification-icon">
            <NotificationsIcon />
          </span>
        </div>
        <div
          class="navbar-actions"
          style={{ marginRight: "15px", cursor: "pointer" }}
        >
          <span class="logout-icon" onClick={() => signOut()}>
            <LogoutIcon style={{ cursor: "pointer" }} />
          </span>
        </div>
      </nav>
    </div>
  );
}

export default Header;

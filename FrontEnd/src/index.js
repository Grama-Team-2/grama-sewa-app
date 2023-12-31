import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AuthProvider } from "@asgardeo/auth-react";
import { ContextProvider } from "./context/UserContext";

const config = {
  signInRedirectURL: process.env.REACT_APP_SIGN_IN_REDIRECT_URL,
  signOutRedirectURL: process.env.REACT_APP_SIGN_OUT_REDIRECT_URL,
  clientID: process.env.REACT_APP_CLIENT_ID,
  baseUrl: process.env.REACT_APP_BASE_URL,
  scope: [
    "openid",
    "profile",
    "app_roles",
    "urn:interns:identitycheckserviceident:check_identity urn:interns:policecheckservicepolicev:police_ver_check urn:interns:addresscheckserviceaddres:check_address urn:interns:gramaapiservicerequests91:reqeust_reaction urn:interns:gramaapiservicerequests91:get_all_requests urn:interns:gramaapiservicerequests91:post_a_request",
  ],
  resourceServerURLs: [
    "https://cf3a4176-54c9-4547-bcd6-c6fe400ad0d8-dev.e1-us-east-azure.choreoapis.dev/maoe/grama-api-service/requests-915/1.0.0",
    "https://cf3a4176-54c9-4547-bcd6-c6fe400ad0d8-dev.e1-us-east-azure.choreoapis.dev/maoe/grama-api-service/requests-915/1.0.0/validate",
    "https://cf3a4176-54c9-4547-bcd6-c6fe400ad0d8-dev.e1-us-east-azure.choreoapis.dev/maoe/slacknotifications/endpoint-7070-070/1.0.0/sendNotifications",
    "https://cf3a4176-54c9-4547-bcd6-c6fe400ad0d8-dev.e1-us-east-azure.choreoapis.dev/maoe/grama-api-service/requests-915/1.0.0/police-report",
    " https://cf3a4176-54c9-4547-bcd6-c6fe400ad0d8-dev.e1-us-east-azure.choreoapis.dev/maoe/grama-api-service/requests-915/1.0.0/address-report",
  ],
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ContextProvider>
      <AuthProvider config={config}>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<App />}></Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ContextProvider>
  </React.StrictMode>
);

reportWebVitals();

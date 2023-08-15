import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AuthProvider } from "@asgardeo/auth-react";

const config = {
  signInRedirectURL: "http://localhost:3000",
  signOutRedirectURL: "http://localhost:3000",
<<<<<<< HEAD
  clientID: "X7fb7Ie9feZyVZi2ouH6MbNvGV8a",
  baseUrl: "https://api.asgardeo.io/t/interns",
  scope: ["openid", "profile"],
=======
  clientID: "sIUjQFULB4OeAVq0vPofXGwyBo0a",
  baseUrl: "https://api.asgardeo.io/t/interns",
  scope: [
    "openid",
    "profile",
    "app_roles",
    "urn:interns:gramaapiservicerequests91:reqeust_reaction urn:interns:gramaapiservicerequests91:get_all_requests urn:interns:gramaapiservicerequests91:post_a_request urn:interns:identitycheckserviceident:check_identity urn:interns:policecheckservicepolicev:police_ver_check urn:interns:addresscheckserviceaddres:check_address",
  ],
>>>>>>> f16a79f64b11a200647d99efccef12979f61f4e5
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider config={config}>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<App />}></Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();

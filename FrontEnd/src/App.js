import React from "react";
import "./App.css";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Login from "./Components/Common/Login";
import Request from "./Components/Request/Request";
import NotFound from "./Components/Common/NotFound";
import Contact from "./Components/Contact/Contact";
import Status from "./Components/User/Status";

import UserDashBoard from "./Components/User/UserDashboard";
import ViewRequest from "./Components/VerificationRequests/VerificationRequests";
import { useAuthContext } from "@asgardeo/auth-react";
import { useContext, useEffect, useState } from "react";
import { userRoles } from "./utils/config";
import Restrict from "./Components/Restrict/Restrict";
import UserContext from "./context/UserContext";
import ProtectedRoute from "./ProtectedRoute";
import GramaDashboard from "./Components/GSDashboard/GramaSevakaDashboard";
import FinalReport from "./Components/FinalReport/FinalReport";

function App() {
  const { state } = useAuthContext();
  const navigate = useNavigate();
  // const [role, setRole] = useState("");
  const { role, setRole } = useContext(UserContext);
  const { getDecodedIDToken } = useAuthContext();

  const getBasicInfo = async () => {
    try {
      const response = await getDecodedIDToken();
      const { application_roles } = response;
      if (Array.isArray(application_roles)) {
        setRole(application_roles[0]);
      } else {
        setRole(application_roles);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    state?.isAuthenticated && getBasicInfo();
  });

  useEffect(() => {
    if (role !== "") {
      role === userRoles.USER
        ? navigate("/user/me")
        : role === userRoles.GRAMA
        ? navigate("/gs/me")
        : navigate("/");
    } else {
      console.log("role is empty");
    }
  }, [role]);
  return (
    <div>
      <Routes>
        <Route index element={<Login />}></Route>
        <Route path="/error" element={<NotFound />} />
        <Route
          path="/user/me"
          element={
            <ProtectedRoute redirectPath="/" authRole={userRoles.USER}>
              <UserDashBoard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/report/download"
          element={
            <ProtectedRoute redirectPath="/" authRole={userRoles.USER}>
              <FinalReport />
            </ProtectedRoute>
          }
        />
        <Route
          path="/contact"
          element={
            <ProtectedRoute redirectPath="/" authRole={userRoles.USER}>
              <Contact />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/me/request-cert"
          element={
            <ProtectedRoute redirectPath="/" authRole={userRoles.USER}>
              <Request />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user/me/status"
          element={
            <ProtectedRoute redirectPath="/" authRole={userRoles.USER}>
              <Status />
            </ProtectedRoute>
          }
        />
        <Route
          path="/gs/me/requests"
          element={
            <ProtectedRoute redirectPath="/" authRole={userRoles.GRAMA}>
              <ViewRequest />
            </ProtectedRoute>
          }
        />
        <Route path="/restricted" element={<Restrict />} />

        <Route
          path="/user/me/contact"
          element={
            <ProtectedRoute redirectPath="/" authRole={userRoles.USER}>
              <Contact />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/me/status"
          element={
            <ProtectedRoute redirectPath="/" authRole={userRoles.USER}>
              <Status />
            </ProtectedRoute>
          }
        />
        <Route
          path="/gs/me"
          element={
            <ProtectedRoute redirectPath="/" authRole={userRoles.GRAMA}>
              <GramaDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;

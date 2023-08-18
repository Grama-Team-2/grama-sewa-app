import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Login from "./Components/Common/Login";
import Request from "./Components/Request/Request";
import GSDashBoard from "./Components/GSDashboard/GramaSevakaDashboard";
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

function App() {
  const { state } = useAuthContext();
  const navigate = useNavigate();
  const { role, setRole } = useContext(UserContext);

  const { getBasicUserInfo } = useAuthContext();

  const getBasicInfo = async () => {
    try {
      const response = await getBasicUserInfo();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBasicInfo();
  }, [role]);

  return (
    <div>
      <Routes>
        <Route index element={<Login />}></Route>
        <Route path="/error" element={<NotFound />} />
        <Route
          path="/user/me"
          element={
            <ProtectedRoute redirectPath="/">
              <UserDashBoard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/contact"
          element={
            <ProtectedRoute redirectPath="/">
              <Contact />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/me/request-cert"
          element={
            <ProtectedRoute redirectPath="/">
              <Request />
            </ProtectedRoute>
          }
        />
        <Route
          path="/gs/me/requests"
          element={
            state.isAuthenticated ? (
              <Navigate to="/user/me" />
            ) : state.isAuthenticated && role === userRoles.GRAMA ? (
              <Navigate to="/gs/me" />
            ) : (
              <Login />
            )
          }
        />
        <Route path="/restricted" element={<Restrict />} />

        <Route
          path="/user/me/contact"
          element={
            state.isAuthenticated ? <Contact /> : <Navigate to="/restricted" />
          }
        />
        <Route
          path="/user/me/status"
          element={
            state.isAuthenticated ? <Status /> : <Navigate to="/restricted" />
          }
        />
        <Route
          path="/gs/me"
          element={
            <ProtectedRoute redirectPath="/">
              <ViewRequest />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;

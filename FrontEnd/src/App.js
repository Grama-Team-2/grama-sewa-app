import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Login from "./Components/Common/Login";
import Request from "./Components/User/Request";
import GSDashBoard from "./Components/GramaSevaka/GramaSevakaDashboard";
import NotFound from "./Components/Common/NotFound";

import UserDashBoard from "./Components/User/UserDashboard";
import ViewRequest from "./Components/GramaSevaka/ViewRequests";
import { useAuthContext } from "@asgardeo/auth-react";
import { useContext, useEffect, useState } from "react";
import { userRoles } from "./utils/config";
import Restrict from "./Components/Restrict/Restrict";
import UserContext from "./context/UserContext";

function App() {
  const { state } = useAuthContext();
  const { role, setRole } = useContext(UserContext);
  const { getBasicUserInfo } = useAuthContext();
  const navigate = useNavigate();
  const getBasicInfo = async () => {
    try {
      const { applicationRoles } = await getBasicUserInfo();
      setRole(applicationRoles);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getBasicInfo();
    navigate("/");
  }, [role]);

  return (
    <div>
      <Routes>
        <Route path="/error" element={<NotFound />} />

        <Route
          path="/user/me/request-cert"
          element={
            state.isAuthenticated ? (
              <Request />
            ) : state.isAuthenticated ? (
              <Navigate to="/user/me/request-cert" replace={true} />
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/user/me"
          element={
            state?.isAuthenticated ? (
              <UserDashBoard />
            ) : (
              <Navigate to="/restricted" />
            )
          }
        />

        {/* <Route path="/status" element={<Status />} /> */}
        <Route
          path="/gs/me/requests"
          element={
            state.isAuthenticated ? (
              <ViewRequest />
            ) : (
              <Navigate to="/restricted" />
            )
          }
        />
        <Route
          path="/gs/me"
          element={
            state.isAuthenticated ? (
              <GSDashBoard />
            ) : (
              <Navigate to="/restricted" />
            )
          }
        />

        <Route
          path="/"
          element={
            state.isAuthenticated && role === userRoles.USER ? (
              <Navigate to="/user/me" />
            ) : state.isAuthenticated && role === userRoles.GRAMA ? (
              <Navigate to="/gs/me" />
            ) : (
              <Login />
            )
          }
        />
        <Route path="/restricted" element={<Restrict />} />
      </Routes>
    </div>
  );
}

export default App;

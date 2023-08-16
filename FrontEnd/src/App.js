import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./Components/Common/Login";
import Request from "./Components/User/Request";
import Status from "./Components/User/Status";
import GSDashBoard from "./Components/GramaSevaka/GramaSevakaDashboard";

import UserDashBoard from "./Components/User/UserDashboard";
import ViewRequest from "./Components/GramaSevaka/ViewRequests";
import { useAuthContext } from "@asgardeo/auth-react";
import { useEffect, useState } from "react";
import { userRoles } from "./utils/config";
import Restrict from "./Components/Restrict/Restrict";

function App() {
  const { state } = useAuthContext();
  const [role, setRole] = useState("");

  const { getBasicUserInfo } = useAuthContext();

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
  });

  return (
    <div>
      <Routes>
        {/* <Route path="/signup" element={<SignUp />} /> */}

        <Route
          path="/user/me/request-cert"
          element={
            state.isAuthenticated && role === userRoles.USER ? (
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
            state.isAuthenticated && role === userRoles.USER ? (
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
            state.isAuthenticated && role === userRoles.GRAMA ? (
              <ViewRequest />
            ) : (
              <Navigate to="/restricted" />
            )
          }
        />
        <Route
          path="/gs/me"
          element={
            state.isAuthenticated && role === userRoles.GRAMA ? (
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

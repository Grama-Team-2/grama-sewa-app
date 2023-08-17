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

  const { getBasicUserInfo } = useAuthContext();
  const navigate = useNavigate();
  const getBasicInfo = async () => {
    try {
      const response = await getBasicUserInfo();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Routes>
        <Route path="/error" element={<NotFound />} />

        <Route
          path="/user/me/request-cert"
          element={state.isAuthenticated ? <Request /> : <Login />}
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

        {/* <Route
          path="/"
          element={
<<<<<<< HEAD
            state.isAuthenticated (
=======
            state.isAuthenticated ?(
>>>>>>> d9871a7c51e85e5a57fd7cf526b003f338582e2a
              <Navigate to="/user/me" />
            ) : state.isAuthenticated  (
              <Navigate to="/gs/me" />
            ) : (
              <Login />
            )
          }
        /> */}
        <Route path="/restricted" element={<Restrict />} />
      </Routes>
    </div>
  );
}

export default App;

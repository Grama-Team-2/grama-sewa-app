import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/Common/Login";
import SignUp from "./Components/Common/SignUp";
import Request from "./Components/User/Request";
import Status from "./Components/User/Status";
import GSDashBoard from "./Components/GramaSevaka/GramaSevakaDashboard";

import UserDashBoard from "./Components/User/UserDashboard";
import ViewRequest from "./Components/GramaSevaka/ViewRequests";
import { useAuthContext } from "@asgardeo/auth-react";
import { useEffect, useState } from "react";

function App() {
  const { state } = useAuthContext();
  const [role, setRole] = useState("");

  const { getBasicUserInfo } = useAuthContext();

  const getBasicInfo = async () => {
    try {
      const { applicationRoles } = await getBasicUserInfo();
      setRole(applicationRoles);
      console.log(applicationRoles);
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
          path="/"
          element={
<<<<<<< HEAD
            state.isAuthenticated && role === "User" ? (
              <UserDashBoard />
            ) : state.isAuthenticated && role === "Gramasevaka" ? (
=======
            state.isAuthenticated && role === "User-G2" ? (
              <UserDashBoard />
            ) : state.isAuthenticated && role === "Grama-Sewaka-G2" ? (
>>>>>>> f16a79f64b11a200647d99efccef12979f61f4e5
              <GSDashBoard />
            ) : (
              <Login />
            )
          }
        />

        {/* <Route path="/request" element={<Request />} />
        <Route path="/userhome" element={<UserDashBoard />} />
        <Route path="/status" element={<Status />} />
        <Route path="/gshome" element={<GSDashBoard />} />
        <Route path="/viewrequest" element={<ViewRequest />} /> */}
      </Routes>
    </div>
  );
}

export default App;

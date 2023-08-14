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

function App() {
  const { state } = useAuthContext();

  return (
    <div>
      <Routes>
        {/* <Route path="/signup" element={<SignUp />} /> */}
        <Route
          path="/"
          element={state.isAuthenticated ? <UserDashBoard /> : <Login />}
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

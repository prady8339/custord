import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Pages/Auth/Login";
import Signup from "./Pages/Auth/Signup";
import Home from "./Pages/Home/Home";
import FbIntegration from "./Pages/FbIntegration/FbConnect";
import FbDisConnect from "./Pages/FbIntegration/FbDisconnect";
import ProtectedRoutes from "./Pages/Auth/ProtectedRoutes";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/home"
        element={
          <ProtectedRoutes>
            <Home />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/fbconnect"
        element={
          <ProtectedRoutes>
            <FbIntegration />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/fbdisconnect"
        element={
          <ProtectedRoutes>
            <FbDisConnect />
          </ProtectedRoutes>
        }
      />
    </Routes>
  );
}

export default App;

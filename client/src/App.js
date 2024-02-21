import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Pages/Auth/Login';
import Signup from './Pages/Auth/Signup';
import Home from  './Pages/Home/Home';
import FbIntegraion from './Pages/FbIntegration/FbConnect';
import FbDisConnect from './Pages/FbIntegration/FbDisconnect';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
         <Route path="/fbconnect" element={<FbIntegraion />} />
          <Route path="/fbdisconnect" element={<FbDisConnect />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

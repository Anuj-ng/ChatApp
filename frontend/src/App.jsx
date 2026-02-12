import React from "react";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Signup from "./components/Signup.jsx";
// 
import Login from "./components/Login.jsx";
import Homepage from "./components/Homepage.jsx";
const App = () => {
  return (
    <div className="App p-4 h-screen flex items-center justify-center">
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;

// import React, { useEffect, useState } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Signup from "./components/Signup.jsx";
// import io from "socket.io-client";
// import Login from "./components/Login.jsx";
// import Homepage from "./components/Homepage.jsx";
// import { useDispatch, useSelector } from "react-redux";
// import { setOnlineUsers } from "./redux/userSlice";
// import { setSocket } from "./redux/socketSlice.js";

// const App = () => {

//   const { authUser } = useSelector((store) => store.user);
//   const { socket } = useSelector((store) => store.socket);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (authUser) {
//       const socket = io("http://localhost:8080", {
//         query: {
//           userId: authUser._id,
//         },
//       });
//       setSocket(socket);
//       dispatch(setSocket(socket));
//       socket.on("getOnlineUsers", (onlineUsers) => {
//         dispatch(setOnlineUsers(onlineUsers));
//       });
//       return () => socket?.close();
//     } else {
//       if (socket) {
//         socket?.close();
//         dispatch(setSocket(null));
//       }
//     }
//   }, [authUser]);
//   return (
//     <div className="App p-4 h-screen flex items-center justify-center">
//       <Router>
//         <Routes>
//           <Route path="/" element={<Homepage  />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Signup />} />
//         </Routes>
//       </Router>
//     </div>
//   );
// };

// export default App;

import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route,Navigate } from "react-router-dom";
import io from "socket.io-client";

import Signup from "./components/Signup.jsx";
import Login from "./components/Login.jsx";
import Homepage from "./components/Homepage.jsx";

import { useDispatch, useSelector } from "react-redux";
import { setOnlineUsers } from "./redux/userSlice";
import { setSocket } from "./redux/socketSlice";

const App = () => {
  const { authUser } = useSelector((store) => store.user);
  const socket = useSelector((store) => store.socket.socket);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!authUser) {
      socket?.close();
      dispatch(setSocket(null));
      return;
    }

    const newSocket = io("https://chat-backend-7eml.onrender.com", {
      query: { userId: authUser._id },
    });

    dispatch(setSocket(newSocket));

    newSocket.on("getOnlineUsers", (onlineUsers) => {
      dispatch(setOnlineUsers(onlineUsers));
    });

    return () => {
      newSocket.off("getOnlineUsers");
      newSocket.close();
    };
  }, [authUser]);

  return (
    <div className="App p-4 h-screen flex items-center justify-center">
      <Router>
        <Routes>
               <Route
          path="/"
          element={authUser ? <Homepage /> : <Navigate to="/login" />}
        />

        {/* If already logged in → go to homepage */}
        <Route
          path="/login"
          element={!authUser ? <Login /> : <Navigate to="/login" />}
        />

        <Route
          path="/register"
          element={!authUser ? <Signup /> : <Navigate to="/signup" />}
        />
        </Routes>
      </Router>
    </div>
  );
};

export default App;

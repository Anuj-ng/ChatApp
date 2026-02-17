// import React, { useRef } from "react";
// import { CiSearch } from "react-icons/ci";
// import OtherUsers from "./OtherUsers";
// import { useSelector, useDispatch } from "react-redux";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import { useState } from "react";
// import { setOtherUsers } from "../redux/userSlice";
// import gsap from "gsap";
// const Sidebar = ({ openChat }) => {
//   const lastSpawn = useRef(0);
//   const dispatch = useDispatch();
//   const startSnow = () => {
//     const now = Date.now();

//     if (now - lastSpawn.current < 120) return;
//     lastSpawn.current = now;
//     const container = document.querySelector(".snow-container");

//     for (let i = 0; i < 8; i++) {
//       const snow = document.createElement("span");
//       snow.classList.add("snow-particle");
//       container.appendChild(snow);

//       gsap.fromTo(
//         snow,
//         {
//           left: Math.random() * 260,
//           x: Math.random() * 120,
//           y: -10,
//           opacity: 0,
//         },
//         {
//           y: 100,
//           opacity: 1,
//           duration: 1.2 + Math.random(),
//           ease: "power1.out",
//           // onComplete: () => snow.remove(),
//         },
//       );
//     }
//   };

//   // const stopSnow = () => {
//   //   document.querySelector(".snow-container").innerHTML = "";
//   // };
//   const [search, setSearch] = useState("");
//   const { otherUsers } = useSelector((store) => store.user);
//   const navigate = useNavigate();
//   const logOutHandler = async () => {
//     try {
//       const res = await axios.get("http://localhost:8080/api/users/logout");
//       navigate("/login");
//       toast.success(res.data.message);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   const searchSubmitHandler = (e) => {
//     e.preventDefault();
//     const conversationUser = otherUsers?.find((user) =>
//       user.fullName.toLowerCase().includes(search.toLowerCase()),
//     );
//     if (conversationUser) {
//       dispatch(setOtherUsers([conversationUser]));
//     } else {
//       toast.error("User Not Found");
//     }
//   };

//   return (
//     <div className="sidebar">
//       <div className="sidebar-search">
//         <form onSubmit={searchSubmitHandler} className="search-form">
//           <input
//             value={search}
//             type="text"
//             placeholder="Search chats"
//             className="search-input"
//             onChange={(e) => setSearch(e.target.value)}
//           />
//           <button type="submit" className="search-btn">
//             <CiSearch className="search-icon" />
//           </button>
//         </form>
//       </div>

//       <div className="sidebar-users">
//         <div className="users-scroll">
//           <OtherUsers openChat={openChat} />
//         </div>

//         <div className="sidebar-logout">
//           <button
//             type="button"
//             className="logout-btn"
//             onMouseEnter={startSnow}
//             onMouseMove={startSnow}
//             onClick={logOutHandler}
//           >
//             Logout
//             <div className="snow-container"></div>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;
import React, { useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import OtherUsers from "./OtherUsers";
import { useSelector,useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import gsap from "gsap";
import {setAuthUser,setOtherUsers} from "../redux/userSlice"

const Sidebar = ({ openChat }) => {
  const lastSpawn = useRef(0);
  const navigate = useNavigate();
  const dispatch=useDispatch()

  const { otherUsers } = useSelector((store) => store.user);
  const [search, setSearch] = useState("");

  // ❄️ Snow animation (unchanged)
  const startSnow = () => {
    const now = Date.now();
    if (now - lastSpawn.current < 120) return;
    lastSpawn.current = now;

    const container = document.querySelector(".snow-container");

    for (let i = 0; i < 8; i++) {
      const snow = document.createElement("span");
      snow.classList.add("snow-particle");
      container.appendChild(snow);

      gsap.fromTo(
        snow,
        {
          left: Math.random() * 260,
          x: Math.random() * 120,
          y: -10,
          opacity: 0,
        },
        {
          y: 100,
          opacity: 1,
          duration: 1.2 + Math.random(),
          ease: "power1.out",
        }
      );
    }
  };

  // 🔍 NEW LIVE SEARCH (non-destructive)
  const filteredUsers = otherUsers?.filter((user) =>
    `${user.fullName} ${user.username}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const logOutHandler = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/users/logout");
      navigate("/login");
      toast.success(res.data.message);
      dispatch(setAuthUser(null))
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="sidebar">
      {/* 🔍 Search */}
      <div className="sidebar-search">
        <div className="search-form">
          <input
            value={search}
            type="text"
            placeholder="Search chats"
            className="search-input"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="button" className="search-btn">
            <CiSearch className="search-icon" />
          </button>
        </div>
      </div>

      {/* 👥 Users list */}
      <div className="sidebar-users">
        <div className="users-scroll">
          <OtherUsers users={filteredUsers} openChat={openChat} />

          {/* Optional UX message */}
          {filteredUsers?.length === 0 && (
            <p className="text-center text-gray-400 mt-4">
              No users found
            </p>
          )}
        </div>

        {/* 🚪 Logout */}
        <div className="sidebar-logout">
          <button
            type="button"
            className="logout-btn"
            onMouseEnter={startSnow}
            onMouseMove={startSnow}
            onClick={logOutHandler}
          >
            Logout
            <div className="snow-container"></div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

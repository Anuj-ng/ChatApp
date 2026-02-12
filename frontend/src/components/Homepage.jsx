// import React from "react";
// import Sidebar from "./Sidebar"
// import MessageContainer from "./MessageContainer"

// const Homepage = () => {
//   return (
//     <div className="chat-layout">
//       <Sidebar />
//       <MessageContainer />
//     </div>
//   );
// };

// export default Homepage;


import React, { useState } from "react";
import Sidebar from "./Sidebar";
import MessageContainer from "./MessageContainer";

const ChatLayout = () => {
  const [showChat, setShowChat] = useState(false);

  return (
    <div className={`chat-layout ${showChat ? "show-chat" : ""}`}>
      <Sidebar openChat={() => setShowChat(true)} />
      <MessageContainer goBack={() => setShowChat(false)} />
    </div>
  );
};

export default ChatLayout;

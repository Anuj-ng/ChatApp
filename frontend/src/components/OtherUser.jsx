import React from "react";
import { setSelectedUser } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";

const OtherUser = ({ user, openChat }) => {
  
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((store) => store.user);
  const isActive =selectedUser?._id === user?._id;
  const selectedUserHandler = (user) => {
    dispatch(setSelectedUser(user));
  };
  return (
    <div
      onClick={() => {
        // console.log(selectedUser);
        openChat();
        selectedUserHandler(user);
      }}
      className={` chat-user ${isActive ? "active-chat" : " "}`}
    >
      <div className="chat-user-left">
        <div className="avatar-wrapper">
          <img src={user?.profilePhoto} alt="profile" className="chat-avatar" />
          <span className="online-dot"></span>
        </div>
      </div>

      <div className="chat-user-right">
        <p className="chat-username">{user?.fullName}</p>
        <p className="chat-lastmsg">Hey! Are you free to talk?</p>
      </div>
    </div>
  );
};

export default OtherUser;

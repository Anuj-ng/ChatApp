import React from "react";
import OtherUser from "./OtherUser";
import useGetOtherUsers from "../hooks/useOtherUsers";
import { useSelector } from "react-redux";
const OtherUsers = ({ users,openChat }) => {
  useGetOtherUsers();
  const { otherUsers } = useSelector((store) => store.user);
  if (!otherUsers) return null;
  return (
    <div className="users-list">
      {users?.map((user) => {
        return <OtherUser key={user._id} user={user} openChat={openChat} />;
      })}
    </div>
  );
};

export default OtherUsers;

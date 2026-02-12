import React from "react";
import Message from "./Message";
import useGetMessages from "../hooks/useGetMessages";
import { useSelector } from "react-redux";
const Messages = () => {
  useGetMessages();
  const { messages } = useSelector((store) => store.message);
  if (!messages)
    return (
      <h1 className="flex items-center justify-center text-3xl opacity-40 mt-72">
        Start your conversation (:
      </h1>
    );
  return (
    <div className="messages-area">
      {messages &&
        messages?.map((message) => {
          return <Message key={message._id} message={message} />;
        })}
    </div>
  );
};

export default Messages;

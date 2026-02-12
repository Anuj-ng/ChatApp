import React from "react";
import { IoSend } from "react-icons/io5";
import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/messageSlice";
const SendInput = () => {
  const { messages } = useSelector((store) => store.message);
  const { selectedUser } = useSelector((store) => store.user);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      
      if (!message.trim()) return;

      const res = await axios.post(
        `http://localhost:8080/api/messages/send/${selectedUser?._id}`,
        { message },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );

      setMessage("");
      console.log(res);
      dispatch(setMessages([...messages, res?.data?.newMessage]));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="send-input-wrapper">
      <form onSubmit={onSubmitHandler} className="send-form">
        <div className="send-input-box">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            type="text"
            placeholder="Type a message..."
            className="send-input"
          />

          <button type="submit" className="send-btn">
            <IoSend className="send-icon" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default SendInput;

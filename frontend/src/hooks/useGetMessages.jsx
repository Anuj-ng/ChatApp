import React, { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setMessages, clearMessages } from "../redux/messageSlice";
const useGetMessages = () => {
  const { selectedUser } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!selectedUser?._id) return;
    dispatch(clearMessages());

    const fetchMessages = async () => {
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.get(
          `https://chat-backend-7eml.onrender.com/api/messages/${selectedUser?._id}`,
        );
        dispatch(setMessages(res.data.messages));
        // console.log(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMessages();
  }, [selectedUser]);
};
export default useGetMessages;

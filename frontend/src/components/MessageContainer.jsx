import React from "react";
import SendInput from "./SendInput";
import Messages from "./Messages";
import { useSelector, useDispatch } from "react-redux";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { setSelectedUser } from "../redux/userSlice";

const MessageContainer = ({ goBack }) => {
  // const hiRef = useRef();
  const greetRef = useRef();

  const { selectedUser, authUser, onlineUsers } = useSelector(
    (store) => store.user,
  );
  const isUserOnline = onlineUsers?.includes(selectedUser?._id);

  const dispatch = useDispatch();
  // useEffect(() => {
  //   return () => dispatch(setSelectedUser(null));
  // }, []);

  useEffect(() => {
      if (selectedUser !== null) return;

    // ⭐ kill old animations (VERY IMPORTANT)
    gsap.killTweensOf(".letter");
    gsap.killTweensOf(".greet-sub");

    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    // letters reveal
    tl.fromTo(
      ".letter",
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.04,
      },
    )

      // subtitle reveal
      .fromTo(
        ".greet-sub",
        { y: 20, opacity: 0, filter: "blur(8px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.8 },
        "-=0.3",
      );
  }, [selectedUser, authUser]);

  return (
    <>
      {selectedUser === null ? (
        <div className="flex flex-col items-center justify-center w-full h-full text-center px-6">
          <h1 className="greet-line text-4xl sm:text-5xl font-semibold mb-3 text-white leading-tight">
            {"Hi, ".split("").map((char, i) => (
              <span key={"hi" + i} className="letter inline-block">
                {char === " " ? "\u00A0" : char}
              </span>
            ))}

            <span className="text-purple-300">
              {authUser?.fullName.split("").map((char, i) => (
                <span key={"name" + i} className="letter inline-block">
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </span>
          </h1>

          <p className="greet-sub mt-4 text-4xl sm:text-5xl text-gray-300 font-normal tracking-wide">
            Let’s start a Conversation
          </p>
        </div>
      ) : (
        <div className="message-container">
          <div className="chat-header">
            <div className="chat-header-left">
              <button className="back-btn" onClick={goBack}>
                ←
              </button>
              <div className="chat-header-avatar-wrapper">
                <img
                  src={selectedUser?.profilePhoto}
                  alt="profile"
                  className="chat-header-avatar"
                />
                {isUserOnline && <span className="chat-header-online"></span>}
              </div>

              <div className="chat-header-info">
                <p className="chat-header-name">{selectedUser.fullName}</p>
                <p className="chat-header-status">
                  {isUserOnline ? "Online" : "Offline"}
                </p>
              </div>
            </div>
          </div>
          <Messages /> <SendInput />
        </div>
      )}{" "}
    </>
  );
};

export default MessageContainer;

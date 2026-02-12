import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { setAuthUser } from "../redux/userSlice";
import { useSelector } from "react-redux";
const Message = ({ message }) => {
  // const {authUser}=useSelector(store=>store.user)
  const { authUser,selectedUser } = useSelector((store) => store.user);



  const scroll = useRef();
  useEffect(() => {
    scroll.current?.scrollIntoView({});
  }, [message]);
  const starsRef = useRef(null);

  const handleHover = () => {
    const stars = starsRef.current.children;

    gsap.set(stars, { x: -20, opacity: 0 });

    gsap.fromTo(
      stars,
      {
        x: -20,
        y: () => Math.random() * 30 - 15,
        opacity: 0,
      },
      {
        x: 320,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        ease: "power1.out",
      },
    );
  };

  return (
    <div ref={scroll} className={`chat ${authUser?._id===message?.senderId? 'chat-end':'chat-start'}`}>
      <div className="chat-image avatar ">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS chat bubble component"
            src={message?.senderId===authUser?._id?authUser?.profilePhoto:selectedUser?.profilePhoto}
          />
        </div>
      </div>

      <div className="chat-bubble bubble" onMouseEnter={handleHover}>
        {message?.message} {/* tiny shooting stars layer */}
        <div className="shooting-stars" ref={starsRef}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div className="chat-footer text-xs opacity-0">12:45</div>
    </div>
  );
};

export default Message;

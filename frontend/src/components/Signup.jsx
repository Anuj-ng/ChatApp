import React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import gsap from "gsap";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const Signup = () => {
  const [user, setUser] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const navigate = useNavigate();
  const onHandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://chat-backend-7eml.onrender.com/api/users/register",
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );
      console.log(res);
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login")
      }
    } catch (err) {
      console.log("BACKEND MESSAGE:", err.response?.data);
    }
    // setUser({
    //   fullName: "",
    //   username: "",
    //   email: "",
    //   password: "",
    //   confirmPassword: "",
    //   gender: "",
    // });
  };

  useEffect(() => {
    const isDesktop = window.innerWidth > 850;

    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

    /* =============================
     DESKTOP HERO ANIMATION ONLY
  ==============================*/
    if (isDesktop) {
      const splitText = (selector) => {
        document.querySelectorAll(selector).forEach((el) => {
          const text = el.innerText;
          el.innerHTML = text
            .split("")
            .map((letter) => `<span class="letter">${letter}</span>`)
            .join("");
        });
      };

      splitText(".hero-line");

      tl.fromTo(
        ".letter",
        { opacity: 0, rotateX: 90, force3D: true },
        {
          opacity: 1,
          rotateX: 0,
          stagger: 0.03,
          duration: 1.2,
        },
      )

        .fromTo(
          ".hero-sub",
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.8",
        );
    }

    /* =============================
     CARD + FORM (ALL SCREENS)
  ==============================*/

    tl.fromTo(
      ".signup-card",
      { xPercent: 20, opacity: 0, scale: 0.97 },
      { xPercent: 0, opacity: 1, scale: 1, duration: 0.9 },
      isDesktop ? "-=0.9" : 0, // 👈 KEY FIX
    )

      .fromTo(
        ".signup-input",
        { y: 40, opacity: 0, scale: 0.96 },
        { y: 0, opacity: 1, scale: 1, stagger: 0.08, duration: 0.6 },
        "-=0.6",
      )
      .fromTo(
        ".last-p-tag",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 0.8, duration: 0.5 },
        "-=0.3",
      )

      .fromTo(
        ".signup-btn",
        { y: 30, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5 },
        "-=0.4",
      );
    const loginLink = document.querySelector(".last-p-tag");

    loginLink.addEventListener("mouseenter", () => {
      gsap.to(loginLink, { x: 4, duration: 0.2 });
    });

    loginLink.addEventListener("mouseleave", () => {
      gsap.to(loginLink, { x: 0, duration: 0.2 });
    });

    /* =============================
     INPUT MICRO INTERACTIONS
  ==============================*/
    document.querySelectorAll(".signup-input").forEach((input) => {
      input.addEventListener("focus", () => {
        gsap.to(input, { scale: 1.01, duration: 0.2 });
      });
      input.addEventListener("blur", () => {
        gsap.to(input, { scale: 1, duration: 0.2 });
      });
    });
  }, []);

  return (
    <div className="signup-page">
      <div className="signup-container">
        <div className="signup-left">
          <h1 className="hero-title">
            <span className="hero-line">Join the future of</span>
            <br />
            <span className="hero-line strong">conversations.</span>
          </h1>

          <p className="hero-sub">
            ChatApp helps teams talk faster, better and simpler.
          </p>
        </div>

        <div className="signup-card">
          <div className="signup-header">
            <h2 className="logo">ChatApp</h2>
            <h1 className="title">Create your account</h1>
          </div>

          <form onSubmit={onHandleSubmit} className="signup-form">
            <input
              type="text"
              placeholder="First Name"
              className="signup-input"
              value={user.fullName}
              onChange={(e) => setUser({ ...user, fullName: e.target.value })}
            />

            <input
              type="text"
              placeholder="Username"
              className="signup-input"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            />

            <input
              type="email"
              placeholder="Email"
              className="signup-input"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />

            <input
              type="password"
              placeholder="Password"
              className="signup-input"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />

            <input
              type="password"
              placeholder="Confirm Password"
              className="signup-input"
              value={user.confirmPassword}
              onChange={(e) =>
                setUser({ ...user, confirmPassword: e.target.value })
              }
            />

            <select
              className="signup-input"
              value={user.gender}
              onChange={(e) => setUser({ ...user, gender: e.target.value })}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <div className="p flex items-start row">
              <Link to="/login" className="last-p-tag">
                <p>Already Have an Account? Log In</p>
              </Link>
            </div>

            <button type="submit" className="signup-btn">
              Create account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;

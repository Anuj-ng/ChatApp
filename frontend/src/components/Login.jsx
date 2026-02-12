import React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import gsap from "gsap";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../redux/userSlice";

const Login = () => {
  const [user, setUser] = useState({
    username: "",

    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8080/api/users/login",
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );
      navigate("/");
      dispatch(setAuthUser(res.data.user));
    } catch (err) {
      const message =
        err?.response?.data?.message || // backend error
        err?.message || // axios/network error
        "Something went wrong"; // fallback

      toast.error(message);
      console.log("FULL ERROR:", err);
    }

    setUser({
      username: "",

      password: "",
    });
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
            <span className="hero-line">Welcome Aboard</span>
            <br />
            <span className="hero-line strong">Come and Say- </span>
            <br />
            <span className="hero-line2">Hello</span>
          </h1>

          <p className="hero-sub">
            Pick up where you left off. Your messages are waiting.
          </p>
        </div>

        <div className="signup-card">
          <div className="signup-header">
            <h2 className="logo">ChatApp</h2>
            <h1 className="title">Log Into Your Account</h1>
          </div>

          <form onSubmit={onHandleSubmit} className="signup-form">
            <input
              type="text"
              placeholder="Username"
              className="signup-input"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            />

            <input
              type="password"
              placeholder="Password"
              className="signup-input"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
            <div className="p flex items-start row">
              <Link to="/register" className="last-p-tag">
                <p>Don't have an Account? Sign Up</p>
              </Link>
            </div>

            <button type="submit" className="signup-btn">
              LogIn
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

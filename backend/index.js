// const { configDotenv } = require("dotenv");
// configDotenv();
// import express from "express";
require("dotenv").config();
const express = require("express");

const connectDB = require("./config/database");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { server, app } = require("./socket/socket.js");
// Import routes
const userRoute = require("./routes/userRoutes");
const messageRoute = require("./routes/messageRoutes");

app.set("trust proxy", 1); // ⭐ REQUIRED for Render cookies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (mobile apps, curl, etc.)
      if (!origin) return callback(null, true);

      // Allow any vercel.app subdomain + localhost
      if (
        origin.endsWith(".vercel.app") ||
        origin === "http://localhost:5173"
      ) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  }),
);

app.use("/api/users", userRoute);
app.use("/api/messages", messageRoute);
app.get("/", (req, res) => {
  res.status(200).json({ status: "ok" });
});
const PORT = process.env.PORT || 5000;

connectDB();
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

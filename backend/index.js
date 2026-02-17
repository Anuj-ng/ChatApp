// const { configDotenv } = require("dotenv");
// configDotenv();
// import express from "express";
const express = require("express");

const connectDB = require("./config/database");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { server, app } = require("./socket/socket.js");
// Import routes
const userRoute = require("./routes/userRoutes");
const messageRoute = require("./routes/messageRoutes");
require("dotenv").config();

app.set("trust proxy", 1); // ⭐ REQUIRED for Render cookies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "https://chat-app-self-kappa-74.vercel.app",

    credentials: true,
  }),
);

app.use("/api/users", userRoute);
app.use("/api/messages", messageRoute);
const PORT = process.env.PORT || 5000;

connectDB();
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

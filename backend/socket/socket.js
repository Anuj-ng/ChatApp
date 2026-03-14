const { Server } = require("socket.io");
const http = require("http");
const express = require("express");

const app = express();
// app.set("trust proxy", 1); // ⭐ REQUIRED for Render cookies

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (origin.endsWith(".vercel.app") || origin === "http://localhost:5173") {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST"],
    credentials: true,
  },
});
const userSocketMap = {};
const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};


io.on("connection", (socket) => {
  console.log("user connected", socket.id);
  const userId = socket.handshake.query.userId;
  if (userId !== undefined) {
    userSocketMap[userId] = socket.id;
    console.log("Online users:", userSocketMap);
  }
  io.emit("getOnlineUsers", Object.keys(userSocketMap));
  socket.on("disconnect", () => {
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
    console.log("User disconnected:", socket.id);
  });
});
module.exports = { app, io, server, getReceiverSocketId };

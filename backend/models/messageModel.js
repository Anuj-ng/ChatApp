const mongoose = require("mongoose");
const messageModel = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId, //ref is used to establish a relationship between the Message model and the User model. It indicates that the senderId field in the Message schema references the _id field in the User collection. This allows you to easily populate the sender's information when querying messages, enabling you to retrieve details about the sender along with the message content.
      ref: "User",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }
    // chat: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Chat",
    //   required: true,
    // },
  },
  { timestamps: true },
);

const Message = mongoose.model("Message", messageModel);

module.exports=Message;
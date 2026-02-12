const Conversation = require("../models/conversationModel");
const messageModel = require("../models/messageModel");

const sendMessage = async (req, res) => {
  try {
    const senderId = req.id;
    const receiverId = req.params.receiverID;
    const { message } = req.body;
    let gotConversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] }, //participants array contains both senderID and receiverID,check if conversation already exists between sender and receiver
    });
    if (!gotConversation) {
      gotConversation = await Conversation.create({
        participants: [senderId, receiverId],
      }); //create new conversation if not exists
    }
    const newMessage = await messageModel.create({
      senderId,
      receiverId,
      message,
    });
    if (newMessage) {
      gotConversation.messages.push(newMessage._id);
      await gotConversation.save();
    }
    res.status(200).json({ message: "Message sent successfully", newMessage });
  } catch (error) {
    console.error("Error in sendMessage:", error);
    res
      .status(500)
      .json({ message: "Error sending message", error: error.message });
  }
};

const getMessage = async (req, res) => {
  try {
    const senderId = req.id;
    const receiverId = req.params.receiverID;
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    }).populate("messages");
    if (!conversation) {
      return res.status(200).json({ message: [] });
    }
    res.status(200).json(conversation);
  } catch (error) {
    console.error("Error in getMessage:", error);
    res
      .status(500)
      .json({ message: "Error retrieving messages", error: error.message });
  }
};
module.exports = { sendMessage, getMessage };

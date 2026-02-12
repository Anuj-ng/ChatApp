const express = require("express");
const router = express.Router();
const {sendMessage,getMessage} = require("../controllers/messageController");
const isAuthenticated = require("../middleware/isAuthenticated");
router.post("/send/:receiverID", isAuthenticated, sendMessage);
router.get("/:receiverID", isAuthenticated, getMessage);
module.exports = router;

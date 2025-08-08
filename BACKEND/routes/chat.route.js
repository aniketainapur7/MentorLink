
const express = require("express");
const { sendMessage, getConversation, markAsRead } = require("../controller/chat.controller.js");
const verifyjwt = require("../middleware/auth.middleware.js");

const router = express.Router();

router.post("/send", verifyjwt, sendMessage);             // Send message
router.get("/:userId", verifyjwt, getConversation);   // Get conversation with a user
router.put("/:userId/read", verifyjwt, markAsRead);   // Mark messages as read

module.exports = router;

const express = require("express");
const { 
    startSession, 
    endSession, 
    whiteboardSync, 
    sendChatMessage, 
    screenShare 
} = require("../controller/session.controller.js");

const verifyjwt = require("../middleware/auth.middleware.js");

const router = express.Router();

router.post("/:id/start", verifyjwt, startSession); 
router.post("/:id/end", verifyjwt, endSession);
router.post("/:id/whiteboard-sync", verifyjwt, whiteboardSync);
router.post("/:id/chat", verifyjwt, sendChatMessage);
router.post("/:id/screen-share", verifyjwt, screenShare);

module.exports = router;

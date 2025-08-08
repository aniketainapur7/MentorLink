const express = require("express");
const { 
    getMentors, 
    requestSession, 
    getSessions, 
    rateSession, 
    getSessionDetails, 
    cancelSession 
} = require("../controller/student.controller.js");

const verifyjwt = require("../middleware/auth.middleware.js");

const router = express.Router();

router.get("/mentors", verifyjwt, getMentors);
router.post("/request-session", verifyjwt, requestSession);
router.get("/sessions", verifyjwt, getSessions);
router.post("/session/:id/rate", verifyjwt, rateSession);
router.get("/session/:id", verifyjwt, getSessionDetails);
router.delete("/session/:id/cancel", verifyjwt, cancelSession);

module.exports = router;

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

router.get("/mentors", verifyjwt, getMentors);                    // get all mentors  
router.post("/request-session", verifyjwt, requestSession);       // request the session 
router.get("/sessions", verifyjwt, getSessions);                  // get all his sessions 
router.post("/session/:id/rate", verifyjwt, rateSession);         // rate the session 
router.get("/session/:id", verifyjwt, getSessionDetails);         // get each sessions details 
router.delete("/session/:id/cancel", verifyjwt, cancelSession);   // cancel requested session 

module.exports = router;

const express = require("express");
const { 
    getRequests, 
    acceptSession, 
    rejectSession, 
    getSessions, 
    updateAvailability, 
    updateExpertise 
} = require("../controller/mentor.controller.js");

const verifyjwt = require("../middleware/auth.middleware.js");

const router = express.Router();

router.get("/requests", verifyjwt, getRequests);                 //  all requests to that particular mentor 
router.post("/session/:id/accept", verifyjwt, acceptSession);    //  accept the session request 
router.post("/session/:id/reject", verifyjwt, rejectSession);    // reject the session request
router.get("/sessions", verifyjwt, getSessions);                 // get all sessions of that particular mentor
router.put("/availability", verifyjwt, updateAvailability);      // update the availability 
router.put("/expertise", verifyjwt, updateExpertise);            // update his expertise like add subject or remove

module.exports = router;

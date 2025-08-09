const express = require("express");
const { 
    getRequests, 
    acceptSession, 
    rejectSession, 
    getSessions, 
    updateAvailability, 
    updateExpertise ,
    getmystudents,

} = require("../controller/mentor.controller.js");

const verifyjwt = require("../middleware/auth.middleware.js");

const router = express.Router();

router.get("/requests", verifyjwt, getRequests);                 //  all requests to that particular mentor 
router.post("/:id/accept", verifyjwt, acceptSession);            //  accept the session request 
router.post("/:id/reject", verifyjwt, rejectSession);            // reject the session request
router.get("/sessions", verifyjwt, getSessions);                 // get all sessions of that particular mentor
router.put("/availability", verifyjwt, updateAvailability);      // update the availability 
router.put("/expertise", verifyjwt, updateExpertise);            // update his expertise like add subject or remove
router.get("/mystudents", verifyjwt , getmystudents);            
module.exports = router;

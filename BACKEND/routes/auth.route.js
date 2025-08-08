const express = require('express');
const {signup , login , logout , profile,checkauth} = require("../controller/auth.controller.js");
const verifyjwt = require("../middleware/auth.middleware.js");

const router = express.Router();

router.post("/login", login);
router.post("/signup",signup);
router.get("/logout",logout);
router.get("/profile",verifyjwt,profile);

module.exports = router;
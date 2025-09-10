const express = require("express");
const router = express.Router();
const votersControllers = require("../controllers/votersControllers");
router.post("/register", votersControllers.registerVoters);
router.post("/login", votersControllers.loginVoters);

module.exports = router;

const express = require("express");
const { registerAgent, loginAgent, checkIfRegistered, getProfile } = require("../controllers/deliveryAgentController");
const { protect, customerauthMiddleware } = require("../middleware/customerauthMiddleware");

const router = express.Router();

router.post("/register", registerAgent);
router.post("/login", loginAgent);
router.post("/check", checkIfRegistered);
router.get("/profile", protect, getProfile);

module.exports = router;

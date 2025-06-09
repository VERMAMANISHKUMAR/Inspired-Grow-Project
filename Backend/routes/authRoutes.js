const express = require("express");
const { registerAdmin, login, adminProfile } = require("../controllers/authController");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register-admin", registerAdmin);
router.post("/login", login);
router.get("/profile", authMiddleware, adminProfile);

module.exports = router;

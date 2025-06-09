const express = require("express");
const { addUser } = require("../controllers/userController");
const { authMiddleware, hasPermission } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/add-user", authMiddleware, hasPermission("Users", "Add"), addUser);

module.exports = router;

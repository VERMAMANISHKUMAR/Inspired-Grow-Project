const express = require("express");
const { createRole, getRoles } = require("../controllers/roleController");
const { authMiddleware, hasPermission } = require("../middleware/authMiddleware");

const router = express.Router();


router.post(
  "/api/roles",
  authMiddleware,
  (req, res, next) => {
    if (req.user.role.toLowerCase() === "admin") return next();
    return hasPermission("Roles", "Add")(req, res, next);
  },
  createRole
);


router.get(
  "/api/roles",
  authMiddleware,
  (req, res, next) => {
    console.log("User role from token:", req.user.role);
    if (req.user.role.toLowerCase() === "admin") return next();
    return hasPermission("Roles", "View")(req, res, next);
  },
  getRoles
);

module.exports = router;

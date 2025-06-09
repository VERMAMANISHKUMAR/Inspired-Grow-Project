const express = require("express");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Data_add_Successfully, Error_found } = require("../utlis/error");
const { authMiddleware, hasPermission } = require("../middleware/authMiddleware");
const Role = require("../models/roleModel");

const router = express.Router();
router.post("/adduserbyadmin", authMiddleware, hasPermission("users", "Add"), async (req, res) => {
  try {
    const {
      userName,
      FirstName,
      LastName,
      Mobile,
      Email,
      Store,
      Role,
      Password,
      WarehouseGroup,
      Defaultwarehouse,
    } = req.body;
    if (!Email || !Password || !FirstName || !Role) {
      return res.status(400).json({ message: "❌ Missing required fields" });
    }
    const existingUser = await User.findOne({ Email });
    if (existingUser) {
      return res.status(400).json({ message: "❌ User already exists" });
    }
    const hashedPassword = await bcrypt.hash(Password, 10);

    const adduser = new User({
      userName,
      FirstName,
      LastName,
      Mobile,
      Email,
      Store,
      Role,
      Password: hashedPassword,
      WarehouseGroup,
      Defaultwarehouse,
    });

    await adduser.save();
    res.status(200).json({ message: "✅ User added successfully" });
  } catch (err) {
    console.error("🚨 Error adding user:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});
router.post("/userlogin", async (req, res) => {
  try {
    console.log("🔹 Received Request Body:", req.body);

    const { email, password } = req.body;
    console.log("🔹 Login Attempt - Email:", email);
    console.log("🔹 Login Attempt - Password:", password ? "Received" : "❌ MISSING!");

    if (!email || !password) {
      return res.status(400).json({ message: "❌ Email and Password are required" });
    }
    const normalizedEmail = email.trim().toLowerCase();
    console.log("🔹 Normalized Email:", normalizedEmail);

    const finduser = await User.findOne({ Email: normalizedEmail });
    console.log("🔹 Found User:", finduser);

    if (!finduser) {
      console.log("❌ User Not Found in DB");
      return res.status(400).json({ message: "User not found" });
    }

    if (!finduser.Password) {
      console.log("❌ User Password is MISSING in DB");
      return res.status(500).json({ message: "User password is missing in the database" });
    }

    const isMatch = await bcrypt.compare(password, finduser.Password);
    console.log("🔹 Password Match Result:", isMatch);
    if (!isMatch) {
      console.log("❌ Password Incorrect");
      return res.status(400).json({ message: "Invalid credentials" });
    }

    console.log("✅ Password Matched. Generating Token...");

    const token = jwt.sign(
      { id: finduser._id, role: finduser.Role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    console.log("✅ Token Generated:", token);

    // Fetch role data to get permissions
    const roleData = await Role.findOne({ roleName: finduser.Role });

    res.status(200).json({
      message: "Login Successful",
      token,
      user: {
        id: finduser._id,
        FirstName: finduser.FirstName,
        LastName: finduser.LastName,
        Email: finduser.Email,
        Role: finduser.Role,
      },
      permissions: roleData ? roleData.permissions : [],
    });
  } catch (error) {
    console.error("🚨 Login Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});
router.get("/userlist", authMiddleware, async (req, res) => {
  try {
    if (req.user?.role.toLowerCase() === "admin") {
      const users = await User.find();
      return res.status(200).json(users);
    }
    hasPermission("users", "View")(req, res, async () => {
      const users = await User.find();
      res.status(200).json(users);
    });
  } catch (err) {
    res.status(400).json({
      message: Error_found,
      err: err.message,
    });
  }
});

router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      name: user.FirstName + " " + user.LastName,
      email: user.Email,
      role: user.Role,
      year: 2025, 
    });
  } catch (error) {
    console.error("Profile route error:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;

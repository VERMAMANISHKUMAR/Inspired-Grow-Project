const Admin = require("../models/adminModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerAdmin = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new Admin({
      name,
      email,
      password: hashedPassword,
      role: "admin",  
    });
    await admin.save();
    res.status(201).json({ message: "Admin registered successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log("Login request received for:", email); // 🔍 Debugging

    const admin = await Admin.findOne({ email });
    if (!admin) {
      console.log("Admin not found");
      return res.status(404).json({ message: "Admin not found" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      console.log("Invalid credentials");
      return res.status(400).json({ message: "Invalid credentials" });
    }

    console.log("Generating token...");
    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET || "default_secret", // 🔍 Debugging in case env is missing
      { expiresIn: "7d" }
    );

    console.log("Token generated:", token);
    res.json({ token, role: admin.role });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.adminProfile = async (req, res) => {
  try {
    console.log("Fetching admin profile for user ID:", req.user?.id);

    if (!req.user || !req.user.id) {
      console.log("User ID missing in request");
      return res.status(400).json({ message: "User ID missing" });
    }

    const admin = await Admin.findById(req.user.id).select("-password");
    if (!admin) {
      console.log("Admin not found");
      return res.status(404).json({ message: "Admin not found" });
    }

    console.log("Admin profile found:", admin);
    res.status(200).json({
      name: admin.name,
      email: admin.email,
      role: admin.role,
    });
  } catch (error) {
    console.error("Profile error:", error);
    res.status(500).json({ message: error.message });
  }
};


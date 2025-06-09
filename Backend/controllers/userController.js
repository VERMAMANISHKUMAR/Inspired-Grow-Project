const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

exports.addUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, role });
    await user.save();
    res.status(201).json({ message: "User added successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

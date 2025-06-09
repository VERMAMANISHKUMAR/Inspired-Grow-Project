const Role = require("../models/roleModel");

const createRole = async (req, res) => {
  try {
    const { roleName, storeName, description, permissions } = req.body;

    if (!roleName || !storeName) {
      return res.status(400).json({ message: "Role Name and Store Name are required." });
    }

    const newRole = new Role({
      roleName,
      storeName,
      description,
      permissions, // Must be an array like [{ module: "Users", actions: ["create", "read"] }]
    });

    await newRole.save();
    res.status(201).json({ message: "Role created successfully", role: newRole });
  } catch (error) {
    console.error("Error creating role:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getRoles = async (req, res) => {
    try {
      const roles = await Role.find({}, "roleName"); // Fetch only role names
      res.json({ roles });
    } catch (error) {
      console.error("Error fetching roles:", error);
      res.status(500).json({ message: "Server error" });
    }
  };
module.exports = { createRole, getRoles};

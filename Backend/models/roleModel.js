const mongoose = require("mongoose");

const RoleSchema = new mongoose.Schema({
  roleName: { 
    type: String, 
    required: true, 
    unique: true, // 🔹 Prevent duplicate role names
    trim: true 
  },
  storeName: { 
    type: String, 
    required: true, 
    trim: true 
  },
  description: { 
    type: String, 
    trim: true 
  },
  permissions: [
    {
      module: { 
        type: String, 
        required: true, 
        trim: true 
      },
      actions: { 
        type: [String], 
        required: true, 
        enum: ["Add", "Edit", "Delete", "View"], // 🔹 Ensure only valid actions are stored
      },
    },
  ],
}, { timestamps: true }); // 🔹 Adds createdAt & updatedAt timestamps

const Role = mongoose.model("Role", RoleSchema);
module.exports = Role;

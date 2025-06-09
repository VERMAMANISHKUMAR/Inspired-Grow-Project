const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  phoneNumbers: [{ type: String, required: true }],
  message: { type: String, required: true }, 
  sentAt: { type: Date, default: Date.now }, 
});

module.exports = mongoose.model("Message", messageSchema);

const mongoose = require("mongoose");

const deliveryAgentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String },
  phone: { type: String, unique: true, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("DeliveryAgent", deliveryAgentSchema);

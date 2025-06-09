const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String },
  phone: { type: String, unique: true, required: true },
  otp: { type: String },
  otpExpires: { type: Date },
});

module.exports = mongoose.model("Customer", customerSchema);

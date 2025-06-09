const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
  date: String,
  day: String,
  slot: String,
}, { timestamps: true });

module.exports = mongoose.model('Slot', slotSchema);

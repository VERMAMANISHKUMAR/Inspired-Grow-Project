const Slot = require('../models/UserSlotPageModul.js'); // Adjust the path as necessary

// POST a new booking
exports.createSlot = async (req, res) => {
  try {
    const { day, date, slot } = req.body;

    if (!day || !date || !slot) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newSlot = new Slot({ day, date, slot });
    await newSlot.save();
    res.status(201).json({ message: "Slot booked successfully", slot: newSlot });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// GET all bookings
exports.getAllSlots = async (req, res) => {
  try {
    const slots = await Slot.find().sort({ createdAt: -1 });
    res.status(200).json(slots);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// controllers/deliveryBoyController.js
const DeliveryBoy = require('../models/VanDeliveryBoy');

// GET all
exports.getAllDeliveryBoys = async (req, res) => {
  try {
    const deliveryBoys = await DeliveryBoy.find();
    res.status(200).json(deliveryBoys);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST new
exports.addDeliveryBoy = async (req, res) => {
  try {
    const { name, vaultAmount, receivingAmount, deliveryDate, accepted } = req.body;
    const totalAmount = parseFloat(vaultAmount) + parseFloat(receivingAmount);

    const newBoy = new DeliveryBoy({
      name,
      vaultAmount,
      receivingAmount,
      totalAmount,
      deliveryDate,
      accepted,
    });

    const savedBoy = await newBoy.save();
    res.status(201).json(savedBoy);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// PUT update
exports.updateDeliveryBoy = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await DeliveryBoy.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE
exports.deleteDeliveryBoy = async (req, res) => {
  try {
    const { id } = req.params;
    await DeliveryBoy.findByIdAndDelete(id);
    res.status(204).end();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

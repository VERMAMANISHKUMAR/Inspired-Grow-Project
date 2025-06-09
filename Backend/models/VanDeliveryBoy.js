const mongoose = require('mongoose');
const vanDeliveryBoySchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  contactNumber: { type: String, required: true },
  deliveryTime: { type: String, required: true },
  deliveryDate: { type: String, required: true }
}, { timestamps: true });
const DeliveryBoy = mongoose.models.DeliveryBoy || mongoose.model("DeliveryBoy", vanDeliveryBoySchema);

module.exports = DeliveryBoy;

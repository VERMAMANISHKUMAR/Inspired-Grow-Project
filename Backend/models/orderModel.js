const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    orderNumber: { type: String, required: true },
    date: { type: String, required: true },
    items: { type: Number, required: true },
    amount: { type: Number, required: true },
    status: { type: String, required: true },
    location: { type: String, required: true },
    customerName: { type: String, required: true },
    customerNumber: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);

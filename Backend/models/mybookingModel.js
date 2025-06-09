const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  bookNumber: {
    type: String,
    required: true,
    unique: true, // Ensures each book number is unique
  },
  bookingDate: {
    type: String,
    required: true,
  },
  customerName: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  location: {
      type: String,
      required: true,
},
  remark: {
    type: String,
    required: true,
  },
}, 
{
  timestamps: true, // Adds createdAt and updatedAt fields
});

module.exports = mongoose.model('mybooking', orderSchema);
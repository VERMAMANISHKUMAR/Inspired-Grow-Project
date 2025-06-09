// // models/DeliveryBoy.js
// const mongoose = require('mongoose');

// const deliveryBoySchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   contactNumber: {
//     type: String,
//     required: true,
//     match: /^[0-9]{10}$/
//   },
//   deliveryTime: {
//     type: String,
//     required: true
//   },
//   deliveryDate: {
//     type: Date,
//     required: true
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now
//   }
// });

// module.exports = mongoose.model('ItemDeliveryBoy', deliveryBoySchema);


const mongoose = require('mongoose');

const deliveryBoySchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true, // Ensure the generated ID is unique
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  contactNumber: {
    type: String,
    required: true,
    match: /^[0-9]{10}$/, // Validate 10-digit phone number
  },
  deliveryTime: {
    type: String,
    required: true,
  },
  deliveryDate: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model('DeliveryBoy', deliveryBoySchema);
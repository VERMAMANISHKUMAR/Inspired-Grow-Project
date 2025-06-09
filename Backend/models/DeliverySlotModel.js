
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true,
    },
    timeSlot: {
        type: String,
        required: true,
    },
    charge: {
        type: Number,
        required: true,
    },
    isInstant: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);

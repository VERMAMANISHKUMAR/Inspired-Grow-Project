
// routes/bookingRoutes.js
const express = require('express');
const router = express.Router();
const { createBooking, getBookings, updateBooking } = require('../controllers/deliverySlotController');

router.post('/booking-slot', createBooking);
router.get('/all-slot', getBookings);
router.put('/booking-slot-update',updateBooking);

module.exports = router;


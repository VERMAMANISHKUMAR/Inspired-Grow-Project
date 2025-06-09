// // controllers/bookingController.js
// const Booking = require('../models/DeliverySlotModel');

// // @desc    Create a new booking
// // @route   POST /api/bookings
// exports.createBooking = async (req, res) => {
//     try {
//         const { date, timeSlot, charge, isInstant } = req.body;

//         const newBooking = new Booking({ date, timeSlot, charge, isInstant });
//         await newBooking.save();

//         res.status(201).json({ message: 'Booking confirmed!', booking: newBooking });
//     } catch (error) {
//         console.error('Error creating booking:', error.message);
//         res.status(500).json({ error: 'Server error' });
//     }
// };

// // @desc    Get all bookings
// // @route   GET /api/bookings
// exports.getBookings = async (req, res) => {
//     try {
//         const bookings = await Booking.find().sort({ createdAt: -1 });
//         res.json(bookings);
//     } catch (error) {
//         console.error('Error fetching bookings:', error.message);
//         res.status(500).json({ error: 'Server error' });
//     }
// };
// ---------------------------------------------------
const Booking = require('../models/DeliverySlotModel');

// @desc    Create a new booking
// @route   POST /api/bookings
exports.createBooking = async (req, res) => {
    try {
        const { date, timeSlot, charge, isInstant } = req.body;

        const newBooking = new Booking({ date, timeSlot, charge, isInstant });
        await newBooking.save();

        res.status(201).json({ message: 'Booking confirmed!', booking: newBooking });
    } catch (error) {
        console.error('Error creating booking:', error.message);
        res.status(500).json({ error: 'Server error' });
    }
};

// @desc    Get all bookings
// @route   GET /api/bookings
exports.getBookings = async (req, res) => {
    try {
        const bookings = await Booking.find().sort({ createdAt: -1 });
        res.json(bookings);
    } catch (error) {
        console.error('Error fetching bookings:', error.message);
        res.status(500).json({ error: 'Server error' });
    }
};

// @desc    Update a booking
// @route   PUT /api/bookings/:id
exports.updateBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const { date, timeSlot, charge, isInstant } = req.body;

        const updatedBooking = await Booking.findByIdAndUpdate(
            id,
            { date, timeSlot, charge, isInstant },
            { new: true, runValidators: true }
        );

        if (!updatedBooking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        res.json({ message: 'Booking updated successfully', booking: updatedBooking });
    } catch (error) {
        console.error('Error updating booking:', error.message);
        res.status(500).json({ error: 'Server error' });
    }
};

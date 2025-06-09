const express = require('express');
const router = express.Router();
const mybookingController = require('../controllers/mybookingController'); // Adjust the path as necessary

// Routes without API key middleware
router.get('/booking-orders', mybookingController.getAllOrders);
router.post('/booking-orders', mybookingController.createOrder);
router.put('/booking-orders/:id', mybookingController.updateOrder);

module.exports = router;
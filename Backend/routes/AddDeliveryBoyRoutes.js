// // routes/deliveryBoyRoutes.js
// const express = require('express');
// const router = express.Router();
// const deliveryBoyController = require('../controllers/Add-DeliveryBoyController.js');

// // Ensure these match the exported function names
// router.post('/delivery-boys', deliveryBoyController.createDeliveryBoy);
// router.get('/delivery-boys', deliveryBoyController.getAllDeliveryBoys);
// router.get('/delivery-boys/:id', deliveryBoyController.getDeliveryBoy);

// module.exports = router;

const express = require('express');
const router = express.Router();
const deliveryBoyController = require('../controllers/Add-DeliveryBoyController.js');

// POST: Add a new delivery boy
router.post('/delivery-boys', deliveryBoyController.addDeliveryBoy);

// GET: Retrieve all delivery boys
router.get('/delivery-boys', deliveryBoyController.getAllDeliveryBoys);

module.exports = router;
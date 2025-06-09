// routes/deliveryBoyRoutes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/VandeliveryBoyController');

router.get('/', controller.getAllDeliveryBoys);
router.post('/', controller.addDeliveryBoy);
router.put('/:id', controller.updateDeliveryBoy);
router.delete('/:id', controller.deleteDeliveryBoy);

module.exports = router;

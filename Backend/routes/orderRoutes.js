const express = require('express');
const { getOrders, createOrder, updateOrder } = require('../controllers/orderController');

const router = express.Router();

router.get('/', getOrders);
router.post('/', createOrder);
router.put('/:id', updateOrder);

module.exports = router;

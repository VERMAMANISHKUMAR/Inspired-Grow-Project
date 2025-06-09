const Order = require('../models/orderModel');

// GET /api/orders - Retrieve all orders
exports.getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

// POST /api/orders - Create a new order
exports.createOrder = async (req, res, next) => {
  try {
    const order = await Order.create(req.body);
    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
};

// PUT /api/orders/:id - Update an existing order
exports.updateOrder = async (req, res) => {
  try {
    const order = await Order.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
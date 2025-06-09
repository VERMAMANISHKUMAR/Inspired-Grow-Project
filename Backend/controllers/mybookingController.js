const Order = require('../models/mybookingModel');

// GET all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Server error while fetching orders' });
  }
};

// POST a new order
exports.createOrder = async (req, res) => {
  const { bookNumber, bookingDate, customerName, contactNumber, remark } = req.body;

  if (!bookNumber || !bookingDate || !customerName || !contactNumber || !remark) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const existingOrder = await Order.findOne({ bookNumber });
    if (existingOrder) {
      return res.status(400).json({ message: 'Book Number already exists' });
    }

    const newOrder = new Order({
      bookNumber,
      bookingDate,
      customerName,
      contactNumber,
      location: req.body.location,
      remark,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Server error while creating order' });
  }
};

// PUT (update) an order by ID
exports.updateOrder = async (req, res) => {
          const { id } = req.params;
          const { bookNumber, bookingDate, customerName, contactNumber, location, remark } = req.body;
        
          // Validate required fields
          if (!bookNumber || !bookingDate || !customerName || !contactNumber || !location || !remark) {
            return res.status(400).json({ message: 'All fields are required' });
          }
        
          try {
            const order = await Order.findById(id);
            if (!order) {
              return res.status(404).json({ message: 'Order not found' });
            }
        
            // Check for duplicate bookNumber (if changed)
            if (bookNumber !== order.bookNumber) {
              const existingOrder = await Order.findOne({ bookNumber });
              if (existingOrder) {
                return res.status(400).json({ message: 'Book Number already exists' });
              }
            }
        
            // Update the fields
            order.bookNumber = bookNumber;
            order.bookingDate = bookingDate;
            order.customerName = customerName;
            order.contactNumber = contactNumber;
            order.location = location;
            order.remark = remark;
        
            const updatedOrder = await order.save();
            res.status(200).json(updatedOrder);
          } catch (error) {
            console.error('Error updating order:', error);
            res.status(500).json({ message: 'Server error while updating order' });
          }
        };
        
// // controllers/deliveryBoyController.js
// const DeliveryBoy = require('../models/AddDeliveryBoyModuls');

// exports.createDeliveryBoy = async (req, res) => {
//   try {
//     const deliveryBoyData = {
//       name: req.body.name,
//       contactNumber: req.body.contactNumber,
//       deliveryTime: req.body.deliveryTime,
//       deliveryDate: req.body.deliveryDate
//     };

//     const deliveryBoy = new DeliveryBoy(deliveryBoyData);
//     await deliveryBoy.save();
    
//     res.status(201).json({
//       success: true,
//       data: deliveryBoy,
//       message: 'Delivery boy added successfully'
//     });
//   } catch (error) {
//     res.status(400).json({
//       success: false,
//       status: 400,
//       error: "Bad Request",
//       message: error.message
//     });
//   }
// };

// exports.getAllDeliveryBoys = async (req, res) => {
//   try {
//     const deliveryBoys = await DeliveryBoy.find().sort({ createdAt: -1 });
    
//     if (!deliveryBoys || deliveryBoys.length === 0) {
//       return res.status(404).json({
//         success: false,
//         status: 404,
//         error: "Not Found",
//         message: "No delivery boys found in the database"
//       });
//     }
    
//     res.status(200).json({
//       success: true,
//       data: deliveryBoys
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       status: 500,
//       error: "Server Error",
//       message: error.message
//     });
//   }
// };

// // Add this if it's missing
// exports.getDeliveryBoy = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deliveryBoy = await DeliveryBoy.findById(id);

//     if (!deliveryBoy) {
//       return res.status(404).json({
//         success: false,
//         status: 404,
//         error: "Not Found",
//         message: "Delivery boy with the specified ID does not exist"
//       });
//     }

//     res.status(200).json({
//       success: true,
//       data: deliveryBoy
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       status: 500,
//       error: "Server Error",
//       message: error.message
//     });
//   }
// };

// module.exports = {
//   createDeliveryBoy: exports.createDeliveryBoy,
//   getAllDeliveryBoys: exports.getAllDeliveryBoys,
//   getDeliveryBoy: exports.getDeliveryBoy
// };

const DeliveryBoy = require('../models/AddDeliveryBoyModuls');

// POST: Add a new delivery boy
exports.addDeliveryBoy = async (req, res) => {
  try {
    const { id, name, contactNumber, deliveryTime, deliveryDate } = req.body;

    // Validate required fields
    if (!id || !name || !contactNumber || !deliveryTime || !deliveryDate) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }

    // Check if ID already exists
    const existingDeliveryBoy = await DeliveryBoy.findOne({ id });
    if (existingDeliveryBoy) {
      return res.status(400).json({
        success: false,
        message: 'Delivery boy ID already exists',
      });
    }

    // Create new delivery boy
    const deliveryBoy = new DeliveryBoy({
      id,
      name,
      contactNumber,
      deliveryTime,
      deliveryDate,
    });

    await deliveryBoy.save();

    res.status(201).json({
      success: true,
      message: 'Delivery boy added successfully',
      data: deliveryBoy,
    });
  } catch (error) {
    console.error('Error adding delivery boy:', error);
    res.status(500).json({
      success: false,
      message: 'Server error: Unable to add delivery boy',
    });
  }
};

// GET: Retrieve all delivery boys
exports.getAllDeliveryBoys = async (req, res) => {
  try {
    const deliveryBoys = await DeliveryBoy.find();
    res.status(200).json({
      success: true,
      data: deliveryBoys,
    });
  } catch (error) {
    console.error('Error retrieving delivery boys:', error);
    res.status(500).json({
      success: false,
      message: 'Server error: Unable to retrieve delivery boys',
    });
  }
};
const express = require('express');
const router = express.Router();
const { createSlot, getAllSlots } = require('../controllers/UserSlotPageController');

router.post('/booking', createSlot);
router.get('/booking', getAllSlots);

module.exports = router;

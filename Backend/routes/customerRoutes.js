const express = require("express");
const { registerCustomer, loginCustomer, sendOTP, verifyOTP, getCustomerProfile } = require("../controllers/customerController");

const { protect } = require("../middleware/customerauthMiddleware"); 

const router = express.Router();

router.post("/register", registerCustomer);
router.post("/login", loginCustomer);
router.post("/send-otp", sendOTP);
router.post("/verify-otp", verifyOTP);

router.get("/profile", protect, getCustomerProfile); 

module.exports = router;

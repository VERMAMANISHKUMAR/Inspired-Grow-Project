const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Customer = require("../models/customerModel");


const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });


const registerCustomer = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    let customer = await Customer.findOne({ email });
    if (customer) return res.status(400).json({ message: "Customer already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);
    customer = new Customer({ name, email, password: hashedPassword, phone });

    await customer.save();
    const token = generateToken(customer._id);

    res.status(201).json({ message: "Registered successfully", token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const loginCustomer = async (req, res) => {
  try {
    const { email, password } = req.body;

    const customer = await Customer.findOne({ email });
    if (!customer) return res.status(400).json({ message: "Customer not found" });

    const isMatch = await bcrypt.compare(password, customer.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(customer._id);
    res.json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Generate OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();


const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    const customer = await Customer.findOne({ email });

    if (!customer) return res.status(404).json({ message: "Customer not found" });

    const otp = generateOTP();
    customer.otp = otp;
    customer.otpExpires = new Date(Date.now() + 10 * 60000); // OTP valid for 10 min
    await customer.save();

    console.log(`OTP for ${email}: ${otp}`);

    res.json({ message: "OTP sent successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const customer = await Customer.findOne({ email });

    if (!customer || customer.otp !== otp || new Date() > customer.otpExpires) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    customer.otp = null;
    customer.otpExpires = null;
    await customer.save();

    const token = generateToken(customer._id);
    res.json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const getCustomerProfile = async (req, res) => {
  try {
    const customer = await Customer.findById(req.user); 
    if (!customer) return res.status(404).json({ message: "Customer not found" });

    res.json({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      createdAt: customer.createdAt
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Export All Functions
module.exports = { registerCustomer, loginCustomer, sendOTP, verifyOTP, getCustomerProfile };

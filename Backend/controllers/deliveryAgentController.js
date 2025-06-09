const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const DeliveryAgent = require("../models/deliveryAgentModel");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

const registerAgent = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    let agent = await DeliveryAgent.findOne({ email });
    if (agent) return res.status(400).json({ message: "Agent already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);
    agent = new DeliveryAgent({ name, email, password: hashedPassword, phone });

    await agent.save();

    const token = generateToken(agent._id);
    res.status(201).json({ message: "Registered successfully", token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const loginAgent = async (req, res) => {
  try {
    const { email, password } = req.body;

    const agent = await DeliveryAgent.findOne({ email });
    if (!agent) return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, agent.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    const token = generateToken(agent._id);
    res.json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const checkIfRegistered = async (req, res) => {
  try {
    const { email } = req.body;

    const agent = await DeliveryAgent.findOne({ email });
    if (!agent) return res.status(404).json({ message: "Agent not registered" });

    res.json({ message: "Agent is already registered" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getProfile = async (req, res) => {
  try {
    const agent = await DeliveryAgent.findById(req.user.id);
 // Get agent from token
    if (!agent) return res.status(404).json({ message: "Agent not found" });

    res.json({
      name: agent.name,
      email: agent.email,
      phone: agent.phone,
      createdAt: agent.createdAt
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { registerAgent, loginAgent, checkIfRegistered, getProfile };

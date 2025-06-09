const Message = require("../models/messageModel");


const sendMessage = async (req, res) => {
  try {
    const { phoneNumbers, message } = req.body;

    if (!phoneNumbers || !message) {
      return res.status(400).json({ error: "Phone numbers and message are required" });
    }

    const newMessage = new Message({ phoneNumbers, message });
    await newMessage.save();

   
    console.log(`Message sent to: ${phoneNumbers.join(", ")}`);
    console.log(`Message content: ${message}`);

    res.status(201).json({ message: "Message sent successfully", data: newMessage });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ sentAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { sendMessage, getMessages };

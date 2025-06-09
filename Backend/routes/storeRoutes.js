const express = require("express");
const Store = require("../models/storeModel");
const storeSystem = require("../models/storeSystemModel");
const { authMiddleware, hasPermission } = require("../middleware/authMiddleware");

const router = express.Router();
router.post("/add/Store", authMiddleware, hasPermission("Stores", "Add"), async (req, res) => {
  try {
    const {
      StoreCode,
      StoreName,
      Mobile,
      Email,
      Phone,
      Gst_Number,
      Tax_Number,
      Pan_Number,
      Store_website,
      Bank_details,
      Country,
      State,
      City,
      PostCode,
      Address,
    } = req.body;
    
    const newData = new Store({
      StoreCode,
      StoreName,
      Mobile,
      Email,
      Phone,
      Gst_Number,
      Tax_Number,
      Pan_Number,
      Store_website,
      Bank_details,
      Country,
      State,
      City,
      PostCode,
      Address,
    });
    
    const result = await newData.save();
    res.status(200).send({ message: "Data Saved Successfully", result });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error", error });
  }
});
router.get("/add/store", authMiddleware, hasPermission("Stores", "View"), async (req, res) => {
  try {
    const result = await Store.find({});
    res.status(200).send({ message: "Data Fetched Successfully", result });
  } catch (err) {
    res.status(500).send({ message: "Internal Server Error", err });
  }
});
router.post("/add/systemzone", authMiddleware, hasPermission("systemzone", "Add"), async (req, res) => {
  try {
    const {
      Timezone,
      Dateformat,
      TimeFormat,
      Currency,
      CurrencySymbolPlacement,
      Decimals,
      DecimalforQuantity,
      Language,
    } = req.body;
    
    const newSystemZone = new storeSystem({
      Timezone,
      Dateformat,
      TimeFormat,
      Currency,
      CurrencySymbolPlacement,
      Decimals,
      DecimalforQuantity,
      Language,
    });
    
    const data = await newSystemZone.save();
    res.status(200).send({ message: "Data saved successfully", data });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error", error });
  }
});

module.exports = router;

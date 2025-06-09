const mongoose = require("mongoose");
const storeSchema = new mongoose.Schema({
  StoreCode: {
    type: String,
  },
  StoreName: {
    type: String,
  },
  Mobile: {
    type: String,
  },
  Email: {
    type: String,
  },
  Phone: {
    type: Number,
  },
  Gst_Number: {
    type: String,
  },
  Tax_Number: {
    type: String,
  },
  Pan_Number: {
    type: String,
  },
  Store_website: {
    type: String,
  },
  Bank_details: {
    type: String,
  },
  Country: {
    type: String,
  },
  State: {
    type: String,
  },
  City: {
    type: String,
  },
  PostCode: {
    type: String,
  },
  Address: {
    type: String,
  },
  Timezone: {
    type: String,
  },
  Dateformat: {
    type: String,
  },
  TimeFormat: {
    type: String,
  },
  Currency: {
    type: String,
  },
  CurrencySymbolPlacement: {
    type: String,
  },
  Decimals: {
    type: String,
  },
  DecimalforQuantity: {
    type: String,
  },
  Language: {
    type: String,
  },
});
const Store = mongoose.model("Store", storeSchema);
module.exports = Store;

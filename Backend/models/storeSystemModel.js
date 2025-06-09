const mongoose = require("mongoose");
const storeSystemSchema = new mongoose.Schema({
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
const storeSystem = mongoose.model("storeSystem", storeSystemSchema);
module.exports = storeSystem;

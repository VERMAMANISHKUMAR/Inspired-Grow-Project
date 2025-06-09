const mongoose = require("mongoose");
const user = mongoose.Schema({
  userName: {
    type: String,
  },
  FirstName: {
    type: String,
  },
  LastName: {
    type: String,
  },
  Mobile: {
    type: Number,
  },
  Email: {
    type: String,
  },
  Role: {
    type: String,
  },
  Password: {
    type: String,
  },
  WarehouseGroup: {
    type: String,
  },
  Defaultwarehouse: {
    type: String,
  },
  Store: {
    type: String,
  },
});
const User = mongoose.model("User", user);
module.exports = User;

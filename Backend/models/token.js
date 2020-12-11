const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
  userId: { type: String, required: true },
  refreshToken: { type: String, required: true },
  // nric: { type: String, required: true },
  // gender: { type: String, required: true },
  // age: { type: String, required: true },
  // phoneNumber: { type: String, required: true },
  // email: { type: String, required: true },
  // address: { type: String, required: true },
});

module.exports = mongoose.model("Token", tokenSchema);

//change user and schema as necessary

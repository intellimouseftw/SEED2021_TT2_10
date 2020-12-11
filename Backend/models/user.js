const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  nric: { type: String, required: true },
  gender: { type: String, required: true },
  age: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
});

module.exports = mongoose.model("User", userSchema);

//change user and schema as necessary

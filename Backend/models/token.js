const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
  userId: { type: String, required: true },
  refreshToken: { type: String, required: true },
});

module.exports = mongoose.model("Token", tokenSchema);

//change user and schema as necessary

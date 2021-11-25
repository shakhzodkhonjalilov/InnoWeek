const { Schema, model } = require("mongoose");

const schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  gender: { type: String, required: true },
  country: { type: String, required: true },
  born: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  language: { type: String, required: true },
  mailing: { type: Boolean },
});

module.exports = model("User", schema);

const { Schema, model } = require("mongoose");

const users = new Schema({
  info: { type: String, required: true },
  sign: { type: Boolean },
});

const schema = new Schema({
  link: { type: String, required: true },
  users: [users],
  document: { type: String, required: true },
});

module.exports = model("Documents", schema);

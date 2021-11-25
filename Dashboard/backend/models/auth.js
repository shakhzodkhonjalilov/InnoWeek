const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    login: { type: String, require },
    password: { type: Number, require },
  },
  { collection: "auth" }
);

module.exports = model("auth", schema);

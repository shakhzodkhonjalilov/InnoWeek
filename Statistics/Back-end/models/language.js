const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    label: { type: String },
    value: { type: Number },
  },
  { collection: "language" }
);

module.exports = model("Language", schema);

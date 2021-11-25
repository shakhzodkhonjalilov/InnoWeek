const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    name: { type: String },
    value: { type: Number },
  },
  { collection: "show" }
);

module.exports = model("Show", schema);

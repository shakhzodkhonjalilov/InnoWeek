const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    name: { type: String },
    value: { type: Number },
  },
  { collection: "participant" }
);

module.exports = model("Participant", schema);
